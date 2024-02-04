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
    return new Promise((resolve, reject) => {
        createConnection.query('SELECT * FROM project WHERE id = ?',[projectId], (err, result) => {
            if (err) {
                reject(new Error(err));
            } else {
                resolve(result.length > 0);
            }
        });
    });
}
const createProject = (project)=>{
    return new Promise((resolve,reject)=>{
    connection.query('INSERT INTO project SET ?',project, (err, result) => {
        if (err) {
            reject(new Error(err));
        } else {
          resolve(result);
        }
      });
})}
const getSimpleProjectsForUserById = (userId)=>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM project WHERE userId = ?', [userId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}
const getSimpleProjectById = (projectId)=>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM project WHERE id = ?', [projectId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}
/**
 * returns project with snapshots
 * @param projectId : string
 * @returns {Project}
 */
const getFullProjectById=(projectId)=>{
    return new Promise((resolve, reject) => { 
        connection.query(`select * from project p,snapshot s,skill sk,professionalexp pro,formation f,interest i 
                                where 
                                p.id=s.projectId and 
                                p.id=sk.projectId and 
                                p.id=pro.projectId and 
                                p.id=f.projectId and
                                p.id=i.projectId and
                                p.id=?`,[projectId],(err,result)=>{
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
    })
})
}
function getSnapshotOnly  (projectId){
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT * FROM snapshot WHERE projectId = ?`,[projectId],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }

        })
    })

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