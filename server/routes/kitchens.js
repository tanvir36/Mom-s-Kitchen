const express = require ('express');
const router = express.Router();
const fs= require('fs');

function readData(){
    const kitchens= fs.readFileSync('./data/kitchen.json');
    return JSON.parse(kitchens);
}

function writeData(){
    fs.writeFileSync('./data/kitchen.json', JSON.stringify());
}
router.get("/", (req,res)=>{
    const kitchenData = readData();
    const requiredData = kitchenData.map((kitchen)=>{
        return {
            id: kitchen.id,
            title: kitchen.title,
            name: kitchen.name,
            image:kitchen.image, 
            slogan: kitchen.slogan
        }
    });
    res.json(requiredData);
});

router.get("/:id", (req,res)=>{
    const kitchens = readData();
    const requiredKitchen = kitchens.find((kitchen)=>(kitchen.id==req.params.id));
    console.log(requiredKitchen);
    res.json(requiredKitchen);
    
})
module.exports=router;