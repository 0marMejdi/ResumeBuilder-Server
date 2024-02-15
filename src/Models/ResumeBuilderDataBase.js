const mysql=require('mysql2');

const config = require ("dotenv").config();
const defaultConnection={
    host:"localhost",
    user:"root",
    password:"",
};
function getConfiguration(){
    let conn = defaultConnection;
    if (process.env.DATABASE_HOST)
        conn.host=process.env.DATABASE_HOST;
    if (process.env.DATABASE_PASSWORD)
        conn.password=process.env.DATABASE_PASSWORD;
    if (process.env.DATABASE_USERNAME)
        conn.user = process.env.DATABASE_USERNAME;
    return conn;
}
const dataBaseName = process.env.DATABASE_NAME?process.env.DATABASE_NAME:defaultConnection.dbName;
const connection = mysql.createConnection(getConfiguration());

// Function to execute a single query and return a promise
function executeQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

// Function to execute a list of queries sequentially
function executeQueriesSequentially(queries) {
    return new Promise(async (resolve, reject) => {
        try {
            for (let i = 0; i < queries.length; i++) {
                await executeQuery(queries[i]);
            }
            resolve("All queries executed successfully.");
        } catch (error) {
            reject(error);
        }
    });
}

const createTableQueries = [
    `CREATE DATABASE IF NOT EXISTS ${dataBaseName}`,
    `USE ${dataBaseName}`,
    `CREATE TABLE IF NOT EXISTS User (
        id varchar(40) PRIMARY KEY NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        imageURL VARCHAR(255),
        passwordHash VARCHAR(255) NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS Project (
        id varchar(40) PRIMARY KEY NOT NULL,
        title VARCHAR(255) NOT NULL,
        creationDate BIGINT,      
        templateName VARCHAR(255),
        userId varchar(40),
        FOREIGN KEY (userId) REFERENCES User(id)
    );`,
    `CREATE TABLE IF NOT EXISTS Snapshot (
        id varchar(40) PRIMARY KEY NOT NULL,
        aboutMe text,
        fontFamily varchar(50),
        reference varchar(50),
        address varchar(50) ,
        city varchar(30),
        email varchar(30),
        firstName varchar(20),
        imageURL varchar(100),
        lastName varchar(20),
        phoneNumber varchar(30),
        postalCode varchar(10),
        profileTitle varchar(50),
        projectId varchar(40),
        FOREIGN KEY (projectId) REFERENCES Project(id)
    );`,
    `CREATE TABLE IF NOT EXISTS Language (
        id varchar(40) PRIMARY KEY,
        name varchar(30),
        level int,
        tag int,
        projectId varchar(40),
        FOREIGN KEY (projectId) REFERENCES Project(id)
    );`,
    `CREATE TABLE IF NOT EXISTS Skill (
        id varchar(40) PRIMARY KEY not null,
        name VARCHAR(100),
        level int,
        tag int,
        projectId varchar(40),
        FOREIGN KEY (projectId) REFERENCES Project(id)
    );`,
    `CREATE TABLE IF NOT EXISTS ProfessionalExp (
        id varchar(40) PRIMARY KEY not null,
        city varchar(50),
        description text,
        companyName varchar(50),
        finishMonth int,
        finishYear int,
        post varchar(100),
        startingMonth int,
        startingYear int,
        tag int,
        toPresent TINYINT,
        projectId varchar(40),
        FOREIGN KEY (projectId) REFERENCES Project(id)
    );`,
    `CREATE TABLE IF NOT EXISTS Education (
        id varchar(40) PRIMARY KEY not null,
        institutionName varchar(255),
        description text,
        degree varchar(255),
        finishMonth int,
        finishYear int,
        startingMonth int,
        startingYear int,
        tag int,
        toPresent TINYINT,
        projectId varchar(40),
        FOREIGN KEY (projectId) REFERENCES Project(id)
    );`,
    `CREATE TABLE IF NOT EXISTS interest (
        id varchar(40) PRIMARY KEY,
        name varchar(30),
        tag int,
        projectId varchar(40),
        FOREIGN KEY (projectId) REFERENCES Project(id)
    );`,
    `CREATE TABLE IF NOT EXISTS Orders(
        id varchar(40) PRIMARY KEY,
        Education int,
        ProfessionalExp INT,
        Language INT,
        Skill INT,
        Interest INT,
        projectId varchar(40),
        FOREIGN KEY (projectId) REFERENCES Project(id)
     )`
];
function  createTables(){
    return executeQueriesSequentially(createTableQueries);
}

module.exports = {executeQuery, getConnection:() => connection , createTables};
