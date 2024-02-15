const EnumerableData = require("./EnumerableData")
class Language extends EnumerableData{

    /**@type {number}*/ level;
    /**@type string*/   name;

}
class Interest extends EnumerableData {
    /**@type string*/ name;
}
class Education extends  EnumerableData{
    /**@type {string}*/ degree;
    /**@type boolean*/ toPresent=false;
    /**@type string*/ description;
    /**@type string*/ institutionName
    /**@type int*/ startingMonth;
    /**@type int*/ startingYear;
    /**@type int*/ finishMonth;
    /**@type int*/ finishYear;

}
class Skill extends  EnumerableData{
    /**@type number*/ level;
    /**@type string*/ name;

}
class ProfessionalExp extends EnumerableData{

    /**@type string*/ city;
    /**@type string*/ description;
    /**@type string*/ companyName;
    /**@type number*/finishMonth;
    /**@type number*/finishYear;
    /**@type string*/ post;
    /**@type number*/startingMonth;
    /**@type number*/startingYear;
    /**@type boolean*/ toPresent=false;
}
let classList={ProfessionalExp,Skill,Education ,Interest,Language};

module.exports = classList;
