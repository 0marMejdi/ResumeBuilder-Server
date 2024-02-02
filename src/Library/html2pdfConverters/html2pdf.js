const pdf = require('html-pdf');
const fs = require('fs');

function convertHtmlToPdf(inputFileName, outputFileName) {
    return new Promise((resolve, reject) => {
        // Read HTML content from the input file
        const htmlContent = fs.readFileSync(inputFileName, 'utf-8');

        // Configuration for PDF creation
        const pdfOptions = {
            format: 'Letter',
            orientation: 'portrait',
        };

        // Generate PDF and save to the output file
        pdf.create(htmlContent, pdfOptions).toFile(outputFileName, (err, res) => {
            if (err) {
                reject(err);
            } else {
                console.log('PDF created successfully:', res.filename);
                resolve(res.filename);
            }
        });
    });
}
module.exports=convertHtmlToPdf;
