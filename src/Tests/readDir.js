const fs = require("fs").promises;

(async function reading(){
    try{
        let result = await fs.readdir("../../assets/templates/");
        return result.map(temp=>temp.split('.')[0])
    }catch(err){
        console.log(err);
    }
})();
