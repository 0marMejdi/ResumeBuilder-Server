const Snapshot = require (__dirname + "/Snapshot");
module.exports = class Project {

    /**@type string*/ id = "";
    /**@type string*/ userId = "";
    /**@type string*/ title = "";
    /**@type number*/ creationDate = 0;
    /**@type number*/ lastModifiedDate = 0;
    /**@type string*/ templateName = "";
    /**@type Snapshot*/ snapshot;

    constructor(title, templateName, userId) {
        this.id = Date.now().toString();
        this.userId = userId;
        this.templateName = templateName;
        this.title = title;
        this.creationDate = Date.now();
        this.lastModifiedDate = this.creationDate;
        this.snapshot = new Snapshot();
        this.snapshot.projectId = this.id;
    }
}