const UserRepository = require('../Repositories/UserRepository');
const User = require('../Models/User');
const Token = require ('../Models/Token');
const PasswordHash = require('../Models/PasswordHash');
    

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
        let user = UserRepository.getUserByEmail(email);
//        console.log(`user password is: ${JSON.stringify(user)}`);
        if (!user) 
            throw new Error("Wrong email");
        let result = await PasswordHash.comparePasswords(password,user.hashedPassword);
        if(!result)
            throw new Error("Wrong password");
        return Token.generateToken(user);
    }
    
    const register = async function(userInfo){
        console.log("attempting to register with ")
        if (userInfo.email == null || userInfo.email === "")
            throw new Error("Email is required");
        if (userInfo.password == null || userInfo.password === "")
            throw new Error("Password is required");
        if (userInfo.firstName == null || userInfo.firstName === "")
            throw new Error("FirstName is required");
        if (userInfo.lastName == null || userInfo.lastName === "")
            throw new Error("FirstName is required");
        if (UserRepository.emailExists(userInfo.email)) {
            throw new Error("Email Taken");
        }

        let hashedPassword = await PasswordHash.hashPassword(userInfo.password);
        let user = new User(userInfo.email, hashedPassword, userInfo.firstName,userInfo.lastName);
        
        UserRepository.createUser(user);
        return await login(userInfo.email, userInfo.password);
    }
    const getAllUsers = function(){
        return UserRepository.getAllUsers();
    }
    const getToken = function(email,password){
        return Token.generateToken(email,password);
    }
    const getUserById = (id)=>{
        if (!UserRepository.userExists(id))
            throw new Error("User not found");
        let user = UserRepository.getUserById(id);
        for (const userKey in user) {
            if (userKey==="hashedPassword"){
                delete user[userKey];
                break;
            }
        }
        return user;

    }
    

module.exports = {login, register,getAllUsers,getToken,getUserById};