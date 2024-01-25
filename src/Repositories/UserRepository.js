let users = [];
function getUserById(id) {}
function getAllUsers() {
    return users;
}
function createUser(user) {
    if (emailExists(user.email)) {
        throw new Error("Email Taken");
    }
    if (usernameExists(user.username)) {
        throw new Error("Username Taken");
    }
    users.push(user);
    //need to check if user with taken email or username exists
    //if so, throw new Error ("Email Taken") or ("Username Taken")
}
function updateUser(user) {}
function deleteUser(id) {}
function getUserByEmail(email) {
    return users.find(user => user.email == email);
}
function emailExists(email) {
    //returns true if email exists, false otherwise
    if (users.find(user => user.email == email)) {
        return true;
    }
    return false;
}
function usernameExists(username) {
    //returns true if username exists, false otherwise
    if (users.find(user => user.username == username)) {
        return true;
    }
    return false;
}
function userExists(id) {
    //returns true if user exists, false otherwise
    if (users.find(user => user.id == id)) {
        return true;
    }
    return false;
}
module.exports = { getUserById, getAllUsers, createUser, updateUser, deleteUser, getUserByEmail, emailExists, usernameExists, userExists };