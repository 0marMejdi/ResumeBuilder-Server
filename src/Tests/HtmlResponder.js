const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'resumeExample.html');

    try {
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
        const jsonResponse = {
            htmlContent, name:"omar",lastname:"mejdi"
        };
        res.json(jsonResponse);
    } catch (error) {
        console.error('Error reading HTML file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
