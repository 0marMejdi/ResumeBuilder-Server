const Token = require("../Library/Token");
const UserRepository = require("../Repositories/UserRepository");
async function authorize(req,res,next){

    try{

        if (!req.headers.authorization)
            throw new Error("Not Logged in : No Authorization Header Found");
        //resolving the token to extract id and email from it
        let user;
        try{
             user = Token.resolveToken(req.headers.authorization.split(' ')[1]);
        }catch(e){
            throw new Error("Bad Authentication : invalid token");
        }
        //cheking if the extracted id and email exist in database
        if (!UserRepository.userExists(user.id))
            throw new Error("Bad Authentication : This user doesn't exist anymore!");
        let existingUser = UserRepository.getUserById(user.id);
        if (existingUser.email!==user.email)
            throw new Error("Bad Authentication : This user doesn't exist anymore!");
        req.body.user= user;
        next();
    }catch(err){
         res.status(401).json({message:err.message});
    }
}
module.exports = authorize;