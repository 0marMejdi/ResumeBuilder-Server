class User{
    /**@type string */ id;
    /**@type string */ email;
    /**@type string */ passwordHash;
    /**@type string */ firstName;
    /**@type string */ lastName;
    /**@type string */ imageURL;
    constructor(email, passwordHash, firstName,lastName){
        this.id=require("uuid").v4().toString();
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;

    };

    static sanitize(user){
        let delegatedUser = new User();
        if (!user.id)
            throw new Error("invalid user to parse without id");
        if (!user.firstName || !user.lastName || !user.email || !user.passwordHash ) {

            throw new Error("invalid user, missing attribute or values, your user input: "+ JSON.stringify(user));
        }
        for (const key in delegatedUser) {
            delegatedUser[key] = user[key];
        }
        return delegatedUser;
    }
    sanitize(){
        return User.sanitize(this);
    }

    /**
     *
     * @param user : User
     */
    static trim(user){
        delete user.id;
        delete user.imageURL;
        return user;
    }

}
module.exports = User;