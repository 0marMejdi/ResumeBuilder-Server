class User{
    id;
    email;
    hashedPassword;
    firstName;
    lastName;
    profilePictureUrl;
    constructor(email, hashedPassword, firstName,lastName){
        this.id = Date.now(); 
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.hashedPassword = hashedPassword;

    };
        
}
module.exports = User;