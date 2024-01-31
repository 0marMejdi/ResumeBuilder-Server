class User{
    /**@type string */ id;
    /**@type string */ email;
    /**@type string */ hashedPassword;
    /**@type string */ firstName;
    /**@type string */ lastName;
    /**@type string */ profilePictureUrl;
    constructor(email, hashedPassword, firstName,lastName){
        this.id = Date.now().toString();
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.hashedPassword = hashedPassword;

    };
        
}
module.exports = User;