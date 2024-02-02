const puppeteer = require('puppeteer');
const path = require('path');

module.exports = async function  htmlToPdf(filePath, output) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Replace 'input.html' with the path to your HTML file
  const htmlFilePath = path.resolve(filePath);
  const outputPdfPath = path.resolve(output);

  // Load HTML content from file
  const content = await require('fs').promises.readFile(htmlFilePath, 'utf8');

  // Set the HTML content on the page
  await page.setContent(content, { waitUntil: 'domcontentloaded' });

  // Generate PDF
  await page.pdf({ path: outputPdfPath, format: 'A4' });

  await browser.close();

  console.log(`PDF generated successfully at: ${outputPdfPath}`);
}

async function convertFromURL (url,output) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the web page
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Get the HTML content of the page
  const htmlContent = await page.content();

  // Generate PDF
  const pdfPath = output; // Adjust the file path and name as needed
  await page.pdf({
    path: 'colored_square_test.pdf',
    format: 'A4',
    printBackground: true, // Important for background colors
  });



  console.log(`PDF generated successfully at: ${pdfPath}`);

  await browser.close();
}


