const jwt = require("jsonwebtoken");
let user =
    {
        name:"Hasta",
        email:"lavista@babe"


    }
let token  = jwt.sign(user,"NO_Deal_No_Dice");
let resolved =  jwt.verify(token,"NO_Deal_No_Dice", (err,decoded)=>{
    if(err){
        console.log("no good token");
    }else{
        console.log(JSON.stringify(decoded));
    }
});
console.log(token);
console.log(resolved);