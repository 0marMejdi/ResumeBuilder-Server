let users = [];
function getUserById(id) {
    return users.find(user => user.id === id);
}
function getAllUsers() {
    return users;
}
function createUser(user) {

    users.push(user);
    //need to check if user with taken email or username exists
    //if so, throw new Error ("Email Taken") or ("Username Taken")
}
function updateUser(user) {}
function deleteUser(id) {}
function getUserByEmail(email) {
    return users.find(user => user.email === email);
}
function emailExists(email) {
    //returns true if email exists, false otherwise
    return !!users.find(user => user.email === email);

}
function usernameExists(username) {
    //returns true if username exists, false otherwise
    return !!users.find(user => user.username === username);

}
function userExists(id) {
    //returns true if user exists, false otherwise
    return !!users.find(user => user.id === id);

}
module.exports = { getUserById, getAllUsers, createUser, updateUser, deleteUser, getUserByEmail, emailExists, usernameExists, userExists };