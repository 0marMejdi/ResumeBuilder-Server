const fs = require("fs").promises;
const pdfConverter = require ("../Models/html2pdfConverters/html2pdf")
/*
* •`GET /template` :  gets you the name list of template names.
*
* •`GET /template/html/{templateName}` :
*
* •`GET /template/html` : returns them all html contents of templates in one json object containing array.
*
* •`GET /template/thumb/{templateName}`: returns for given template name, the thumbnail image for it. return a PNG image content
*
* •`POST /template/{templateName}` : adds a new project for the current user using a preselected template given in param. must include in request body a Project Json Object `project: {title, creationDate}`
*/

function resolveName(name){
    return __dirname + "/../../assets/templates/" + name + ".html"
}

const getTemplatesList =  async  ()=>{
    let result = await fs.readdir(__dirname + "/../../assets/templates/");
    return result.map(temp=>temp.split('.')[0])
};
const getTemplateContent =async (name)=>{

    return await fs.readFile(resolveName(name), 'utf-8');
};

const getTemplatePdf = async (name)=>{
    let path = `../../temp/${Date.now()}.pdf`;
    await pdfConverter(resolveName(name), path);
    let content = await fs.readFile(path);
    fs.rm(path);
    return content;

}
const    getTemplateThumb= async (name)=>{

    const Thumb = require(__dirname+"/../Models/PdfToPng");
    // const Thumb = require("../Models/PdfToPng");
    const html2pdf = require(`${__dirname}+/../Models/html2pdfConverters/html2pdf`);
    // const html2pdf = require(`../Models/html2pdfConverters/html2pdf`);
    // console.log("converting html to pdf");
    const tempName=Date.now();
    console.log("converting pdf to png content")
    await html2pdf(resolveName(name),`${__dirname}/../../temp/${tempName}.pdf`);
    console.log("pdf to png content success");
    // console.log("html2pdf finished");

    let pngContent = await Thumb.getPngContent(`${__dirname}/../../temp/${tempName}.pdf`);

    fs.rm(`${__dirname}/../../temp/${tempName}.pdf`);
    return pngContent;
    //return await fs.readFile(`${__dirname}/../../temp/thumb.png`);

};
  const  getAllTemplateContent = async()=>{

    let names = await getTemplatesList();
    let resalta = [];
      for (let name in names) {
          let content = await getTemplateContent(names[name]);
          resalta.push({name:names[name],content});
      }
    return resalta;

};


module.exports = {
    getAllTemplateContent, getTemplatesList, getTemplateThumb, getTemplateContent, getTemplatePdf
}



