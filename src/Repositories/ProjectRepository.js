const Project = require("../Models/Project");
const Info = require("../Models/EnumData")
let proj = new Project("And Another One","Marine","1706821332398");
//let EnumDataController = require("../Controllers/EnumDataController")
proj.id="1706863054682";
proj.snapshot.projectId="1706863054682";

/**@type {Project[]}*/
let projects =[proj];
/**@type {Snapshot[]}*/
let snaps = [proj.snapshot];
const entries =["Language", "Interest", "Formation", "ProfessionalExp", "Skill"];
function projectExists(projectId) {
    return projects.findIndex(p => p.id === projectId) >= 0;

}
const createProject = (project)=>{
    projects.push(project);
    snaps.push(project.snapshot);
}
const getSimpleProjectsForUserById = (userId)=>{
    return projects.filter(proj => proj.userId === userId).map(proj=>{
        delete proj.snapshot;
        return proj;
    });
}
const getSimpleProjectById = (projectId)=>{
    let proj = projects.find(project=>project.id===projectId);
    if (proj)
        return proj;
    throw new Error("Repository : Project Not Found!");
}
/**
 * returns project with snapshots
 * @param projectId : string
 * @returns {Project}
 */
const getFullProjectById=(projectId)=>{
    let proj = getSimpleProjectById(projectId);
    proj.snapshot=getSnapshotOnly(projectId);
    return proj;
}
function getSnapshotOnly  (projectId){
    let snap = snaps.find(snap=>snap.projectId===projectId);
    if (!snap)
        throw Error("Repository : Snapshot not Found for this project");
    return snap;
}
/**
 *
 * @param projectId :string
 * @param fieldName :string
 * @param fieldValue :string
 * @param entryName :string
 * @param tag :number
 */

const updateSnapshotFieldForEnumerable = (projectId,fieldName,fieldValue,entryName,tag)=>{
    let index = snaps.findIndex(snap=>snap.projectId===projectId);
    if (index<0)
        throw Error("Snapshot was not found");
        snaps[index][entryName][tag][fieldName]=fieldValue;
}
const updateSnapshotField = (projectId,fieldName,fieldValue)=>{
    let index = snaps.findIndex(snap=>snap.projectId===projectId);
    if (index<0)
        throw Error("Snapshot was not found");
    snaps[index][fieldName] = fieldValue;
}
/**
 *
 * @param projectId :string
 * @param snapshot :Snapshot
 */
const updateSnapshot = (projectId,snapshot)=>{
    let index = snaps.findIndex(snap=>snap.projectId===projectId);
    if (index<0)
        throw Error("Snapshot not found");
    snaps[index]=snapshot;
}
/**
 *
 * @param projectId : string
 * @param entryName : string
 * @param datagroup : Object
 */
const addDataGroup = (projectId,entryName,datagroup)=> {
    let index = snaps.findIndex(snap=>snap.projectId===projectId);
    if (index<0)
        throw Error ("snapshot not found");

    datagroup.tag=snaps[index][entryName].length;
    snaps[index][(entryName)].push(datagroup);

}

module.exports = {getSnapshotOnly,updateSnapshot,updateSnapshotField,updateSnapshotFieldForEnumerable,getSimpleProjectsForUserById,getFullProjectById,createProject,addDataGroup,projectExists,getSimpleProjectById};