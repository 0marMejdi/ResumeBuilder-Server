let puppeteer= require("../Library/html2pdfConverters/puppeteer");
let html2pdf = require("../Library/html2pdfConverters/html2pdf");
let jsPdf = require("../Library/html2pdfConverters/JsPdfConverter");
let pdfKit = require("../Library/html2pdfConverters/pdfKit");


puppeteer("Marine.html", "puppeteerResult.pdf");
html2pdf("Marine.html", "html2pdfResult.pdf");



