bcrypt = require('bcryptjs');
class User{
    id;
    email;
    hashedPassword="";
    username;  
    constructor(email, passwordToHash, username){
        this.id = Date.now(); 
        this.email = email;
        this.username = username;
        bcrypt.hash(passwordToHash, 12, (err, hash) =>{
            if(err){
                console.log(err);
            }
            else{
                this.hashedPassword = hash;
            }
        });
    };
        
}
module.exports = User;