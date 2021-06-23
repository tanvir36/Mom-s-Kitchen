const express = require('express');
const app = express();
const router = express.Router();
const mysql= require('mysql');              //including mysql database
const bcrypt = require('bcrypt');           //including bcrypt library to hash the passwords

require("dotenv").config();
const secret= process.env.SECRET;

// for storing user from database into cookie
const bodyParse = require('body-parser');   
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

// using salt to add extra bits to make password more secure
const saltRounds =10;

router.use(cookieParser());
router.use(bodyParse.urlencoded({extended: true}));

//setting up of cookie
router.use(session({
    key: "userId",
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie:{
        expire: 60*60*24,
    },
})
);

//creating database connection
const db= mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Tanvir@94',
    database: 'kitchen'
});

//posting data into database called 'kitchen' with table name called 'users'
router.post('/register',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const address = req.body.address;
    const postal = req.body.postal;
    const subscription= ".";

    bcrypt.hash(password,saltRounds, (err, hash)=>{
        if(err){
            console.log(err);
        }
        db.query(
            "INSERT INTO users (userName, password, subscription, address, postal) VALUES (?,?,?,?,?)",
        [username , hash, subscription, address, postal],
        (err, result)=>{
            console.log(err);
        }
        );
    })   
})

// route to check if user data is there in cookie or no
router.get('/login',(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true , user: req.session.user})
    }else{  
        res.send({loggedIn: false})
    }
})

// route to check if user exists and if he entered the right password
router.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE userName =?;",
        username,
        (err,result)=>{
            if(err){
                console.log(err);
            }
            if(result.length>0){
                bcrypt.compare(password, result[0].password,(error,response)=>{
                    if(response){  
                        const id= result[0].id;
                        const token= jwt.sign({id},secret,{
                            expiresIn: 300,
                        })
                        req.session.user =result;
                        res.json({auth: true, token: token, result: result});
                    } else{
                        res.send({Message: "Wrong Password Entered"});
                    }
                })          
            }else{
                res.send({Message: "User Not found"});
            }
        }
    )
})

//function to check if the token in the local storage is same to authenticate user
const verifyJwt=(req,res,next)=>{
    const token= req.headers["x-access-token"]
    if(!token){
        res.send("Sorry we need Token");
    }else{
        jwt.verify(token, "tanu",(err,decoded)=>{
            if(err){
                res.json({auth: false, message: "Failed to Authenticate"});

            }else{
                req.userId = decoded.id;
                next();
            }
        });
    }
}
// Route to check if user is authenticated
router.get('/userAuthenticated',verifyJwt,(req,res)=>{
    res.send({auth: true ,message:"You are authenticated !!!", user: req.session.user});
})

// updating the subscription column of table as the person order if user is authenticated
router.put('/subscribe', (req,res)=>{
    const title= req.body.title;
    const name= req.body.name;
    const price = req.body.price;
    const username = req.body.username;
    db.query("SELECT * FROM users WHERE username=?;",
    [username],(e,r)=>{
       const subscription= r[0].subscription;

       db.query("UPDATE  users SET subscription = (?)  WHERE userName=?;",
       [(subscription +"\n"+ title+" \n"+ name + "\n"+ price) , username ],
       (error,result)=>{
           if(error){
               console.log(error);
           }else{
               
               res.send(result);
           }
       });
    });

   
});
module.exports=router;