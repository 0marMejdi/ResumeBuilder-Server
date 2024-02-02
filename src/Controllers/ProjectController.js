let Project = require( "../Models/Project");
let EnumDataController = require("../Controllers/EnumDataController")
let ProjectRepository = require("../Repositories/ProjectRepository")
const Snapshot = require("../Models/Snapshot")

const newProject = (title,templateName,userId)=>{
    console.log(JSON.stringify(ProjectRepository));
    let project = new Project(title,templateName,userId);
    ProjectRepository.createProject(project);
}
const getSimpleProjectsList = (userId) =>{
    return ProjectRepository.getSimpleProjectsForUserById(userId);
}
const getSimpleProject = (projectId)=>{
    return ProjectRepository.getSimpleProjectById(projectId);
}
const getFullProject= (projectId)=>{
    return ProjectRepository.getFullProjectById(projectId);
}
const getSnapshot = (projectId)=>{
    try{
        return ProjectRepository.getSnapshotOnly(projectId);
    }catch(e){
        throw new Error(e.message);
    }

}
const updateSnapshot = (projectId, snapshot)=>{
    let filteredSnap = new Snapshot();
    filteredSnap.projectId=projectId;
    for (const filteredSnapKey in filteredSnap) {
        
    }
}
const updateSnapshotField = (projectId,field)=>{

    if( field.isEnumerable){
        ProjectRepository.updateSnapshotFieldForEnumerable(projectId,field.fieldName,field.fieldValue,field.entryName,field.tag);
    }else{
        ProjectRepository.updateSnapshotField(projectId,field.fieldName,field.fieldValue);
    }
}

const addDataGroup =(projectId,entryName)=>{
    EnumDataController.validateEntryName(entryName);
    ProjectRepository.addDataGroup(projectId,EnumDataController.getFinalEntryName(entryName),EnumDataController.getInstanceFromEntry(entryName));
}






module.exports = {addDataGroup,newProject,getSimpleProjectsList,updateSnapshotField,updateSnapshot,getSnapshot,getFullProject,getSimpleProject}
