const express = require("express");
const ProjectRepository = require("../Repositories/ProjectRepository");
const ProjectController = require("../Controllers/ProjectController");
const Project = require("../Models/Project");
const authorize = require("../Middlewares/Authorize");
const injectProject = require("../Middlewares/injectProject");
const fieldvalidator = require("../Middlewares/SnapshotFieldValidator");
let router = express.Router();
router.get("/project/list",authorize, (req,res)=>{
    try{
        let projs = ProjectController.getSimpleProjectsList(req.body.user.id);
        res.status(200).json(projs);
    }catch (e) {
        res.status(401).json({message:e.message});
    }
});
router.post("/project/new",authorize,(req,res)=>{
    try{
        ProjectController.newProject(req.body.title,req.body.templateName,req.body.user.id)
        res.status(200).json({message:"project has been added successfully"});
    }catch (e) {
        res.status(401).json({message:e.message});
    }
});
router.get("/project/info/:projectId",authorize,injectProject,(req,res)=>{
    try{
        let project = ProjectRepository.getFullProjectById(req.params.projectId);
        res.status(200).json(project);
    }catch (e) {
        res.status(401).json({message:e.message});
    }

});
//updates a certain field of snapshot object
router.patch("/project/info",authorize,injectProject,fieldvalidator,(req,res)=>{
    try{
        ProjectController.updateSnapshotField(req.body.project.id,req.body.field);

        res.status(200).json({message:"updated successfully",projectId:req.body.project.id ,project: ProjectController.getFullProject(req.body.project.id)});
    }catch (e) {
        res.status(401).json({message:e.message, stack:e.stack});
    }

})
//updates whole snapshot object
router.put("/project/snapshot",authorize,injectProject,(req,res)=>{
    try{
        ProjectRepository.updateSnapshot(req.body.params.projectId,req.body.snapshot);

    }catch (e) {
        res.status(401).json({message:e.message});
    }

});
//adds new data group, needs `{entryName}`
router.post("/project/info",authorize,injectProject,(req,res)=>{
    try{
        if(!req.body.hasOwnProperty("entryName"))
            throw new Error("entryName is required");
        ProjectController.addDataGroup(req.body.project.id,req.body.entryName);
        res.status(200).json(ProjectController.getFullProject(req.body.project.id));
    }catch (e) {
        res.status(401).json({message:e.message});
    }

})
//delete a data group, needs `{entryName, tag}`
// router.delete("/project/info/:projectId",authorize,(req,res)=>{
//     try{
//         throw Error ("Not Implemented");
//     }catch (e) {
//         res.status(401).json({message:e.message});
//     }
//
// })

// •`GET /project/snapshot/{projectId}` : gets the latest saved values for fields that user has entered for a given project. return a Snapshot Json Object.

// •`GET /project/thumb/{projectId}` : gets the latest saved picture as thumbnail for that specific project. return a PNG image file.

// •`GET /project/pdf/{projectId}` : returns pdf result (for preview or download) of the project after applying the latest modification.

// •`POST /project/new/` : adds a new project for the current user logged in using. body must include the title and the template name for the project: `{title, templateName}`
module.exports = router;