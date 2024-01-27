const pdf = require('html-pdf');
const fs = require('fs');

function convertHtmlToPdf(inputFileName, outputFileName) {
    // Read HTML content from the input file
    const htmlContent = fs.readFileSync(inputFileName, 'utf-8');

    // Configuration for PDF creation
    const pdfOptions = {
        format: 'Letter',
        orientation: 'portrait',
    };

    // Generate PDF and save to the output file
    pdf.create(htmlContent, pdfOptions).toFile(outputFileName, function(err, res) {
        if (err) {
            console.error(err);
        } else {
            console.log('PDF created successfully:', res.filename);
        }
    });
}
module.exports=convertHtmlToPdf;
