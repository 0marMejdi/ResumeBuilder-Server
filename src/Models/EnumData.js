
class Language {
    /**@type {number}*/ level;
    /**@type string*/  name;
    /**@type number*/  tag;
    constructor(tag) {
        this.tag=tag;
    }
}
class Interest {
    tag;
    name;
    constructor(tag) {
        this.tag=tag;
    }
}
class Formation {
    id;
    city;
    description;
    establishment
    startingMonth;
    startingYear;
    finishMonth;
    finishYear;
    tag;
    title;
}
class Skill {
    /**@type number*/ level;
    /**@type string*/ name;
    /**@type number*/ tag;
    constructor(tag) {
        this.tag=tag;
    }
}
class ProfessionalExp {

    /**@type string*/ city;
    /**@type string*/ description;
    /**@type string*/ employerName;
    /**@type number*/finishMonth;
    /**@type number*/finishYear;
    /**@type string*/ post;
    /**@type number*/startingMonth;
    /**@type number*/startingYear;
    /**@type number*/ tag;
    constructor(tag) {
        this.tag=tag;
    }
}

module.exports = {ProfessionalExp,Skill,Formation ,Interest,Language}
