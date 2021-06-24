const express = require('express');
const app = express();
const cors = require('cors');

const kitchens = require('./routes/kitchens');
const people = require('./routes/People');

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

app.listen(port, ()=>{
    console.log("server running on 8080");
})