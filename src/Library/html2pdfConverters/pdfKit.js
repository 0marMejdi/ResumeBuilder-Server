const fs = require('fs');
const PDFDocument = require('pdfkit');

module.exports = function convertHtmlToPdf(inputFileName, outputFileName) {
    // Read HTML content from the input file
    const htmlContent = fs.readFileSync(inputFileName, 'utf-8');

    // Create a PDF document
    const doc = new PDFDocument();

    // Pipe the PDF output to a writable stream (file)
    const outputStream = fs.createWriteStream(outputFileName);
    doc.pipe(outputStream);

    // Embed HTML content in the PDF
    doc.text(htmlContent, {
        align: 'left',
        paragraphGap: 10,
    });

    // Finalize the PDF
    doc.end();

    console.log('PDF created successfully:', outputFileName);
}

