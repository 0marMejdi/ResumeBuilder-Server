const EnumerableData = require("./EnumerableData")
class Language extends EnumerableData{

    /**@type {number}*/ level;
    /**@type string*/   name;

}
class Interest extends EnumerableData {
    name;

}
class Formation extends  EnumerableData{
    city;
    description;
    establishment
    startingMonth;
    startingYear;
    finishMonth;
    finishYear;
    title;
}
class Skill extends  EnumerableData{
    /**@type number*/ level;
    /**@type string*/ name;

}
class ProfessionalExp extends EnumerableData{

    /**@type string*/ city;
    /**@type string*/ description;
    /**@type string*/ employerName;
    /**@type number*/finishMonth;
    /**@type number*/finishYear;
    /**@type string*/ post;
    /**@type number*/startingMonth;
    /**@type number*/startingYear;
}
let classList={ProfessionalExp,Skill,Formation ,Interest,Language};

module.exports = classList;
