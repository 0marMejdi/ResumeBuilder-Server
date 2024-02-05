class User{
    /**@type string */ id;
    /**@type string */ email;
    /**@type string */ passwordHash;
    /**@type string */ firstName;
    /**@type string */ lastName;
    /**@type string */ profilePictureUrl;
    constructor(email, passwordHash, firstName,lastName){
        this.id = Date.now().toString();
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;

    };

    /**
     *
     * @param user : User
     */
    static delegate(user){
        let delegatedUser = new User();
        if (!user.id)
            throw new Error("invalid user to parse without id");
        if (!user.firstName || !user.lastName || !user.email || user.passwordHash )
            throw new Error("invalid user, missing attribute or values");
        for (const delegatedUserKey in delegatedUser) {
            delegatedUser[delegatedUserKey] = user[delegatedUserKey];
        }
        return delegatedUser;
    }
        
}
module.exports = User;