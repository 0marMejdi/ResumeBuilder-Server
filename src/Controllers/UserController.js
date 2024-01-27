const UserRepository = require('../Repositories/UserRepository');
const User = require('../Models/User');
const Token = require ('../Models/Token');
const PasswordHash = require('../Models/PasswordHash');
    

    const login = async function(email, password){
        let user = UserRepository.getUserByEmail(email);
//        console.log(`user password is: ${JSON.stringify(user)}`);
        if (!user) 
            throw new Error("Wrong email");
        let result = await PasswordHash.comparePasswords(password,user.hashedPassword);
        if(!result)
            throw new Error("Wrong password");
        return Token.generateToken(user);
    }
    
    const register = async function(email, password , username){
        if (email == null || email === "")
            throw new Error("Email is required");
        if (password == null || password === "")
            throw new Error("Password is required");
        if (username == null || username === "")
            throw new Error("Username is required");
        if (UserRepository.emailExists(email)) {
            throw new Error("Email Taken");
        }
        if (UserRepository.usernameExists(username)) {
            throw new Error("Username Taken");
        }

        let hashedPassword = await PasswordHash.hashPassword(password);
        console.log("should be after");
        let user = new User(email, hashedPassword, username);
        
        UserRepository.createUser(user);
        let token = await login(email,password);
        return token;
    }
    const getAllUsers = function(){
        return UserRepository.getAllUsers();
    }
    const getToken = function(email,password){
        return Token.generateToken(email,password);
    }
    

module.exports = {login, register,getAllUsers,getToken};