let puppeteer= require("../Models/html2pdfConverters/puppeteer");
let html2pdf = require("../Models/html2pdfConverters/html2pdf");
let jsPdf = require("../Models/html2pdfConverters/JsPdfConverter");
let pdfKit = require("../Models/html2pdfConverters/pdfKit");


puppeteer("Marine.html", "puppeteerResult.pdf");
html2pdf("Marine.html", "html2pdfResult.pdf");



