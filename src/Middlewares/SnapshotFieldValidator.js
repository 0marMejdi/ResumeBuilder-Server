const EnumDataController = require("../Controllers/EnumDataController");
async function validator (req,res,next){
    let field={};
    try{
        if (!req.body.hasOwnProperty('tag'))
            req.body.tag=null;
        if (!req.body.hasOwnProperty('fieldName'))
            req.body.fieldName=null;
        if (!req.body.hasOwnProperty('fieldValue'))
            req.body.fieldValue=null;
        if (!req.body.hasOwnProperty('entryName'))
            req.body.entryName=null;
        field = EnumDataController.validateWholeField(req.body.project.id,req.body.fieldName,req.body.fieldValue,req.body.entryName,req.body.tag);
        req.body.field=field;
        next();
    }catch(e){
        res.status(400).json({message:e.message,stack:e.stack});
    }

}

module.exports = validator;
