/**@type {Project[]}*/
let projects =[];
/**@type {Snapshot[]}*/
let snaps = [];
const entries =["Language", "Interest", "Formation", "ProfessionalExp", "Skill"];
const entryValues = {"Language":"languages", "Interest":"interests", "Formation":"formations", "ProfessionalExp":"professionalExps", "Skill":"skills"}

const createProject = (project)=>{
    projects.push(project);

}
const getAllProjects = ()=>{
    projects.map(proj=>{
        delete proj.snapshot;
        return proj;
    });
    return  projects;
}
const getAllProjectsWithSnapshot = ()=>{
    return  projects.map(proj=>{
        proj.snapshot = snaps.find(snap=>snap.projectId===proj.id);
        return proj;
    });
}
/**
 * returns project without its snapshots
 * @param id
 * @returns {Project}
 */
const getProjectById = (id)=>{
    let proj = projects.find(project=>project.id===id);
    if (proj)
        return proj;
    throw new Error("Project Not Found!");
}
/**
 * returns project with snapshots
 * @param id : string
 * @returns {Project}
 */
const getProjectWithSnapshotById=(id)=>{
    let proj = getProjectById(id);
    proj.snapshot=getSnapshotForProject(id);
    return proj;
}
const getProjectIdsForUserById = (userId)=>{
    return projects.filter(proj => proj.userId === userId).map(proj => proj.id);
}
const getProjectsForUserById = (userId)=>{
    return projects.filter(proj => proj.userId === userId);
}
const getProjectsWithSnapshotsForUserById = (userId)=>{
    return projects.filter(proj=>proj.userId===userId).map(proj=> {
        proj.snapshot = snaps.find(snap=> snap.projectId === proj.id);
        return proj;
    })
}
const getSnapshotForProject = (projectId)=>{
    let snap = snaps.find(snap=>snap.projectId===projectId);
    if (!snap)
        throw Error("Snapshot not Found for this project");
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
const updateSnapshotField = (projectId,fieldName,fieldValue,entryName,tag)=>{
    let index = snaps.findIndex(snap=>snap.projectId===projectId);
    if (index<0)
        throw Error("Snapshot was not found");

    if (entryName && entryName in entries){
        snaps[index][entryValues[entryName]][tag][fieldName]=fieldValue;
    }
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
 */
const addDataGroup = (projectId,entryName)=> {
    let index = snaps.findIndex(snap=>snap.projectId===projectId);
    if (index<0)
        throw Error ("snapshot not found");
    if (! entryName in entries)
        throw Error ("invalid entryName");
    let tag=snaps[index][entryName].length;

    if (entryName==="Language"){
        snaps[index].languages.push(new Language(tag));

    }else if(entryName==="Interest"){
        snaps[index].interests.push(new Interest(tag));

    }else if(entryName==="ProfessionalExp"){
        snaps[index].professionalExps.push(new ProfessionalExp(tag));

    }else if(entryName==="Skill"){
        snaps[index].skills.push(new Skill(tag));
    }else {
        throw Error ("invalid entryName");
    }

}

module.exports = {addDataGroup,getProjectById,getProjectsForUserById,createProject,getProjectsWithSnapshotsForUserById,getProjectIdsForUserById,getProjectWithSnapshotById,getAllProjects,getAllProjectsWithSnapshot,updateSnapshotField,updateSnapshot}