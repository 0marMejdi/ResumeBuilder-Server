
class EnumerableData{
    /** @type string */     id;
    /** @type number */     tag;
    /**@type string*/ projectId;
    constructor(tag=-1) {
        this.id=require("uuid").v4().toString();
        this.tag=tag;
    }


    /**
     * YOU NEED TO CALL IT FROM NEWLY CREATEED OBJECT CLASS
     * @param enumerik
     * @return {*}
     */
    sanitize = (enumerik)=>{
        if (!enumerik)
            throw new Error("trying to sanitize null")

        let instance = new (require('./DataGroupClassList')[this.constructor.name])();

        EnumerableData.validateTag(enumerik.tag);
        for (const key in instance) {
            instance[key]=enumerik[key];
        }
        delete  instance.sanitize;
        return instance;

    }
    static validateTag(tag){
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
}
module.exports = EnumerableData