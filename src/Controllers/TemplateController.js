const { getPdfBuffer , renderHtml} = require('../Library/html2pdfConverters/handleBarConverter');
const { getPngContentFromPDFBuffer } = require('../Library/PdfToPng');

const fs = require("fs").promises;
const placeHolderSnapshot =
{
    aboutMe: "My name is John Doe, I love Gaming so Much it is my hobby especially Far Cry 3, I'm also cloud engineer and web developper and cyber security consultant and pentester and game developper and data analyst and AI model trainer ",
    fontFamily: "Arial",
    reference: "https://www.github.com/0marMejdi",
    address: "Centre Urbain Nord",
    city: "Tunis",
    email: "john.doe@insat.ucar.tn",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+216 27 182 818",
    postalCode: "6140",
    profileTitle: "Software ",
    Education:
        [
            {
                institutionName: "INSAT",
                description: "The Software Engineering sector is a training course which aims to train engineers specialized in methods of analysis and management of IT projects, as well as in the languages and tools necessary for software development. ",
                degree: "Software Engineering Degree",
                finishMonth: 5,
                finishYear: 2023,
                startingMonth: 9,
                startingYear: 2019,
                tag: 0,
                toPresent: 0
            }
        ]
    ,
    ProfessionalExp:
        [
            {
                city: "Tunis",
                description: "I did this and that and so on",
                companyName: "ElyaData",
                finishMonth: 12,
                finishYear: 2022,
                post: "Front End Developer",
                startingMonth: 5,
                startingYear: 2020,
                tag: 0,
                toPresent: 0
            },
            {
                city: "Tunis",
                description: "Super Duper Underrated Description",
                companyName: "EY",

                post: "CyberSec Consultant",
                startingMonth: 1,
                startingYear: 2024,
                tag: 0,
                toPresent: 1
            }
        ]
    ,
    Language:
        [
            {
                name: "English",
                level: "5",
                tag: 1
            }
            ,
            {
                name: "French",
                level: "2",
                tag: 0
            }
        ]
    ,
    Skill:
        [
            {
                name: "Designing",
                level: "3",
                tag: 0
            }
        ]
    ,
    Interest:
        [
            {
                name: "Sleeping",
                tag: 0
            }
        ]
    ,
    Orders:
    {
        Education: 0,
        ProfessionalExp: 1,
        Language: 2,
        Skill: 3,
        Interest: 4
    }

};
const getTemplatesList = async () => {
    let result = await fs.readdir("assets/templates/");
    return result.map(temp => temp.split('.')[0])
};
const getTemplateContent = async (name) => {
    // return await fs.readFile('assets/templates/'+name+'.html', 'utf-8');
    return await renderHtml(name, placeHolderSnapshot);
};
/**
 * 
 * @param {string} name : template name
 * @returns {Buffer} : binary content of the pdf file
 */
const getTemplatePdf = async (name) => {
    return await getPdfBuffer(name,placeHolderSnapshot);
}
/**
 * gets the thumbnail image for a given template name. mainly it's the binary content of the image in a buffer.
 * @param name : string
 * @returns {Promise<Buffer>}
 */
const getTemplateThumb = async (name) => {
    const pdfContent = await getPdfBuffer(name, placeHolderSnapshot);
    const pngContent = await getPngContentFromPDFBuffer(pdfContent);
    return pngContent;
};
const getAllTemplateContent = async () => {
    let names = await getTemplatesList();
    let resalta = [];
    for (let name in names) {
        let content = await getTemplateContent(names[name]);
        resalta.push({ name: names[name], content });
    }
    return resalta;
};


module.exports = {
    getAllTemplateContent, getTemplatesList, getTemplateThumb, getTemplateContent, getTemplatePdf
}



