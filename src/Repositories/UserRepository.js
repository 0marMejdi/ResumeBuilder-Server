const {executeQuery} = require("../Models/ResumeBuilderDataBase");
const connection = require("../Models/ResumeBuilderDataBase").getConnection();
const User = require("../Models/User")

/**
 *
 * @param id : string
 * @return {Promise<boolean>}
 */
async function userExists(id) {
    let query = connection.format(`SELECT * FROM User WHERE id = ? ;`,[id]);
    let result =  await executeQuery(query);
    return result.length !== 0;
}
/**
 *
 * @param email : string
 * @return {Promise<boolean>}
 */
async function emailExists(email) {
    let query = connection.format('SELECT * FROM User WHERE email = ? ;', [email]);
    let result =  await executeQuery(query);
    return result.length !== 0;
}

/**
 *
 * @param id : string
 * @return {Promise<User>}
 */
async function getUserById(id) {
    let query = connection.format('SELECT * FROM User WHERE id = ? ;', [id]);
    let result =  await executeQuery(query);
    if (result.length===0)
        throw new Error("No user found");
    return result[0];
}

/**
 *
 * @param email : string
 * @return {Promise<User>}
 */
async function getUserByEmail(email) {
    let query = connection.format('SELECT * FROM User WHERE email = ? ;', [email]);
    let result =  await executeQuery(query);
    if (result.length===0)
        return null;
    return result[0];
}

/**
 *
 * @param user : User
 * @return {Promise<*>}
 */
async function createUser(user) {
    user = User.sanitize(user);
    let query = connection.format(`INSERT INTO User SET ? ;`,user);
    return await executeQuery(query) ;
}

/**
 *
 * @param user : User
 * @return {Promise<*>}
 */

async function  updateUser(user) {
    user = User.sanitize(user);
    let query=  connection.format('UPDATE user SET ? WHERE id = ? ;',[user,user.id]);
    return await executeQuery(query);
}


module.exports = { getUserById, createUser, updateUser, getUserByEmail, emailExists, userExists };