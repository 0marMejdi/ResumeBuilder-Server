const { jsPDF } = require('jspdf');
const fs = require('fs');

module.exports = function convertHtmlToPdf(inputFileName, outputFileName) {
    // Read HTML content from the input file
    const htmlContent = fs.readFileSync(inputFileName, 'utf-8');

    // Create a new jsPDF instance
    const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
    });

    // Add HTML content to the PDF
    pdf.html(htmlContent, {
        callback: function(pdf) {
            // Save the PDF to the output file
            pdf.save(outputFileName);
            console.log('PDF created successfully:', outputFileName);
        },
    });
}


