class User{
    id;
    email;
    hashedPassword;
    username;  
    constructor(email, hashedPassword, username){
        this.id = Date.now(); 
        this.email = email;
        this.username = username;
        this.hashedPassword = hashedPassword;
    };
        
}
module.exports = User;