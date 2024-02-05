const Snapshot = require("../Models/Snapshot");
const ProjectRepository = require("../Repositories/ProjectRepository");
const Info = require("../Models/EnumData")
const entryValues = {"Language":"languages", "Interest":"interests", "Formation":"formations", "ProfessionalExp":"professionalExps", "Skill":"skills"};

function getInstanceFromEntry(entryName){
    if (entryName==="Language")
        return new Info.Language();
    if (entryName==="Interest")
        return new Info.Interest();
    if (entryName==="Formation")
        return new Info.Formation();
    if (entryName==="ProfessionalExp")
        return new Info.ProfessionalExp();
    if (entryName==="Skill")
        return new Info.Skill();
    if (entryName==="Snapshot")
        return new Snapshot();
    throw new Error("Invalid entry name!");
}
function getFinalEntryName(entryName){
    return entryValues[entryName];
}
function validateEntryName(entryName){
    if (entryName===undefined)
        throw Error("requires entry name")
    if (Object.getOwnPropertyNames(entryValues).includes(entryName))
        return;
    throw Error("invalid entry name");
}
function validateFieldName(entryName, fieldName){
    if (fieldName===undefined)
        throw Error("requires field name");
    if ( Object.getOwnPropertyNames(getInstanceFromEntry(entryName)).includes(fieldName))
        return true;
    throw Error("invalid field name for "+ entryName);
}
function validateTag(projectId, entryName, tag){
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

    let snap = ProjectRepository.getSnapshotOnly(projectId);
    console.log(JSON.stringify(snap));
    if (tag >= snap[entryValues[entryName]].length)
        throw new Error ("tag not found for this "+entryName);
    if (tag < snap[entryValues[entryName]].length)
        return true;

    console.log("succeed tag valid");

}
function validateWholeField(projectId, fieldName, fieldValue, entryName, tag){

    if (isEnumerable(entryName)){
        validateEntryName(entryName);
        validateTag(projectId,entryName,tag);
        validateFieldName(entryName,fieldName);

        return {fieldName,fieldValue,entryName:getFinalEntryName(entryName),tag,isEnumerable:true}

    }else{
        validateFieldName("Snapshot",fieldName);
        return {fieldName,fieldValue, entryName: "Snapshot",isEnumerable:false}
    }
}

/**
 *
 * @param entryName
 * @returns boolean
 */
function isEnumerable(entryName){
    return (entryName!==undefined && entryName !== "" && entryName !== "Snapshot");

}

module.exports = {entryValues,getInstanceFromEntry,getFinalEntryName, validateEntryName, validateFieldName, validateTag, validateWholeField, isEnumerable}