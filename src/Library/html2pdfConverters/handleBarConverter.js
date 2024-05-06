const PuppeteerHTMLPDF = require("puppeteer-html-pdf");
const hbs = require("handlebars");
const Snapshot = require("../../Models/Snapshot");
const fs = require("fs").promises;

/**
 * 
 * @param {string} templateName : template name to use
 * @param {Snapshot} snapshot 
 * @returns 
 */
async function getPdfBuffer(templateName, snapshot, imageBuffer = null) {
    const buffer = imageBuffer ?? await fs.readFile("assets/projects/00000000-0000-0000-0000-000000000000/pdp.jpg");
    let encodedImage = Buffer.from(buffer).toString('base64');
    encodedImage = 'data:image/jpeg;base64,' + encodedImage;
    const pdfData = { ...snapshot, image: encodedImage }; //{ ...snapshot };

    const htmlPDF = new PuppeteerHTMLPDF();
    hbs.registerHelper('stars', function (level) {
        let stars = '';
        for (let i = 0; i < level; i++) {
            stars += '★'; // Unicode character for a star
        }
        return stars;
    });



    htmlPDF.setOptions({
        format: "A4",
        outline: false,

    });

    if (templateName.endsWith(".html")) {
        templateName = templateName.slice(0, -5);
    }
    const html = await htmlPDF.readFile(`assets/templates/${templateName}.html`, "utf8");
    const template = hbs.compile(html);
    const content = template(pdfData);
    const pdfBuffer = await htmlPDF.create(content);
    return pdfBuffer;
}


async function renderHtml(templateName, snapshot, imageBuffer = null) {
    const buffer = imageBuffer ?? await fs.readFile("assets/projects/00000000-0000-0000-0000-000000000000/pdp.jpg");
    let encodedImage = Buffer.from(buffer).toString('base64');
    encodedImage = 'data:image/jpeg;base64,' + encodedImage;
    const pdfData = { ...snapshot, image: encodedImage }; //{ ...snapshot };

    const htmlPDF = new PuppeteerHTMLPDF();
    hbs.registerHelper('stars', function (level) {
        let stars = '';
        for (let i = 0; i < level; i++) {
            stars += '★'; // Unicode character for a star
        }
        return stars;
    });


    htmlPDF.setOptions({
        format: "A4",
        outline: false,

    });
    if (templateName.endsWith(".html")) {
        templateName = templateName.slice(0, -5);
    }
    const html = await htmlPDF.readFile(`assets/templates/${templateName}.html`, "utf8");
    const template = hbs.compile(html);
    const content = template(pdfData);
    return content;
}


module.exports = { getPdfBuffer, renderHtml }