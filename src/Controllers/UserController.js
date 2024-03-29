const UserRepository = require('../Repositories/UserRepository');
const User = require('../Models/User');
const Token = require ('../Library/Token');
const PasswordHash = require('../Library/PasswordHash');
    

    const login = async function(email, password){
        if (!email && !password){
            throw  new Error("e-mail and password are required");
        }
        if (!email){
            throw  new Error("e-mail is required");
        }
        if (!password){
            throw  new Error("password is required");
        }
        let user =await UserRepository.getUserByEmail(email);

        if (!user) 
            throw new Error("Wrong email");
        let result = await PasswordHash.comparePasswords(password,user.passwordHash);
        if(!result)
            throw new Error("Wrong password");
        return Token.generateToken(user);
    }
    
    const register = async function(userInfo){
        let token;
        console.log("attempting to register with ")
        if (userInfo.email == null || userInfo.email === "")
            throw new Error("Email is required");
        if (userInfo.password == null || userInfo.password === "")
            throw new Error("Password is required");
        if (userInfo.firstName == null || userInfo.firstName === "")
            throw new Error("FirstName is required");
        if (userInfo.lastName == null || userInfo.lastName === "")
            throw new Error("FirstName is required");
        if (await UserRepository.emailExists(userInfo.email)) {
            throw new Error("Email Taken");
        }
        let passwordHash = await PasswordHash.hashPassword(userInfo.password);
        let user = new User(userInfo.email, passwordHash, userInfo.firstName, userInfo.lastName);
        await UserRepository.createUser(user);
        token = await login(userInfo.email, userInfo.password);
        return token ;
    }
    const getToken = function(email,password){
        return Token.generateToken(email,password);
    }
    const getUserById = async (id)=>{
        if (! await UserRepository.userExists(id))
            throw new Error("User not found");
        let user = await UserRepository.getUserById(id);
        for (const userKey in user) {
            if (userKey==="passwordHash"){
                delete user[userKey];
                break;
            }
        }
        return User.trim(user);

    }
    

module.exports = {login, register,getToken,getUserById};