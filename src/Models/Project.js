const Snapshot = require ("./Snapshot");
class Project {

    /**@type string*/ id ;
    /**@type string*/ userId;
    /**@type string*/ title ;
    /**@type number*/ creationDate ;
    /**@type string*/ templateName ;
    /**@type Snapshot*/ Snapshot;

    constructor(title, templateName, userId) {
        this.id=require("uuid").v4().toString();
        this.userId = userId;
        this.templateName = templateName;
        this.title = title;
        this.creationDate = (new Date()).getTime();
        this.Snapshot = new Snapshot(this.id);
        this.Snapshot.projectId = this.id;
    }

    /**
     * creates sanitized project that is ready to be injected into the database
     *
     * must be used at the final layer of inserting
     * @return Project
     */
    static sanitize  (project){
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
        delete sanitized.Snapshot;
        delete sanitized.sanitize;
        return sanitized;
    }
    static fullTrim (project){
        if (project.Snapshot)
            project.Snapshot = Snapshot.fullTrim(project.Snapshot);
        delete project.userId;
        return project;
    }
    sanitize = ()=>{
        return Project.sanitize(this);
    }
}

module.exports = Project;

