const express = require ('express');
const router = express.Router();
const fs= require('fs');

function readData(){
    const kitchens= fs.readFileSync('./data/kitchen.json');
    return JSON.parse(kitchens);
}

function writeData(kitchens){
    fs.writeFileSync('./data/kitchen.json', JSON.stringify(kitchens));
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
    res.json(requiredKitchen);  
});

router.post("/:id/:name",(req,res)=>{
    const kitchens= readData();
    const requiredKitchen = kitchens.find((kitchen)=>(kitchen.id==req.params.id));
    const requiredOffer = requiredKitchen.offers.find((offer)=>offer.name===req.params.name);
    const newSubscriber ={
        name: req.body.name,
        address: req.body.address,
        postal: req.body.postal
    };
   
        if( requiredOffer.subscribers.find(subscriber=>subscriber.name===newSubscriber.name) && requiredOffer.subscribers.find(subscriber=>subscriber.address===newSubscriber.address)){
            res.json("User already Subscribed");
        }
    
    
    requiredOffer.subscribers.push(newSubscriber);
    writeData(kitchens);
    res.json(requiredOffer);
});
module.exports=router;