let users = [{
    "id": "1706821332398",
    "email": "omar@insat.ucar.tn",
    "firstName": "omar",
    "lastName": "mejdi"
}];
function getUserById(id) {
    return users.find(user => user.id === id);
}

function createUser(user) {

    users.push(user);

}
function updateUser(user) {}
function getUserByEmail(email) {
    return users.find(user => user.email === email);
}
function emailExists(email) {
    //returns true if email exists, false otherwise
    return !!users.find(user => user.email === email);

}

function userExists(id) {
    //returns true if user exists, false otherwise
    return !!users.find(user => user.id === id);

}
module.exports = { getUserById, createUser, updateUser, getUserByEmail, emailExists, userExists };