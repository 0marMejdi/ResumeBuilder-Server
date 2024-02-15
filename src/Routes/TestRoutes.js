const authorize = require("../Middlewares/Authorize");
const UserController = require("../Controllers/UserController");
let injectProject =  require("../Middlewares/injectProject");
let upload = require("../Middlewares/MultipartFormPicture");
const express = require("express");
let router = express.Router();
router.get("/test/project/image",async (req,res)=>{
    try{
        let content = await require("fs").promises.readFile("./Tests/")
        res.status(200).json(content);
    }catch(err) {
        res.status(401).json({message: err.message});
    }
});
router.post("/test/project/image",
    (req,res,next)=>{req.body.project={id:"12345"}; next()},
    require("../Middlewares/PictureHandler"),
    async (req,res)=>{
    try{
        res.setHeader("Content-Type",'application/pdf');
        res.status(200).send(req.body.imageBuffer);
    }catch(err) {
        res.status(401).json({message: "went wrong"});
    }
});
router.get("/convert",async (req,res)=>{
    res.setHeader("Content-Type",'application/pdf');
    res.status(200).send(await require("../Controllers/TemplateController").getTemplatePdf("RawPrototype"));
})
module.exports = router;