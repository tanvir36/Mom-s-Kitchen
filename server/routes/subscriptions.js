const express = require ('express');
const router = express.Router();
const fs = require('fs');

function readData() {
    const offers = fs.readFileSync('./data/kitchen.json');
    return JSON.parse(offers);
}

function writeData() {
    fs.writeFileSync('./data/kitchen.json', JSON.stringify());
}

router.get("/:id", (req,res)=>{
    const kitchens = readData();
    console.log(req.params.id);
    const requiredKitchen = kitchens.find((kitchen)=>(kitchen.id==req.params.id));
    res.send(requiredKitchen.offers);
})

module.exports=router;