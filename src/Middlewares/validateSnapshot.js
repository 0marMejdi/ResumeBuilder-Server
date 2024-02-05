const Snapshot = require("../Models/Snapshot");
const EnumDataController = require("../Controllers/EnumDataController");
const {entryValues} = require("../Controllers/EnumDataController");
const ProjectRepository = require("../Repositories/ProjectRepository");
module.exports = (req,res,next)=>{
    let snapshot = req.body.snapshot;
    let projectId = req.body.projectId;
    let filteredSnap = new Snapshot();

    for (const filteredSnapKey in filteredSnap) {
        if (!Object.values(EnumDataController.entryValues).includes(filteredSnapKey) && snapshot.hasOwnProperty(filteredSnapKey)) {
            filteredSnap[filteredSnapKey] = snapshot[filteredSnapKey];
        }
    }
    filteredSnap.projectId=projectId;
    Object.getOwnPropertyNames(entryValues).forEach(entry=>{
        let dataGroupList = snapshot[entryValues[entry]];
        let perfectDataGroup = EnumDataController.getInstanceFromEntry(entry);
        dataGroupList.forEach(dataGroup=>{
            for (const dataGroupKey in perfectDataGroup){
                if (dataGroup.hasOwnProperty(dataGroupKey)){
                    perfectDataGroup[dataGroupKey] = dataGroup[dataGroupKey];
                }
            }
            filteredSnap[entryValues[entry]] = perfectDataGroup;
        })
    })
    ProjectRepository.updateSnapshot(projectId,filteredSnap);
    next();
}