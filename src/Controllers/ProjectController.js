let Project = require( "../Models/Project");
let EnumDataController = require("../Controllers/EnumDataController")
let ProjectRepository = require("../Repositories/ProjectRepository")
let Snapshot = require("../Models/Snapshot")


const newProject =async (title,templateName,userId)=>{
    let project = new Project(title,templateName,userId);
    await ProjectRepository.createProject(project);
    return project;
}
const getSimpleProjectsList = async (userId) =>{
    return await ProjectRepository.getSimpleProjectsForUserById(userId);
}
const getSimpleProject =async (projectId)=>{
    return await ProjectRepository.getSimpleProjectById(projectId);
}
const getFullProject= async(projectId)=>{
    return await ProjectRepository.getFullProjectById(projectId);
}
const getSnapshot =async (projectId)=>{
    try{
        return await ProjectRepository.getSnapshotOnly(projectId);
    }catch(e){
        throw new Error(e.message);
    }

}
const updateSnapshot = async(projectId, snapshot)=>{

    snapshot = Snapshot.fullSanitize(snapshot);
    await ProjectRepository.updateSnapshot(projectId, snapshot);


}
const updateSnapshotField =async (projectId,field)=>{
    if (!field.fieldName)
        throw new Error("fieldName is required!");
    EnumDataController.validateFieldName(field.entryName, field.fieldName);
    EnumDataController.validateTag(field.tag);
    if(EnumDataController.isEnumerable(field.entryName)){
        if (! await ProjectRepository.tagExists(projectId, field.entryName, field.tag))
            throw new Error('this tag is not found');
        await ProjectRepository.updateSnapshotFieldForEnumerable(projectId,field.fieldName,field.fieldValue,field.entryName,field.tag);
    }else{
        await ProjectRepository.updateSnapshotField(projectId,field.fieldName,field.fieldValue);
    }
}

const addDataGroup =async(projectId,entryName)=>{
    EnumDataController.validateEntryNameOnly(entryName);
    await ProjectRepository.addNewDataGroup(projectId,entryName);
}






module.exports = {addDataGroup,newProject,getSimpleProjectsList,updateSnapshotField,updateSnapshot,getSnapshot,getFullProject,getSimpleProject}
