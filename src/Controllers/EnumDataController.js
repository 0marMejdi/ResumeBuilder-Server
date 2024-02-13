const Snapshot = require("../Models/Snapshot");
const Info = require("../Models/DataGroupClassList")


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

/**
 *
 * @param entryName
 * @returns boolean
 */
function isEnumerable(entryName){
    return (entryName && entryName !== "Snapshot");

}

module.exports = { validateEntryNameOnly, validateFieldName, isEnumerable}