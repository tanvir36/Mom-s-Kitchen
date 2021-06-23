const express = require('express');
const app = express();
const cors = require('cors');
// const mysql= require('mysql');
const kitchens = require('./routes/kitchens');
const people = require('./routes/People');
// const bcrypt = require('bcrypt');
// const bodyParse = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const jwt = require('jsonwebtoken');
// const saltRounds =10;
require("dotenv").config();
const port = process.env.PORT || 8080;
const secret = process.env.SECRET;
app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT"],
        credentials: true
    }
));

app.use (express.static('public'));
app.use('/kitchens',kitchens);
app.use('/',people);

// app.use(cookieParser());
// app.use(bodyParse.urlencoded({extended: true}));

// app.use(session({
//     key: "userId",
//     secret: "tanu",
//     resave: false,
//     saveUninitialized: false,
//     cookie:{
//         expire: 60*60*24,
//     },
// })
// );

// const db= mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'Tanvir@94',
//     database: 'kitchen'
// });

// app.post('/register',(req,res)=>{
//     const username = req.body.username;
//     const password = req.body.password;
//     const address = req.body.address;
//     const postal = req.body.postal;
//     const subscription= ".";

//     bcrypt.hash(password,saltRounds, (err, hash)=>{
//         if(err){
//             console.log(err);
//         }
//         db.query(
//             "INSERT INTO users (userName, password, subscription, address, postal) VALUES (?,?,?,?,?)",
//         [username , hash, subscription, address, postal],
//         (err, result)=>{
//             console.log(err);
//         }
//         );
//     })   
// })

// app.get('/login',(req,res)=>{
//     if(req.session.user){
//         res.send({loggedIn: true , user: req.session.user})
//     }else{  
//         res.send({loggedIn: false})
//     }
// })

// app.post('/login',(req,res)=>{
//     const username = req.body.username;
//     const password = req.body.password;

//     db.query("SELECT * FROM users WHERE userName =?;",
//         username,
//         (err,result)=>{
//             if(err){
//                 console.log(err);
//             }
//             if(result.length>0){
//                 bcrypt.compare(password, result[0].password,(error,response)=>{
//                     if(response){  
//                         const id= result[0].id;
//                         const token= jwt.sign({id},"tanu",{
//                             expiresIn: 300,
//                         })
//                         req.session.user =result;
//                         res.json({auth: true, token: token, result: result});
//                     } else{
//                         res.send({Message: "Wrong Password Entered"});
//                     }
//                 })          
//             }else{
//                 res.send({Message: "User Not found"});
//             }
//         }
//     )
// })
// const verifyJwt=(req,res,next)=>{
//     const token= req.headers["x-access-token"]
//     if(!token){
//         res.send("Sorry we need Token");
//     }else{
//         jwt.verify(token, "tanu",(err,decoded)=>{
//             if(err){
//                 res.json({auth: false, message: "Failed to Authenticate"});

//             }else{
//                 req.userId = decoded.id;
//                 next();
//             }
//         });
//     }
// }

// app.get('/userAuthenticated',verifyJwt,(req,res)=>{
//     res.send({auth: true ,message:"You are authenticated !!!", user: req.session.user});
// })


// app.put('/subscribe', (req,res)=>{
//     const title= req.body.title;
//     const name= req.body.name;
//     const price = req.body.price;
//     const username = req.body.username;
//     db.query("SELECT * FROM users WHERE username=?;",
//     [username],(e,r)=>{
//        const subscription= r[0].subscription;

//        db.query("UPDATE  users SET subscription = (?)  WHERE userName=?;",
//        [(subscription +"\n"+ title+" \n"+ name + "\n"+ price) , username ],
//        (error,result)=>{
//            if(error){
//                console.log(error);
//            }else{
               
//                res.send(result);
//            }
//        });
//     });

   
// });
app.listen(port, ()=>{
    console.log("server running on 8080");
})