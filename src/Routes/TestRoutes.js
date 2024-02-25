const authorize = require("../Middlewares/Authorize");
const UserController = require("../Controllers/UserController");
let injectProject =  require("../Middlewares/injectProject");
let upload = require("../Middlewares/MultipartFormPicture");
const express = require("express");
let router = express.Router();

router.get("/test/project/image",async (req,res)=>{
    try{
        let content = await require("fs").promises.readFile("./users/12345/pdp.jpeg")
        res.setHeader("Content-Type","image/jpeg");
        res.status(200).send(content);
    }catch(err) {
        res.status(401).json({message: err.message});
    }
});
const fs = require("fs").promises;
const bodyParser = require("body-parser") ;
const ProjectController = require("../Controllers/ProjectController");

router.get("/convert",async (req,res)=>{
    res.setHeader("Content-Type",'application/pdf');
    res.status(200).send(await require("../Controllers/TemplateController").getTemplatePdf("Obsidian"));
})
module.exports = router;