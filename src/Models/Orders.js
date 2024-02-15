const guid = require("uuid");

class Orders {
    /**@type string */id;
    Education;
    ProfessionalExp ;
    Language  ;
    Skill ;
    Interest ;
    projectId;
    constructor(projectId) {
        this.projectId=projectId;
        this.id= guid.v4();
        let i = 0;

        for (let key in require("./Snapshot").enumerableList) {
            if (key==='id')
                continue;
            this[key] = i;
            i++;
        }
    }

    /**
     * it really does nothing...
     * @param orders : Orders
     * @return {Orders}
     */
    static sanitize(orders){
        return orders;
    }
    static trim(orders){
        delete orders.id;
        delete orders.projectId;
        return orders;
    }
}
module.exports = Orders ;