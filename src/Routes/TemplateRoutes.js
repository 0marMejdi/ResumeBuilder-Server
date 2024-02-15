const express = require("express");
const route = express.Router();
const TemplateController  = require("../Controllers/TemplateController");



// returns the html content of a template given in parameter.
route.get("/template/html/:name",async(req,res)=>{
    try{
        let content = await TemplateController.getTemplateContent(req.params.name);
        res.status(200).send(content);
    }catch (e){
        res.status(401).json({message:e.message});
    }
});
route.get("/template/html",async(req,res)=>{
    try{
        let allContent = await TemplateController.getAllTemplateContent();
        res.status(200).json(allContent);
    }catch (e) {
        res.status(401).json({message:e.message});
    }
});
route.get("/template/thumb/:name",async(req,res)=>{
    try {
        const thumb = await TemplateController.getTemplateThumb(req.params.name);
        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(thumb);
    }catch (e) {
        res.status(401).json({message:e.message});
    }
});
route.get("/template/pdf/:name",async(req,res)=>{
    try{
        let pdfContent = await TemplateController.getTemplatePdf(req.params.name);
        res.setHeader("Content-Type",'application/pdf');
        res.status(200).send(pdfContent);
    }catch(e){
        res.status(401).json({message:e.message});

    }
});
route.get("/template/names",async (req,res)=>{
    try{
        let list = await TemplateController.getTemplatesList();
        res.status(200).json(list);
    }catch(e){
        res.status(500).json({message:e.message});
    }


});

module.exports = route;