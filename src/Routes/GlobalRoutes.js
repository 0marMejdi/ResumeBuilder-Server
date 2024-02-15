const express = require ("express");

const router = express.Router();
const fs = require("fs").promises;
router.get("/",async(req,res)=>{
    try{
        let content2 = await fs.readFile("index.html", 'utf-8');
        res.status(200).send(content2);
    }catch (e) {
        res.status(401).json({message:e.message});
    }
})
router.get("/public/index.js",async (req,res)=>{
    try {
        let content2 = await fs.readFile("public/index.js", 'utf-8');
        res.status(200).send(content2);
    }catch (e){
        res.status(401).json({message:e.message});
    }
});
module.exports = router;