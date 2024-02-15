const multer = require("multer");
const fs = require("fs");
const path = require("path");

module.exports  = function configureUploadForProject(req,res,next){
    console.log("entered upload");
    let projectId= req.body.project.id;
    const storage = multer.diskStorage({
        destination: function (req, file, callBackFunction) {
            console.log(`project id for storage is : ${projectId}`);
            let myPath = "./projects/"+projectId;
            fs.mkdir(myPath, {recursive: true},()=>{
                console.log(`created ${myPath}`)
            });
            callBackFunction(null, myPath); // Set the destination folder for uploaded files
        },
        filename: function (req, file, callBackFunction) {
            callBackFunction(null, "pdp"+ path.extname(file.originalname)); // Set the filename to be unique
        }
    });
    const upload = multer({ storage: storage });
    next(upload.single("profilePicture"));
}
