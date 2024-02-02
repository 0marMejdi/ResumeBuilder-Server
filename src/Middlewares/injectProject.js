
const ProjectRepository = require("../Repositories/ProjectRepository");
async function injectProject(req,res,next){
    try{
        if (req.params.projectId && req.params.projectId!=="")
            req.body.projectId=req.params.projectId;
        if (!req.body.projectId || req.body.projectId === "")
            throw new Error("Project Id is required. none is found!");
        if (!ProjectRepository.projectExists(req.body.projectId))
            throw new Error("Project doesn't exists");
        let project = ProjectRepository.getSimpleProjectById(req.body.projectId);
        if (project.userId !== req.body.user.id)
            throw new Error("You don't own this project!");
        req.body.project = project;
        next();
    }catch(e){
        res.status(401).json({message:e.message});
    }
}

module.exports = injectProject;
