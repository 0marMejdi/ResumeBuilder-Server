const Snapshot = require (__dirname + "/Snapshot");
module.exports = class Project{

    /**@type string*/ id;
    /**@type string*/ userId;
    /**@type string*/ title;
    /**@type number*/ creationDate;
    /**@type number*/ lastModifiedDate;
    /**@type Snapshot*/ snapshot;
    constructor(title,userId) {
        this.id=Date.now().toString();
        this.userId=userId;
        this.title= title;
        this.creationDate = Date.now();
        this.lastModifiedDate = this.creationDate;
        this.snapshot = new Snapshot();
    }
}