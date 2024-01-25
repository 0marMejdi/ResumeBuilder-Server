const UserRepository = require('../Repositories/UserRepository');
const User = require('../Models/User');
const Token = require ('../Models/Token');
const bcrypt = require('bcryptjs');
    

    const login = function(email, password){
        let user = UserRepository.getUserByEmail(email);
        if (!user) 
            throw new Error("User not found");
        if(bcrypt.compareSync(password, user.hashedPassword) == false)
            throw new Error("Wrong password");
        return Token.generateToken(user);    
    }
    
    const register = function(email, password , username){
        if (email == null || email == "")
            throw new Error("Email is required");
        if (password == null || password == "")
            throw new Error("Password is required");
        if (username == null || username == "")
            throw new Error("Username is required"); 
        let user = new User(email, password, username);
        
        UserRepository.createUser(user);
    }
    const getAllUsers = function(){
        return UserRepository.getAllUsers();
    }
    
    

module.exports = {login, register,getAllUsers};