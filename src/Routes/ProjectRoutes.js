const express = require("express");
const ProjectController = require("../Controllers/ProjectController");
const Project = require("../Models/Project");
const authorize = require("../Middlewares/Authorize");
const injectProject = require("../Middlewares/injectProject");
const notImplemented = require("../Middlewares/NotImplemented")
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
        res.status(200).json({message:"updated successfully",projectId:req.body.project.id });
    }catch (e) {
        res.status(401).json({message:e.message, stack:e.stack});
    }

})
//updates whole snapshot object
router.put("/project/info",authorize,injectProject,async(req,res)=>{
    try{
        await ProjectController.updateSnapshot(req.body.projectId,req.body.snapshot);
        res.status(200).json({message:"updated successfully", project: await ProjectController.getFullProject(req.body.project.id)});

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

router.post("/project/image",authorize,injectProject,notImplemented) ;

router.delete("/project/info",authorize,injectProject,notImplemented) ;
router.delete("/project",authorize,injectProject,async (req,res)=>{
    try{
        await ProjectController.deleteProject(req.body.project.id);
        res.status(200).json({message:"project deleted successfully"});
    }catch(e){
        res.status(401).json({message:e.message});
    }
});

router.get("/project/thumb/:projectId",authorize,injectProject,notImplemented);

router.get("/project/pdf/:projectId",authorize,injectProject,notImplemented);

router.get("/project/html/:projectId",authorize,injectProject,notImplemented);

router.get("/project/image/:projectId",authorize,injectProject,notImplemented);

router.put("/project/orders/update",authorize,injectProject,notImplemented);


module.exports = router;