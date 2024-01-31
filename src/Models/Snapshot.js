class Snapshot{

    /**@type string */ id;
    /**@type string */ projectId;
    /**@type number */ tag;
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
    /*list stuff*/

    /**@type Interest[] */ interests= [];
    /**@type Formation[] */ formations=[];
    /**@type ProfessionalExp[] */professionalExps=[];
    /**@type Skill[] */skills=[];
    /**@type Language[] */languages=[];
    constructor() {
        this.id=Date.now().toString();
    }
}



module.exports =Snapshot;