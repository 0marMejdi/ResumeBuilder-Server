const express = require("express");
const route = express.Router();
const TemplateController  = require("../Controllers/TemplateController");
const {all} = require("express/lib/application");

/**
 *  ROutes:
 * •`GET /template` :  gets you the name list of template names.
 *
 * •`GET /template/html/{templateName}` :
 *
 * •`GET /template/html` : returns them all html contents of templates in one json object containing array.
 *
 * •`GET /template/thumb/{templateName}`: returns for given template name, the thumbnail image for it. return a PNG image content
 *
 * •`POST /template/{templateName}` : adds a new project for the current user using a preselected template given in param. must include in request body a Project Json Object `project: {title, creationDate}`
 */

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
         console.log("sending the pic");
        const thumb = await TemplateController.getTemplateThumb(req.params.name);
         console.log("pic sent");
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