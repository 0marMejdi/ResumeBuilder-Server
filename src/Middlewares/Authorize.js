const Token = require("../Models/Token");
const UserRepository = require("../Repositories/UserRepository");
async function authorize(req,res,next){

    try{
        //resolving the token to extract id and email from it
        let user = Token.resolveToken(req.body.authorization.split(' ')[1]);
        //cheking if the extracted id and email exist in database
        if (!UserRepository.userExists(user.id))
            throw new Error("This user doesn't exist!");
        let existingUser = UserRepository.getUserById(user.id);
        if (existingUser.email!==user.email)
            throw new Error("This user doesn't exist!");
        req.body.user= user;
        next();
    }catch(err){
         res.status(401).json({message:err.message});
    }
}

module.exports = authorize;