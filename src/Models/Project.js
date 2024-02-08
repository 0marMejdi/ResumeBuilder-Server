const Snapshot = require (__dirname + "/Snapshot");
class Project {

    /**@type string*/ id ;
    /**@type string*/ userId;
    /**@type string*/ title ;
    /**@type number*/ creationDate ;
    /**@type string*/ templateName ;
    /**@type Snapshot*/ snapshot;

    constructor(title, templateName, userId) {
        this.id=require("uuid").v4().toString();
        this.userId = userId;
        this.templateName = templateName;
        this.title = title;
        this.creationDate = (new Date()).getTime();
        this.snapshot = new Snapshot(this.id);
        this.snapshot.projectId = this.id;
    }

    /**
     * creates sanitized project that is ready to be injected into the database
     *
     * must be used at the final layer of inserting
     * @return Project
     */
    static sanitize = (project)=>{
        let sanitized = new Project();
        if (!project.id)
            throw new Error("invalid Id! require id for sanitizing project");
        if (!project.userId)
            throw new Error("invalid userId! require userId for sanitizing project");
        if (!project.title)
            throw new Error("invalid title! require title for sanitizing project");
        for (const key in sanitized) {
            sanitized[key]=project[key];
        }
        delete sanitized.snapshot;
        delete sanitized.sanitize;
        return sanitized;
    }
    sanitize = ()=>{
        return Project.sanitize(this);
    }
}

module.exports = Project;

let proj = new Project("hela","romana","omar");
