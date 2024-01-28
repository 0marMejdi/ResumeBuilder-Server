const fs = require('fs');
const { JSDOM } = require('jsdom');

// Read HTML content from an external file
const htmlFilePath = './Marine.html';
const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

// Create a DOM document from the HTML content
const dom = new JSDOM(htmlContent);

// Access the document object
const document = dom.window.document;

// Manipulate the DOM as needed
let fullName = document.getElementById("fullName");
fullName.innerHTML="Omar Mejdi";

// Serialize the modified DOM back to HTML
const modifiedHtml = dom.serialize();
console.log(modifiedHtml);

// Optionally, save the modified HTML to a new file
const outputFilePath = 'output.html';
fs.writeFileSync(outputFilePath, modifiedHtml, 'utf-8');