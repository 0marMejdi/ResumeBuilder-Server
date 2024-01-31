let Project = require(__dirname + "../Models/Project");
let Snapshot = require(__dirname  +"../Models/Snapshot");
let ProjectRepository = require(__dirname + "../Repositories/ProjectRepository")
const newProject = (title)=>{
    let project = new Project(title);
    ProjectRepository.createProject(project);
}

const getProjectsList = () =>{
    return ProjectRepository.getAllProjects();
}
//module.exports = {addDataGroup,getProjectById,getProjectsForUserById,createProject,getProjectsWithSnapshotsForUserById,getProjectIdsForUserById,getProjectWithSnapshotById,getAllProjects,getAllProjectsWithSnapshot,updateSnapshotField,updateSnapshot}
