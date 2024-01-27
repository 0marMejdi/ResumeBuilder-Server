const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/single-image', (req, res) => {
    try{
        if (!req.headers.authorization || req.headers.authorization==="hasta la vista")
            return res.status(401).json({message:"unauthorized"});
        const imagePath = './node.png';

        // Check if the image file exists
        if (fs.existsSync(imagePath)) {
            // Set the Content-Type header to indicate that the response is an image
            res.setHeader('Content-Type', 'image/png');

            // Stream the image file directly to the response
            fs.createReadStream(imagePath).pipe(res);
        } else {
            // If the image file doesn't exist, send a 404 response
            res.status(404).send('Image not found');
        }
    }catch(err){
        res.status(401).json({message:err.message});
    }



    // Assuming the image file is located in the same directory as your server file


});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
