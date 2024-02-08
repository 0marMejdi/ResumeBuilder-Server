const Snapshot = require("../Models/Snapshot");
const ProjectRepository = require("../Repositories/ProjectRepository");
const Info = require("../Models/EnumData")


/**
 * softly validate, with tolerance of snapshot object
 * @param entryName : string
 * @param fieldName : string
 */
function validateFieldName(entryName, fieldName){
    if (!entryName || (entryName && entryName==="Snapshot")){
        if (!(new Snapshot()).hasOwnProperty(fieldName) )
            throw new Error(`Snapshot doesn't have a field called ${fieldName}`);
        return;
    }
    if (entryName && Info.hasOwnProperty(entryName)){
        if (!(new Info[entryName]()).hasOwnProperty(fieldName))
            throw new Error(`${entryName} doesn't have a field called ${fieldName}`)
        if (['id','projectId','userId','creationDate'].includes(fieldName)){
            throw  new Error(`Forbidden! cannot set ${fieldName} attribute`)
        }
        return;
    }
    throw new Error(`there is no entry name of ${entryName}`);
}

function validateEntryNameOnly(entryName){
    if (!Info.hasOwnProperty(entryName))
        throw  new Error(`there is no entry name of ${entryName}`);
}
function validateTag(tag){
    if (tag===undefined)
        throw new Error("requires tag");
    if (!tag || tag==="" || tag<0 ){
        if (tag!==0)
            throw new Error ("invalid tag value");
    }
    if (typeof tag !== 'number'){
        console.log("tag must be number");
        throw new Error ("tag must be number");
    }
    console.log("succeed tag valid");

}

/**
 *
 * @param entryName
 * @returns boolean
 */
function isEnumerable(entryName){
    return (entryName && entryName !== "Snapshot");

}

module.exports = { validateEntryNameOnly, validateFieldName, validateTag, isEnumerable}