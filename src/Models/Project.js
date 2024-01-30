const Snapshot = require (__dirname + "Snapshot");
module.exports = class Project{
    id;
    title;
    creationDate;
    lastModifiedDate;
    snapshot;
    constructor(title) {
        this.title= title;
        this.creationDate = Date.now().toString();
        this.lastModifiedDate = this.creationDate;

    }
}