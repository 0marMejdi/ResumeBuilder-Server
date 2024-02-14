const EnumeData  = require("./DataGroupClassList");
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

    /**
     * general Sanitization to Snapshot.
     * * check for the existence of the required attributes (such as id, and project id), if they are valid or no.
     * * and also keeps the true attributes of real Snapshot objects (avoid injecting unwanted attributes)
     * @param snapshot
     * @return {Snapshot}
     * @private
     */
    static __preSanitization(snapshot){
        let sanitized = new Snapshot();
        if (!snapshot){
            throw new Error("invalid snapshot object! you cannot sanitize NULL !! ");
        }
        if (!snapshot.id)
            snapshot.id=require("uuid").v4();
        if (!snapshot.projectId)
            throw new Error("invalid projectId! requires projectID for sanitizing snapshot");
        for (const key in sanitized) {
            sanitized[key]=snapshot[key];
        }
        return sanitized;
    }

    /**
     * keeps the version that going to be directly inserted in database. it does:
     *
     * * check for the existence of the required attributes (such as id, and project id), if they are valid or no.
     * * and also keeps the true attributes of real Snapshot objects (avoid injecting unwanted attributes)
     * * deletes all enumerable data ! keeping only primitive data
     * @param snapshot : Snapshot
     */
    static sanitize  (snapshot){
        let sanitized = Snapshot.__preSanitization(snapshot);
        for (const key in Snapshot.enumerableList) {
            delete sanitized[key];
        }
        return sanitized;
    }

    /**
     * keeps the version that going to be used for full update, including enumerable data. but should be done manually for each. it does:
     *
     * * check for the existence of the required attributes (such as id, and project id), if they are valid or no.
     * * id injection for project id in every enumerable data element
     * * id injection for each enumerable data id itself ( creation at time )
     * * keeps the true attributes of real Snapshot objects (avoid injecting unwanted attributes)
     * * keeps the true attribute of every Enumerable Element
     * @param snapshot : Snapshot
     */
    static fullSanitize(snapshot){
        // usual checks and big snapshot sanitization
        let sanitized = Snapshot.__preSanitization(snapshot);

        // cleaning every enumerable element is all down :D

        // first we loop for each Class of Enumerable separately
        for (const enumerableElClass in Snapshot.enumerableList){
            // adding the empty arrays for each Class of Enumerable to our final object to return
            // it is going to be kept empty if there is nothing in our object, otherwise we are going to keep pushing
            sanitized[enumerableElClass]=[];
            // checking if the content is not null, otherwise it is empty, and we go to next class
            if (!snapshot[enumerableElClass])
                continue;
            // checking if our enumerable element is a valid array. otherwise our object
            // TODO: soft or hard approach? throwing error on first problem? or ignoring it?
            if ( !Array.isArray(snapshot[enumerableElClass]))
                // throw new Error("not valid arrays");    // hard approach
                continue ;                           // soft approach

            // now our object is valid array. now we start cleaning each element for that array

            // getting sanitization function for that specific enumerable Element Type!
            let sanitizeFunction = (new Snapshot.enumerableList[enumerableElClass]()).sanitize;

            // for each inside element, we are going to apply that function
            for (const index in snapshot[enumerableElClass]) {
                /*-------- project id injection ! ----------*/
                snapshot[enumerableElClass][index].projectId=snapshot.projectId;
                /*-------------------------------------------*/

                /*-------- enumerable id injection! --------*/
                snapshot[enumerableElClass][index].id=guid.v4().toString();
                /*------------------------------------------*/

                // applying sanitization to that element !
                let sanitizedElement = sanitizeFunction(snapshot[enumerableElClass][index]);
                // pushing the sanitized element to our clean list
                sanitized[enumerableElClass].push(sanitizedElement);
            }
        }
        return sanitized;
    }

    /**
     *
     * @param snapshot :Snapshot
     */
    static fullTrim(snapshot){

        for (const className in Snapshot.enumerableList) {
            // is it really necessary?----- i think it is retrieved from database so it's not really
            if (!Array.isArray(snapshot[className]))
                continue;
            //------------------------------
            for (const index in snapshot[className] ) {
                // passed by value or reference? if reference, then remove the equal!
                snapshot[className][index]=(require("./EnumerableData").trim(snapshot[className][index]));
            }
        }
        delete snapshot.id;
        delete snapshot.projectId;
        delete snapshot.imageURL;
        return snapshot;
    }

}

module.exports = Snapshot;