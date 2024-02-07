const Project = require("../Models/Project");
const Snapshot = require("../Models/Snapshot");
const connection = require("../Models/ResumeBuilderDataBase").getConnection();
const dbContext = require("../Models/ResumeBuilderDataBase");
const {executeQuery} = require("../Models/ResumeBuilderDataBase");


async function projectExists(projectId) {
    let query = connection.format('SELECT * FROM project WHERE id = ? ;',[projectId]);
    let result = await executeQuery(query);
    return (result.length>0);
}

/**
 *
 * @param project : Project
 * @returns {Promise<unknown>}
 */
async function createProject (project){
    project = Project.sanitize(project);
    let query  = connection.format('INSERT INTO project SET ? ;',project);
    return await executeQuery(query);

}
/**@param userId : string
 * @return {Promise<Project[]>}
 */
async function getSimpleProjectsForUserById (userId){
    let query = connection.format('SELECT * FROM project WHERE userId = ? ;', [userId]);
    // it's okay if he doesn't have any project, no exception needed
    return await executeQuery(query);
}

/**
 *
 * @param projectId : string
 * @return {Promise<User>}
 */
async function  getSimpleProjectById(projectId){
    let query  = connection.format('SELECT * FROM project WHERE id = ? ;', [projectId]);
    let result = await executeQuery(query) ;
    if (result.length<=0)
        throw new Error("No Project Found For this id!")
    return result[0] ;
}
/**
 * returns project with snapshots
 * @param projectId : string
 * @return Promise<Project>
 */
async function  getFullProjectById(projectId){
    let projectQuery = connection.format(`SELECT * FROM Project WHERE id = ?`,[projectId]);
    let snapshotQuery = connection.format(`SELECT * FROM Snapshot WHERE projectId = ?`, [projectId] );

    /**@type Project*/
    let project = await executeQuery(projectQuery);
    project.snapshot = await getSnapshotOnly(projectId);
    return project;
}
async function getSnapshotOnly(projectId){
    let snapshotQuery = connection.format(`SELECT * FROM Snapshot WHERE projectId = ?`, [projectId] );
    /**@type Snapshot*/
    let snapshot = await executeQuery(snapshotQuery);
    for (const enumClassName in Snapshot.enumerableList) {
        snapshot[enumClassName] = [];
        let enumQuery = connection.format(`SELECT * FROM ${connection.escapeId(enumClassName)} WHERE projectId = ?`,[projectId]);
        let enumDataGroupList = await executeQuery(enumQuery);
        if (enumDataGroupList.length>0)
            snapshot[enumClassName]  = enumDataGroupList;
    }
    return snapshot;
}
/**
 *
 * @param projectId :string
 * @param fieldName :string
 * @param fieldValue :string
 * @param entryName :string
 * @param tag :number
 */

async function updateSnapshotFieldForEnumerable (projectId,fieldName,fieldValue,entryName,tag){
   let query = connection.format(`UPDATE ${connection.escapeId(entryName)} SET ${connection.escapeId(fieldName)} = ? WHERE tag=? and projectId = ? ;`,[fieldValue,tag,projectId]);
   return await executeQuery(query);
}
async function updateSnapshotField (projectId,fieldName,fieldValue){
    let query = connection.format(`UPDATE snapshot SET ${connection.escapeId(fieldName)} = ? WHERE projectId=?`,[fieldValue,projectId]);
    return await executeQuery(query);
}
/**
 *
 * @param projectId :string
 * @param snapshot :Snapshot
 */
async function updateSnapshot(projectId,snapshot){
    // before we start, we sanitize the snapshot from any suspicious stuff.
    snapshot = Snapshot.fullSanitize(snapshot);
    // now for each enumerable data group:
    for (const key in Snapshot.enumerableList) {
        // first, we delete all enumerable data to let us replace them by newer ones.
        let deleteAllEnum = connection.format(`DELETE FROM ${connection.escapeId(key)} WHERE projectId= ?`, [snapshot.projectId]);
        await executeQuery(deleteAllEnum);
        // now for each enumerable data group, we insert them one by one in their appropriate table
        for (const index in snapshot[key]) {
            let enumData = snapshot[key][index];
            let insertEnum = connection.format(`INSERT INTO ${connection.escapeId(key)} SET ?`, enumData);
            await executeQuery(insertEnum);
        }
    }
    // now we update the big Snapshot object regardless their enumerable data.
    let updateSnapQuery = connection.format(`UPDATE snapshot SET ? WHERE projectId=? ;`, [Snapshot.sanitize(snapshot), projectId]);
    return await executeQuery(updateSnapQuery);
}
/**
 *
 * @param projectId : string
 * @param entryName : string
 * @param datagroup : Object
 */
const addDataGroup = (projectId,entryName,datagroup)=> {
    return new Promise((resolve,reject)=>{
        connection.query(`INSERT INTO ? SET ?;
        UPDATE ? SET  projectId=? where id=?;
        update ? set tag=(select max_tag from(select max(tag) as max_tag from ?) as subquery )+1 where id=? ;`,[entryName,datagroup,entryName,projectId,datagroup.id,entryName,entryName,datagroup.id],(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result)
            }

        })
    })
}
async function getNextTag(projectId, entryName){
    let query = connection.format(`SELECT * FROM ?? WHERE projectId = ? `,[entryName,projectId]);
    /**@type Object[]*/
    let result = await executeQuery(query);

    if (result.length===0)
        return 0;
    /**@type number[]*/
    let tags= result.map(result=>result.tag);
    return Math.max(...tags)+1;


}
async function tagExists(projectId,entryName,tag){
    let query = connection.format(`SELECT * FROM ?? WHERE projectId = ? `,[entryName,projectId]);
    /**@type Object[]*/
    let result = await executeQuery(query);

    if (result.length===0)
        return false;
    let EnumWithSameTag = result.find(enumData => enumData.tag===tag);
    if (EnumWithSameTag)
        return true;
    else
        return false;
}


module.exports = {getSnapshotOnly,updateSnapshot,updateSnapshotField,updateSnapshotFieldForEnumerable,getSimpleProjectsForUserById,getFullProjectById,createProject,addDataGroup,projectExists,getSimpleProjectById};