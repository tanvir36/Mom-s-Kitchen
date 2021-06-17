const express = require('express');
const app = express();
const cors = require('cors');
const mysql= require('mysql');
const kitchens = require('./routes/kitchens');
const offers = require ('./routes/subscriptions');
const bcrypt = require('bcrypt');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const saltRounds =10;

app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    }
));

app.use(cookieParser());
app.use(bodyParse.urlencoded({extended: true}));
app.use(session({
    key: "userId",
    secret: "tanu",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expire: 60*60*24,
    },
})
);


app.use (express.static('public'));
app.use('/kitchens',kitchens);
app.use('/kitchens',offers);



const db= mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Tanvir@94',
    database: 'kitchen'
});

app.post('/register',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password,saltRounds, (err, hash)=>{
        if(err){
            console.log(err);
        }
        db.query(
            "INSERT INTO users (userName, password) VALUES (?,?)",
        [username , hash],
        (err, result)=>{
            console.log(err);
        }
        );
    })   
})

app.get('/login',(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true , user: req.session.user})
    }else{  
        res.send({loggedIn: false})
    }
})

app.post('/login',(req,res)=>{
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
                        const token= jwt.sign({id},"tanu",{
                            expiresIn: 300,
                        })
                        req.session.user =result;

                        // console.log(req.session.user);
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

app.get('/userAuthenticated',verifyJwt,(req,res)=>{
    res.send("You are authenticated !!!");
})

app.listen(8080, ()=>{
    console.log("server running on 8080");
})