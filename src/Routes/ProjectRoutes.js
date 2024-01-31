const express = require("express");
const ProjectRepository = require("../Repositories/ProjectRepository");
const Project = require("../Models/Project");
let router = express.Router();
router.get("/project/list", (req,res)=>{
    try{
        let projs = ProjectRepository.getAllProjects();
        res.status(200).json(projs);
    }catch (e) {
        res.status(401).json({message:e.message});
    }
});
router.post("/project/new",(req,res)=>{
    try{
        let proj = new Project(req.body.title,req.body.user.id);
        ProjectRepository.createProject(proj);
        res.status(200).json(proj);
    }catch (e) {
        res.status(401).json({message:e.message});
    }
});
module.exports = router;






