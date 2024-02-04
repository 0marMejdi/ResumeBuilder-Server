const { resolve } = require("mathjs");

let users = [{
    "id": "1706821332398",
    "email": "omar@insat.ucar.tn",
    "firstName": "omar",
    "lastName": "mejdi"
}];
function getUserById(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE id = ? ;', [id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}

function createUser(user) {
    return new Promise((reject,resolve)=>{
    connection.query('INSERT INTO user SET ? ;',newUser, (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
      })});
    }


function updateUser(user) {
    return new Promise((reject,resolve)=>{
    connection.query('UPDATE user SET ? WHERE id = ? ;',[userUpdate,userUpdate.userID],(err,result)=>{
        if (err) {
            reject(err);
           } else {
            resolve(result)
           }
        
    })})
}
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE email = ? ;', [email], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}
function emailExists(email) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE email = ? ;`, [email], (err, result) => {
            if (err) {
                reject(new Error(err));
            } else {
                resolve(result.length > 0);
            }
        });
    });
}

function userExists(id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE id = ? ;`,[id], (err, result) => {
            if (err) {
                reject(new Error(err));
            } else {
                resolve(result.length > 0);
            }
        });
    });
}

function createTables(){
    return new Promise((reject,resolve)=>{
    connection.query(`CREATE TABLE IF NOT EXISTS User (
        id varchar(30) PRIMARY KEY NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        imageURL VARCHAR(255) ,
        passwordHash VARCHAR(255) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS Project (
        id varchar(30) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        creationDate date,
        templateName VARCHAR(255),
        userId varchar(30),
        FOREIGN KEY (userId) REFERENCES user(id));
    
    CREATE TABLE IF NOT EXISTS Snapshot (
        id varchar(30) PRIMARY KEY ,
        aboutMe varchar(100),
        address varchar(50),
        city varchar(30),
        email varchar(30),
        firstName varchar(20),
        imageURL varchar(100),
        lastName varchar(20),
        phoneNumber varchar(30),
        postalCode varchar(10),
        profileTitle varchar(50),
        projectId varchar(30),
        FOREIGN KEY (projectId) REFERENCES Project(id));

    create table IF NOT EXISTS Language(
        id varchar(10) PRIMARY KEY ,
        name varchar(30),
        level varchar(10),
        tag int,
        projectId varchar(30),
        FOREIGN KEY (projectId) REFERENCES Project(id));

    create table IF NOT EXISTS Skill(
        id varchar(10) PRIMARY KEY not null ,
        name VARCHAR(100),
        level VARCHAR(50),
        tag int,
        projectId varchar(30),
        FOREIGN KEY (projectId) REFERENCES Project(id));

    create table IF NOT EXISTS ProfessionalExp(
        id varchar(10) PRIMARY KEY not null,
        city varchar(50),
        description varchar(255),
        employerName varchar(50),
        finishMonth int,
        finishYear int,
        post varchar(100),
        startingMonth int,
        startingYear int,
        tag int,
        projectId varchar(30),
        FOREIGN KEY (projectId) REFERENCES Project(id));

    create table IF NOT EXISTS formation(
        id varchar(10) PRIMARY KEY not null,
        city varchar(50),
        description varchar(255),
        establishment varchar(50),
        finishMonth int,
        finishYear int,
        startingMonth int,
        startingYear int,
        tag int,
        title varchar(100),
        projectId varchar(30),
        FOREIGN KEY (projectId) REFERENCES Project(id));

    create table IF NOT EXISTS interest(
        id varchar(10) PRIMARY KEY,
        name varchar(30),
        tag int,
        projectId varchar(30),
        FOREIGN KEY (projectId) REFERENCES Project(id));`,(err,result)=>{
        if(err){
            reject(err)
        }else{
            resolve(result)
        }
    })})
}
module.exports = { getUserById, createUser, updateUser, getUserByEmail, emailExists, userExists,createTables };