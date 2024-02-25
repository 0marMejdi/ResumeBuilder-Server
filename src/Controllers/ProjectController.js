

let Project = require( "../Models/Project");
let EnumDataController = require("../Controllers/EnumDataController")
let ProjectRepository = require("../Repositories/ProjectRepository")
let Snapshot = require("../Models/Snapshot")
let EnumerableData = require("../Models/EnumerableData")
const {promises: fs} = require("fs");
const { JSDOM } = require('jsdom');
const {getPdfBufferFromHTML} = require("../Library/html2pdfConverters/html2pdf");
const {getPngContentFromPDFBuffer} = require("../Library/PdfToPng");


const newProject =async (title,templateName,userId)=>{
    let templates = await require("../Controllers/TemplateController").getTemplatesList();
    if (!templateName)

    if (!templates.includes(templateName))
        throw  new Error("this template is not found!");
    let project = new Project(title,templateName,userId);
    await ProjectRepository.createProject(project);
    return (project.id);
}
const getSimpleProjectsList = async (userId) =>{
    let projects= await ProjectRepository.getSimpleProjectsForUserById(userId);
    return projects.map(project=>Project.fullTrim(project));
}
const getSimpleProject =async (projectId)=>{
    let project=  await ProjectRepository.getSimpleProjectById(projectId);
    return Project.fullTrim(project);

}
const getFullProject= async(projectId)=>{
    let project= await ProjectRepository.getFullProjectById(projectId);
    return Project.fullTrim(project);
}
const getSnapshot =async (projectId)=>{
    try{
        return Snapshot.fullTrim(await ProjectRepository.getSnapshotOnly(projectId));
    }catch(e){
        throw new Error(e.message);
    }

}
const updateSnapshot = async(projectId, snapshot)=>{
    // id injection !!
    snapshot.projectId = projectId;
    snapshot = Snapshot.fullSanitize(snapshot);
    // now for each enumerable data group:
    for (const key in Snapshot.enumerableList) {
        // first, we delete all enumerable data to let us replace them by newer ones.
        await ProjectRepository.deleteEnumerableForProject(projectId,key); // => let deleteAllEnum = connection.format(`DELETE FROM ${connection.escapeId(key)} WHERE projectId= ?`, [snapshot.projectId]);  await executeQuery(deleteAllEnum);
        // now for each enumerable data group, we insert them one by one in their appropriate table
        for (const index in snapshot[key]) {
            let enumData = snapshot[key][index];
            await ProjectRepository.insertNewEnumerable(key,enumData);
        }
    }
    // now we update the big Snapshot object regardless their enumerable data.
    // it must be already sanitized
    let cleanSnap = Snapshot.sanitize(snapshot)

    await ProjectRepository.updateSnapshotForProject(projectId,cleanSnap);
    return true;
}
const updateSnapshotField =async (projectId,field)=>{
    if (!field.fieldName)
        throw new Error("fieldName is required!");
    EnumDataController.validateFieldName(field.entryName, field.fieldName);
    EnumerableData.validateTag(field.tag);
    if(EnumDataController.isEnumerable(field.entryName)){
        if (! await ProjectRepository.tagExists(projectId, field.entryName, field.tag))
            throw new Error('this tag is not found');
        await ProjectRepository.updateSnapshotFieldForEnumerable(projectId,field.fieldName,field.fieldValue,field.entryName,field.tag);
    }else{
        await ProjectRepository.updateSnapshotField(projectId,field.fieldName,field.fieldValue);
    }
}

const addDataGroup =async(projectId,entryName)=>{
    EnumDataController.validateEntryNameOnly(entryName);
    let nextTag = await ProjectRepository.getNextTag(projectId,entryName);
    let enumerableDataGroup = new Snapshot.enumerableList[entryName]();
    enumerableDataGroup.tag= nextTag;
    enumerableDataGroup.projectId = projectId;
    await ProjectRepository.addWholeDataGroup(projectId,entryName,enumerableDataGroup);
    return nextTag;
}

const deleteProject = async (projectId) =>{
    await ProjectRepository.deleteProjectById(projectId);
}

const uploadImage = async (projectId, imageBuffer, imageType)=>{
    if (!imageBuffer || !imageType){
        throw new Error("No Image Found!");
    }
    let path =`./assets/projects/${projectId}/`;
    let fileName = `pdp.${imageType.split("/")[1]}`;
    await fs.mkdir(path,{recursive:true});
    let writing= fs.writeFile(path+fileName, imageBuffer);
    let updating = ProjectRepository.updateSnapshotField(projectId,'imageURL',path+fileName);
    await writing;
    await updating;
}
const downloadImage =async(projectId)=>{
    let url = (await ProjectRepository.getSnapshotOnly(projectId)).imageURL;
    if (!url){
        throw new Error("This Project doesn't have image saved!");
    }
    try{
        return await fs.readFile(url);
    }catch(e){
        throw  new Error("No image found for this project!")
    }


}
const getImageType = async(projectId)=>{
    let url = (await ProjectRepository.getSnapshotOnly(projectId)).imageURL;
    return url.split('.')[url.split('.').length-1];
}

/**
 *
 * @param projectId
 * @return {Promise<string>} HTML string content
 */
const injectInfosHtml = async(projectId)=>{


        let project= await  getFullProject(projectId);
    // Read HTML content from an external file

        const htmlContent = await fs.readFile(`./assets/templates/${project.templateName}.html`, 'utf-8');

    // Create a DOM document from the HTML content
        const dom = new JSDOM(htmlContent);

    // Access the document object
        const document = dom.window.document;

    // Manipulate the DOM as needed
    class Injector{
        static async insertImage(){
            console.log("document is !" + document)
            let imagePromise;
            let imageBuffer;
            try {
                imagePromise = downloadImage(projectId);
                imageBuffer = await imagePromise;
            } catch (e) {
                imageBuffer = null
            }
            if (!imageBuffer) {
                return
            }
            // Convert buffer to base64 encoded string
            const base64Image = Buffer.from(imageBuffer).toString('base64');
            // Create a data URI
            const imageDataURI = `data:image/jpeg;base64,${base64Image}`;
            // Get the image element
            let img = document.getElementById('profilePicture');
            if (img)
                img.src = imageDataURI;

        }
        static getDataGroupSample(className, toPresent=false){
            let eleme = Injector.getDataGroup(className ,toPresent) ;
            return eleme?eleme.cloneNode(true):eleme;
        }
        static getExistingDataGroupSample(className, toPresent=false){
            let eleme = Injector.getDataGroup(className ,toPresent) ;
            if (!eleme)
                eleme = Injector.getDataGroup(className,!toPresent);
            if (!eleme)
                throw new Error("couldn't get any existing data group sample")
            return eleme?eleme.cloneNode(true):null;
        }

        static getDataGroupSampleAccordingly(className,toPresent=false){
            let query = '#' + `${className} .enumerable-element`;
            /**@type Object[]*/
            let allOfThem = Array.from(document.querySelectorAll(query));
            let listOfPresent= allOfThem.find(dg=>dg.querySelector(".present")!==null);
            let listOfFinished= allOfThem.find(dg=>dg.querySelector(".finished")!==null);
            let Element = toPresent?listOfPresent:listOfFinished;
            if (!Element)
                Element = allOfThem[0];
            if (!Element)
                throw new Error(`Template Error! There is no Field for Section ${className}`)
            return Element.cloneNode(true);
        }
        static getSection(className){
            return document.querySelector('#' + className) ;
        }
        static getDataGroup(className, toPresent=false){
            /**@type object */
            let instance = (new Snapshot.enumerableList[className]())
            let presentClass = toPresent?".present":".finishingYear";
            let query = '#' + `${className} .enumerable-element`;
            console.log("trying with query: "+query);
            /**@type Object[]*/
            let allOfThem = document.querySelectorAll(query);
            let elementPointer = instance.hasOwnProperty("toPresent")?Array.from(allOfThem).find(dg => dg.querySelector(presentClass)):allOfThem[0]
            console.log("element pointer is: " + JSON.stringify(document.querySelectorAll(query)))
            if (!elementPointer)
                return null;
            return elementPointer;
        }
        static getAllDataGroups( className, toPresent=false){
            let presentClass = toPresent?".toPresent":"";
            let elementPointer = document.querySelectorAll('#' + `${className}  .enumerable-element ${presentClass}`);
            if (!elementPointer)
                return null;
            return elementPointer;
        }
        static getSectionSample(className){
            return Injector.getSection.cloneNode(true)    }
        static appendDataGroup(className, dataGroupSample){
            Injector.getSection(className).append(dataGroupSample);
        }
        static deleteAllDataGroups(className){
            Injector.getAllDataGroups(className).forEach(dg=>dg.remove());
        }
        static deleteSection(className){
            Injector.getSection(className).remove();
        }
        static getInjectedDataGroup(dataGroupSample ,dataGroupInfos){
            if (!dataGroupSample)
                throw new Error("data group sample is empty")
            for (const key in dataGroupInfos){
                let info =  dataGroupSample.querySelector("."+key);
                if (!info)
                    continue;
                // TODO : shall we concider a value or content input?
                info.innerHTML = dataGroupInfos[key]
            }
            return dataGroupSample.cloneNode(true);
        }
        static getInjectedSnapshot( snapshot){
            let personalInfoSection = document.querySelector('#PersonalInfo').cloneNode(true);
            if (!personalInfoSection)
                throw new Error("its not found ! the presonal place")
            for (const key in Snapshot.minimalTrim({...snapshot})) {
                let eleme = personalInfoSection.querySelector("#" + key) ;
                if (eleme)
                    eleme.innerHTML=snapshot[key];
                if (eleme && key==="reference")
                    eleme.src = snapshot[key]
            }
            return personalInfoSection;
        }
        static setDataGroup(snapshot, className){
            console.log(`Setting a Data Group ${className}`);

            let listOf = snapshot[className].map(dg=>{
                return Injector.getInjectedDataGroup(Injector.getExistingDataGroupSample(className, dg.toPresent),dg);
            });
            console.log(`here is our listOf ${JSON.stringify(listOf)}`)
            Injector.deleteAllDataGroups(className);
            listOf.forEach(dg=>Injector.appendDataGroup(className,dg))
        }
        static setAllDataGroups(snapshot){
            console.log("Setting All Data Groups");
            for (const className in Snapshot.enumerableList) {
                Injector.setDataGroup(snapshot,className)
            }
        }
        static setSnapshot(snapshot){
            let personalInfoSection = document.querySelector('#PersonalInfo');
            if (! personalInfoSection)
                throw new Error("its not found there , the personal stuff")
            for (const key in Snapshot.minimalTrim({...snapshot})) {
                let eleme = personalInfoSection.querySelector("#" + key) ;
                if (eleme)
                    eleme.innerHTML=snapshot[key];
                if (eleme && key==="reference")
                    eleme.src = snapshot[key]
            }
            return personalInfoSection;
        }
        static changeFont(fontFamily){
            if (!fontFamily)
                return;
            let bodyElem = document.querySelector("body");
            let  original = [];
            if (!bodyElem ) return;
            let styleElem = document.querySelector("#mainStyle")
            if (styleElem) {
                original = styleElem.innerHTML.substring(
                    styleElem.innerHTML.indexOf("body") + 1,
                    styleElem.innerHTML.lastIndexOf(";")
                ).split(":")[1].split(",");

            }
            original.unshift(fontFamily);
            bodyElem.style.fontFamily = original.join(",");

        }
        static injectValueInto(sample,objecty) {

            // Regular expression to match closed curly braces {} and variable names inside them
            const regex = /{[^{}]*?([a-zA-Z_]\w*)[^{}]*?}/g;
            for (const fieldName in objecty) {
                let fieldValue = objecty[fieldName];
                if (!fieldValue && (typeof (fieldValue))!=="number") {
                    let mother = sample.querySelector("." + fieldName);
                    if (!mother)
                        mother = sample.querySelector("#" + fieldName);
                    if (mother)
                        mother.remove();
                    else{
                        sample.innerHTML =sample.innerHTML.replace(
                            sample.innerHTML.match(/{[^{}]*?([a-zA-Z_]\w*)[^{}]*?}/g)[
                                sample.innerHTML.match(/{[^{}]*?([a-zA-Z_]\w*)[^{}]*?}/g)
                                .map( mat => mat.substring(1,mat.length-1).trim())
                                .indexOf(fieldName)
                                ]
                        ,'')
                    }
                    delete objecty[fieldName]

                }
            }
            let content = sample.innerHTML ;


            let replaceables = content.match(/{[^{}]*?([a-zA-Z_]\w*)[^{}]*?}/g) ;
            if (!replaceables)
                return sample;
            let trimmedList = replaceables.map( mat => mat.substring(1,mat.length-1).trim());
            for (const fieldName in objecty) {
                let fieldValue = objecty[fieldName];
                    let location = trimmedList.indexOf(fieldName);
                    if (location === -1)
                        continue;
                    content = content.replace(replaceables[location], fieldValue);

            }
            sample.innerHTML = content;
            return sample;
        }
        static enhancedInsertion(snapshot) {



            this.injectValueInto(document.querySelector('#PersonalInfo'), Snapshot.minimalTrim({...snapshot}))


            for (const className in Snapshot.enumerableList) {
                if (!snapshot[className]) {
                    Injector.deleteSection(className)
                    continue;
                }
                let listOf = snapshot[className].map(dg => {
                    let sample = this.getDataGroupSampleAccordingly(className, dg.toPresent);
                    return this.injectValueInto(sample, dg);
                });
                console.log(`here is our listOf ${JSON.stringify(listOf)}`)
                Injector.deleteAllDataGroups(className);
                listOf.forEach(dg => Injector.appendDataGroup(className, dg))
            }
        }

    }
    // Serialize the modified DOM back to HTML
    let imageInsertion = Injector.insertImage();

   // Injector.setSnapshot(project.snapshot);

   Injector.enhancedInsertion(project.snapshot);
   Injector.changeFont(project.snapshot.fontFamily)

    await imageInsertion;



    return dom.serialize();


}
const getThumbImageBuffer = async (projectId)=>{

    let pdfContent = await getPDFContent(projectId)
    return await getPngContentFromPDFBuffer(pdfContent);
}
const getPDFContent = async(projectId)=>{
    return await getPdfBufferFromHTML(await injectInfosHtml(projectId));
}
module.exports = {getPDFContent,getThumbImageBuffer,injectInfosHtml, getImageType,downloadImage,uploadImage, deleteProject,
    addDataGroup,newProject,getSimpleProjectsList,updateSnapshotField,
    updateSnapshot,getSnapshot,getFullProject,getSimpleProject}
