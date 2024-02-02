const fs = require("fs").promises;
const pdfConverter = require ("../Library/html2pdfConverters/html2pdf")
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
/**
 * gets the thumbnail image for a given template name. mainly it's the binary content of the image in a buffer.
 * @param name : string
 * @returns {Promise<Buffer>}
 */
const getTemplateThumb= async (name)=>  await fs.readFile(`${__dirname}/../../assets/templates/thumbs/${name}.png`);

const getTemplateThumbDynamic = async(name)=>{
    const Thumb = require(__dirname+"/../Models/PdfToPng");
    const html2pdf = require(`${__dirname}+/../Models/html2pdfConverters/html2pdf`);
    // making temporary name for intermediate file
    const tempName=Date.now();
    // converting template from html to pdf
    await html2pdf(resolveName(name),`${__dirname}/../../temp/${tempName}.pdf`)
    // converting template from pdf to png
    let pngContent = await Thumb.getPngContent(`${__dirname}/../../temp/${tempName}.pdf`);
    // deleting intermediate file
    await fs.rm(`${__dirname}/../../temp/${tempName}.pdf`);
    return pngContent;
};
const getAllTemplateContent = async()=>{

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



