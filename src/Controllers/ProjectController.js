let Project = require( "../Models/Project");
let EnumDataController = require("../Controllers/EnumDataController")
let ProjectRepository = require("../Repositories/ProjectRepository")
let Snapshot = require("../Models/Snapshot")
let EnumerableData = require("../Models/EnumerableData")


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
    // id injection !!
    snapshot.projectId = projectId;
    snapshot = Snapshot.fullSanitize(snapshot);
    // now for each enumerable data group:
    for (const key in Snapshot.enumerableList) {
        // first, we delete all enumerable data to let us replace them by newer ones.
        await ProjectRepository.deleteEnumerableForProject(projectId,key); // => let deleteAllEnum = connection.format(`DELETE FROM ${connection.escapeId(key)} WHERE projectId= ?`, [snapshot.projectId]);  await executeQuery(deleteAllEnum);
        // now for each enumerable data group, we insert them one by one in their appropriate table
        for (const index in snapshot[key]) {
            let enumData = snapshot[key][index];
            await ProjectRepository.insertNewEnumerable(key,enumData);
        }
    }
    // now we update the big Snapshot object regardless their enumerable data.
    // it must be already sanitized
    let cleanSnap = Snapshot.sanitize(snapshot)

    await ProjectRepository.updateSnapshotForProject(projectId,cleanSnap);
    return true;
}
const updateSnapshotField =async (projectId,field)=>{
    if (!field.fieldName)
        throw new Error("fieldName is required!");
    EnumDataController.validateFieldName(field.entryName, field.fieldName);
    EnumerableData.validateTag(field.tag);
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
    let nextTag = await ProjectRepository.getNextTag(projectId,entryName);
    let enumerableDataGroup = new Snapshot.enumerableList[entryName]();
    enumerableDataGroup.tag= nextTag;
    enumerableDataGroup.projectId = projectId;
    await ProjectRepository.addWholeDataGroup(projectId,entryName,enumerableDataGroup);
    return nextTag;
}






module.exports = {addDataGroup,newProject,getSimpleProjectsList,updateSnapshotField,updateSnapshot,getSnapshot,getFullProject,getSimpleProject}
