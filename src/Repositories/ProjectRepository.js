const Project = require("../Models/Project");
const Info = require("../Models/EnumData");
const { resolve } = require("mathjs");
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
        createConnection.query('SELECT * FROM project WHERE id = ? ;',[projectId], (err, result) => {
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
    connection.query('INSERT INTO project SET ? ;',project, (err, result) => {
        if (err) {
            reject(new Error(err));
        } else {
            resolve(result);
        }
      });
})}
const getSimpleProjectsForUserById = (userId)=>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM project WHERE userId = ? ;', [userId], (err, result) => {
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
        connection.query('SELECT * FROM project WHERE id = ? ;', [projectId], (err, result) => {
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
                                p.id=? ;`,[projectId],(err,result)=>{
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
        connection.query(`SELECT * FROM snapshot WHERE projectId = ? ;`,[projectId],(err,result)=>{
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
    return new Promise((reject,resolve)=>{
        connection.query(`UPDATE ? SET ? = ? WHERE tag=? and projectId = ? ;`,[entryName,fieldName,fieldValue,tag,projectId],(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
const updateSnapshotField = (projectId,fieldName,fieldValue)=>{
        return new Promise((reject,resolve)=>{
            connection.query(`UPDATE snapshot SET ? = ? WHERE projectId=? ;`,[fieldName,fieldValue,projectId],(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(err);
                }
            })

        })


}
/**
 *
 * @param projectId :string
 * @param snapshot :Snapshot
 */
const updateSnapshot = (projectId,snapshot)=>{
    return new Promise((reject,resolve)=>{
        connection.query(`UPDATE snapshot SET ? WHERE projectId=? ;`,[snapshot,projectId],(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(err);
            }
        })
    })
}
/**
 *
 * @param projectId : string
 * @param entryName : string
 * @param datagroup : Object
 */
const addDataGroup = (projectId,entryName,datagroup)=> {
    return new Promise((reject,resolve)=>{
        connection.query(`INSERT INTO ? SET ?;
        UPDATE ? SET  projectId=? where id=?;
        update ? set tag=(select max_tag from(select max(tag) as max_tag from ?) as subquery )+1 where id=?;`,[entryName,datagroup,entryName,projectId,datagroup.id,entryName,entryName,datagroup.id],(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result)
            }

        })
    })

}

module.exports = {getSnapshotOnly,updateSnapshot,updateSnapshotField,updateSnapshotFieldForEnumerable,getSimpleProjectsForUserById,getFullProjectById,createProject,addDataGroup,projectExists,getSimpleProjectById};