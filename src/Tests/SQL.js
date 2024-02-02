const mysql=require('mysql2');
const express=require('express');
const cors=require('cors')

const app=express();
app.use(cors());
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ahmedahmed',

});

connection.connect((err) => {
    if (err) throw new Error(err);
    console.log("conected");
    connection.query('CREATE database IF NOT EXISTS resumebuilder',(err)=>{
        if (err) throw new Error(err);
        console.log("Database created or already exist")
        connection.changeUser({database : 'resumebuilder'} , (err)=>{
            if(err) throw new Error(err)
            createTables();
        })
    })



});

function createTables(){
    connection.query(`CREATE TABLE IF NOT EXISTS User (
        userID varchar(30) PRIMARY KEY NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
        projectID varchar(30)
       
    );`,(err)=>{
        if(err) throw new Error(err)
        console.log("table user created")
    })
    connection.query(`CREATE TABLE IF NOT EXISTS Project (
        projectID varchar(30) PRIMARY KEY,
        projectName VARCHAR(255) NOT NULL,
        creationDate date,
        projectThumbnailURL VARCHAR(255)
        
    );`,(err)=>{
        if(err) throw new Error(err)
        console.log("table Project  created")
    });
    connection.query(`CREATE TABLE IF NOT EXISTS Snapshot (
        snapshotID varchar(30) PRIMARY KEY NOT NULL,
        projectID varchar(30),
        snapshotDate DATE NOT NULL,
        aboutMe varchar(100),
        address varchar(50),
        city varchar(30),
        email varchar(30),
        firstName varchar(20),
        imageUrl varchar(100),
        lastName varchar(20),
        phoneNumber varchar(30),
        postalCode varchar(10),
        profileTitle varchar(50),
        FOREIGN KEY (projectID) REFERENCES Project(projectID)
    );`,(err)=>{
        if(err) throw new Error(err)
        console.log("table Snapshot created")
    });
    connection.query(`create table IF NOT EXISTS Language(
        languageId varchar(10) not null PRIMARY KEY ,
        languageName varchar(30),
        proficiencyLevel varchar(10),
        tag int,
        snapshotID varchar(30),
        FOREIGN KEY (snapshotID) REFERENCES Snapshot(snapshotID));`,(err)=>{
        if(err) throw new Error(err)
        console.log("table Language created")
    });
    connection.query(`create table IF NOT EXISTS Skills(
        skillID varchar(10) PRIMARY KEY not null ,
        skillName VARCHAR(100),
        proficiencyLevel VARCHAR(50),
        tag int,
        snapshotID varchar(30),
        FOREIGN KEY (snapshotID) REFERENCES Snapshot(snapshotID));`,(err)=>{
        if(err) throw new Error(err)
        console.log("table Skills created")
    });

    connection.query(`create table IF NOT EXISTS professionalExp(
        experienceID varchar(10) PRIMARY KEY not null,
        jobTitle VARCHAR(30) ,
        companyName VARCHAR(30),
        startDate DATE,
        endDate DATE,
        description TEXT,
        location VARCHAR(30),
        workLocationType VARCHAR(50),
        tag int,
        snapshotID varchar(30),
        FOREIGN KEY (snapshotID) REFERENCES Snapshot(snapshotID));`,(err)=>{
        if(err) throw new Error(err)
        console.log("table professionalExp created")
    });
    connection.query(`create table IF NOT EXISTS formation(
        formationID varchar(10) PRIMARY KEY not null,
        institutionName VARCHAR(100),
        degree VARCHAR(30),
        fieldOfStudy VARCHAR(100),
        startDate DATE,
        graduationDate DATE,
        description TEXT,
        snapshotID varchar(30),
        FOREIGN KEY (snapshotID) REFERENCES Snapshot(snapshotID));
        `,(err)=>{
        if(err) throw new Error(err)
        console.log("table formation created")
    });
    connection.query(`create table IF NOT EXISTS interest(
        interestId varchar(10) PRIMARY KEY NOT NULL,
        interestName varchar(30),
        tag int,
        snapshotID varchar(30),
        FOREIGN KEY (snapshotID) REFERENCES Snapshot(snapshotID));
    `,(err)=>{
        if(err) throw new Error(err)
        console.log("table interests created")
    });
}


app.listen(3000);