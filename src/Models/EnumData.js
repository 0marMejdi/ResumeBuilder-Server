

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

        let instance = new (classList[this.constructor.name])();

        if (enumerik.tag !==0 &&(!enumerik.tag || !isNaN(enumerik.tag) || enumerik.tag<0))
            throw new Error("invalid tag! require valid tag for sanitizing enumerable data");
        for (const key in instance) {
            instance[key]=enumerik[key];
        }
        delete  instance.sanitize;
        return instance;

    }

}
class Language extends EnumerableData{

    /**@type {number}*/ level;
    /**@type string*/   name;

}
class Interest extends EnumerableData {
    name;

}
class Formation extends  EnumerableData{
    city;
    description;
    establishment
    startingMonth;
    startingYear;
    finishMonth;
    finishYear;
    title;
}
class Skill extends  EnumerableData{
    /**@type number*/ level;
    /**@type string*/ name;

}
class ProfessionalExp extends EnumerableData{

    /**@type string*/ city;
    /**@type string*/ description;
    /**@type string*/ employerName;
    /**@type number*/finishMonth;
    /**@type number*/finishYear;
    /**@type string*/ post;
    /**@type number*/startingMonth;
    /**@type number*/startingYear;
}
let classList={ProfessionalExp,Skill,Formation ,Interest,Language};

module.exports = classList;
