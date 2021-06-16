const express = require('express');
const app = express();
const cors = require('cors');
const mysql= require('mysql');
const kitchens = require('./routes/kitchens');
const offers = require ('./routes/subscriptions');
app.use(express.json());
app.use(cors());

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
    
    db.query(
        "INSERT INTO users (userName, password) VALUES (?,?)",
    [username , password],
    (err, result)=>{
        console.log(err);
    }
    );
})

app.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE userName =? AND password=?",
        [username , password],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            if(result){
                res.send(result)
            }else{
                res.send({Message: "User Not found"});
            }
        }
    )
})


app.listen(8080, ()=>{
    console.log("server running on 8080");
})