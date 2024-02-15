const authorize = require("../Middlewares/Authorize");
const UserController = require("../Controllers/UserController");
const express = require("express");
let router = express.Router();
router.get("/project/image",authorize,async (req,res)=>{
    try{
        let content = await require("fs").promises.readFile("./Tests/fo")
        res.status(200).json(content);
    }catch(err) {
        res.status(401).json({message: err.message});
    }
});
router.get("/convert",async (req,res)=>{
    res.setHeader("Content-Type",'application/pdf');
    res.status(200).send(await require("../Controllers/TemplateController").getTemplatePdf("RawPrototype"));
})
module.exports = router;