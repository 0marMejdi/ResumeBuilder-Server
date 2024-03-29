const express = require('express');
const multer = require('multer');
var path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

// Configure multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, callBackFunction) {
        let id = Date.now().toString();
        fs.mkdir("uploads/"+id, {recursive: true},(err,path)=>{

        });
        callBackFunction(null, `uploads/${id}/`); // Set the destination folder for uploaded files
    },
    filename: function (req, file, callBackFunction) {
        callBackFunction(null, "pdp"+ path.extname(file.originalname)); // Set the filename to be unique
    }
});

const upload = multer({ storage: storage });

// Handle POST requests to /register
app.post('/register', upload.single('profilePicture'), (req, res) => {
    console.log("entered register");
    // Access form data
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    console.log(firstName + " " + lastName);
    // Access uploaded file information
    const profilePicture = req.file;

    // Process the data as needed (e.g., save to database)
    // For simplicity, this example just sends a response with the received data
    res.json({
        firstName,
        lastName,
        email,
        password,
        profilePicture
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
