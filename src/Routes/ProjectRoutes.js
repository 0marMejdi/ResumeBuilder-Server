const express = require("express");
const ProjectController = require("../Controllers/ProjectController");
const Project = require("../Models/Project");
const authorize = require("../Middlewares/Authorize");
const injectProject = require("../Middlewares/injectProject");
const notImplemented = require("../Middlewares/NotImplemented")
const bodyParser = require("body-parser");
const pictureHandler = require("../Middlewares/PictureHandler");
let router = express.Router();
router.get("/project/list",authorize, async (req,res)=>{
    try{
        let projs = await ProjectController.getSimpleProjectsList(req.body.user.id);
        res.status(200).json(projs);
    }catch (e) {
        res.status(401).json({message:e.message});
    }
});
router.post("/project/new",authorize,async(req,res)=>{
    try{
        let project = await ProjectController.newProject(req.body.title,req.body.templateName,req.body.user.id);
        project = await ProjectController.getSimpleProject(project);
        res.status(200).json({message:"project has been added successfully",project});
    }catch (e) {
        res.status(401).json({message:e.message});
    }
});
router.get("/project/info/:projectId",authorize,injectProject,async(req,res)=>{
    try{
        let project = await ProjectController.getFullProject(req.params.projectId);
        delete project.userId;
        res.status(200).json(project);
    }catch (e) {
        res.status(401).json({message:e.message});
    }

});
router.get("/project/snapshot/:projectId",authorize,injectProject,async(req,res)=>{
    try{
        let snap =await ProjectController.getSnapshot(req.body.project.id);
        res.status(200).json(snap)
    }catch (e) {
        res.status(401).json({message:e.message});
    }
})
//updates a certain field of snapshot object
router.patch("/project/info",authorize,injectProject,async(req,res)=>{
    try{
        await ProjectController.updateSnapshotField(req.body.project.id, {fieldValue:req.body.fieldValue,fieldName:req.body.fieldName , entryName:req.body.entryName,tag: req.body.tag});
        res.status(200).json({message:"updated successfully" });
    }catch (e) {
        res.status(401).json({message:e.message, stack:e.stack});
    }

})
//updates whole snapshot object
router.put("/project/info",authorize,injectProject,async(req,res)=>{
    try{
        await ProjectController.updateSnapshot(req.body.projectId,req.body.snapshot);
        res.status(200).json({message:"updated successfully"});

    }catch (e) {
        res.status(401).json({message:e.message, stack:e.stack});
    }

});
//adds new data group, needs `{entryName}`
router.post("/project/info",authorize,injectProject,async (req,res)=>{
    try{
        if(!req.body.hasOwnProperty("entryName"))
            throw new Error("entryName is required");
        let newTag= await ProjectController.addDataGroup(req.body.project.id,req.body.entryName);
        res.status(200).json({tag: newTag,message: "data group added successfully"});
    }catch (e) {
        res.status(401).json({message:e.message});
    }

})

router.post("/project/image",  bodyParser.urlencoded({extended:true}) ,
    pictureHandler, authorize,injectProject,
    async (req,res)=>{
        try{
            await ProjectController.uploadImage(req.body.project.id,req.body.imageBuffer,req.body.imageType);
            res.status(200).json({message:"image uploaded successfully"});
        }catch(err) {
            res.status(401).json({message: err.message});
        }
    });
router.delete("/project/info",authorize,injectProject,notImplemented) ;
router.delete("/project",authorize,injectProject,async (req,res)=>{
    try{
        await ProjectController.deleteProject(req.body.project.id);
        res.status(200).json({message:"project deleted successfully"});
    }catch(e){
        res.status(401).json({message:e.message});
    }
});

router.get("/project/thumb/:projectId",authorize,injectProject,async(req,res)=>{
    try{
        let png  = await ProjectController.getProjectThumb(req.body.project.id);
        res.setHeader("Content-Type",'image/png');
        res.status(200).send(png);
    }catch(e){
        res.status(401).json({message:e.message});
    }
});
//getProjectThumb, getProjectHtml, getProjectPdf, 
router.get("/project/pdf/:projectId",authorize,injectProject,async(req,res)=>{
    try{
        let pdf  = await ProjectController.getProjectPdf(req.body.project.id);
        res.setHeader("Content-Type",'application/pdf');
        res.status(200).send(pdf);
    }catch(e){
        res.status(401).json({message:e.message});
    }
});

router.get("/project/html/:projectId",authorize,injectProject,async(req,res)=>{
    try{
        let htmlContent = await ProjectController.getProjectHtml(req.body.project.id);
        res.status(200).send(htmlContent);
    }catch(e){
        res.status(401).json({message:e.message});
    }
});

router.get("/project/image/:projectId",authorize,injectProject,async(req,res)=>{
    try{
        let buffer = await ProjectController.downloadImage(req.body.project.id);
        res.setHeader("Content-Type", `image/${await ProjectController.getImageType(req.body.project.id)}`);
        if (!buffer)
            throw new Error("NO IMAGE !!!!! ")
        res.status(200).send(buffer);
    }catch(e){
        res.status(401).json({message:e.message});
    }
});

router.put("/project/order/update",authorize,injectProject,notImplemented);

module.exports = router;