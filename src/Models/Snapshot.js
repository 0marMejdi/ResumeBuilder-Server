const EnumeData  = require("../Models/EnumData");
const guid = require("uuid");
class enumerableList  {
    Interest =  EnumeData.Interest;
    Formation = EnumeData.Formation;
    ProfessionalExp = EnumeData.ProfessionalExp;
    Skill = EnumeData.Skill;
    Language = EnumeData.Language;
}
class Snapshot extends enumerableList  {
    static enumerableList = new enumerableList();
    /**@type string */ id;
    /**@type string */ projectId;

    /**@type string */ firstName;
    /**@type string */ lastName;
    /**@type string */ email;
    /*coordinates*/
    /**@type number */ phoneNumber;
    //location
    /**@type string */ address;
    /**@type string */ city;
    /**@type number */ postalCode;
    /*work summary*/
    /**@type string */ profileTitle;
    /**@type string */aboutMe;
    /**
     *
     * @param projectId : string
     */
    constructor(projectId) {
        super();
        this.projectId=projectId;
        this.id=require("uuid").v4().toString();
        for (const key in Snapshot.enumerableList) {
            this[key] = [];
        }

    }
    sanitize = ()=>{
      return Snapshot.sanitize(this);
    }
    /**
     *
     * @param snapshot : Snapshot
     */
    static sanitize = (snapshot)=>{
        let sanitized = new Snapshot();
        if (!snapshot.id)
            throw new Error("invalid id! requires id for sanitizing snapshot");
        if (!snapshot.projectId)
            throw new Error("invalid projectId! requires projectID for sanitizing snapshot");
        for (const key in sanitized) {
            sanitized[key]=snapshot[key];
        }
        for (const key in Snapshot.enumerableList) {
            delete sanitized[key];
        }
        delete sanitized.sanitize;
        return sanitized;

    }

    /**
     *
     * @param snapshot
     */
    static fullSanitize(snapshot){
        if (!snapshot)
            throw new Error("invalid snapshot object! requires Snapshot Object for sanitizing");
        let sanitized = new Snapshot();
        if (!snapshot.id)
            throw new Error("invalid id! requires id for sanitizing snapshot");
        if (!snapshot.projectId)
            throw new Error("invalid projectId! requires projectID for sanitizing snapshot");
        for (const key in sanitized) {
            sanitized[key]=snapshot[key];
        }
        let classList = Snapshot.enumerableList

        for (const enumerableElClass in classList){
            /**@type Skill */
            let enumerableElement = new Snapshot.enumerableList[enumerableElClass]();
            sanitized[enumerableElClass]=[];

            if (!snapshot[enumerableElClass])
                continue;
            if ( !Array.isArray(snapshot[enumerableElClass])){
                throw new Error("not valid arrays");
            }
            let sanitizeFunction = (new Snapshot.enumerableList[enumerableElClass]()).sanitize;
            for (const index in snapshot[enumerableElClass]) {
                snapshot[enumerableElClass][index].projectId=snapshot.projectId;
                if (!snapshot[enumerableElClass][index].id)
                    snapshot[enumerableElClass][index].id=guid.v4().toString();
                let sanitizedElement = sanitizeFunction(snapshot[enumerableElClass][index]);
                sanitized[enumerableElClass].push(sanitizedElement);

            }
        }
        delete sanitized.sanitize;
        return sanitized;
    }

}

module.exports = Snapshot;