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

    let query  = connection.format('INSERT INTO project SET ? ;',Project.sanitize(project));
    let snapQuery = connection.format('INSERT INTO SNAPSHOT SET ?;',Snapshot.sanitize(project.snapshot));
    await executeQuery(query);
    await executeQuery(snapQuery);
    return Project.sanitize(project);

}
/**@param userId : string
 * @return {Promise<Project[]>}
 */
async function getSimpleProjectsForUserById (userId){
    let query = connection.format('SELECT * FROM project WHERE userId = ? ;', [userId]);
    // it's okay if he doesn't have any project, no exception needed
    return (await executeQuery(query));
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


    /**@type Project[]*/
    let project = await executeQuery(projectQuery);
    if (project.length===0)
        throw new Error("Project Not Found!")
    let snapshot = await getSnapshotOnly(projectId);
    project[0].snapshot = snapshot;
    return project[0];
}
async function getSnapshotOnly(projectId){
    let snapshotQuery = connection.format(`SELECT * FROM Snapshot WHERE projectId = ?`, [projectId] );
    let resalta = await executeQuery(snapshotQuery);
    /**@type Snapshot*/
    let snapshot = resalta[0];
    if (resalta.length===0){
        throw new Error("Snapshot not found for this project");
    }
    for (const enumClassName in Snapshot.enumerableList) {
        snapshot[enumClassName] = [];
        let enumQuery = connection.format(`SELECT * FROM ${connection.escapeId(enumClassName)} WHERE projectId = ?`,[projectId]);
        let enumDataGroupList = await executeQuery(enumQuery);
        if (enumDataGroupList.length>0) {
            snapshot[enumClassName] = enumDataGroupList;
        }
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

/**
 * TODO:datagroup must be sanitized!
 * @param projectId : string
 * @param entryName : string
 * @param datagroup : Object
 */
async function addWholeDataGroup (projectId,entryName,datagroup) {

    let query = connection.format(`INSERT INTO ?? SET ?`,[entryName,datagroup]);
    if (await tagExists(projectId,entryName,datagroup.tag))
        throw new Error("duplicate tag found!");
    await executeQuery(query);
    return datagroup;
}

/**
 * TODO: Needs the entryName to be validated first !
 * @param projectId
 * @param entryName
 * @return {Promise<Object>}
 */
async function addNewDataGroup(projectId,entryName){
    let nextTag = await getNextTag(projectId,entryName);
    let enumerableDataGroup = new Snapshot.enumerableList[entryName]();
    enumerableDataGroup.tag= nextTag;
    enumerableDataGroup.projectId = projectId;
    return await addWholeDataGroup(projectId,entryName,enumerableDataGroup);

}

module.exports = {tagExists,getNextTag,addNewDataGroup, getSnapshotOnly,updateSnapshot,updateSnapshotField,updateSnapshotFieldForEnumerable,getSimpleProjectsForUserById,getFullProjectById,createProject,projectExists,getSimpleProjectById};