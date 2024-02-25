const pdf2png = require("pdf-to-png-converter");
const fs = require("fs").promises;
module.exports = {
    toPngFile:async (input,output)=>{
        let res = await pdf2png.pdfToPng(input);
        let buffer = res[0].content;
        await fs.writeFile(output,buffer);
    },
    getPngContent:(async(pdfFile)=>{
        let res = await pdf2png.pdfToPng(pdfFile);
        return res[0].content;
    }),
    getPngContentFromPDFBuffer:async (pdfBuffer)=>{
        let res = await pdf2png.pdfToPng(pdfBuffer);
        return res[0].content;
    }

}


