const EnumDataController = require("../Controllers/EnumDataController");
async function validator (req,res,next){
    let field={};
    try{
        if (!req.body.hasOwnProperty('tag'))
            req.body.tag=undefined;
        if (!req.body.hasOwnProperty('fieldName'))
            req.body.fieldName=undefined;
        if (!req.body.hasOwnProperty('fieldValue'))
            req.body.fieldValue=undefined;
        if (!req.body.hasOwnProperty('entryName'))
            req.body.entryName=undefined;
        field = EnumDataController.validateWholeField(req.body.project.id,req.body.fieldName,req.body.fieldValue,req.body.entryName,req.body.tag);
        req.body.field=field;
        next();
    }catch(e){
        res.status(400).json({message:e.message,stack:e.stack});
    }

}

module.exports = validator;
