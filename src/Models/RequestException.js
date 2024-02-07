module.exports = class RequestException extends Error{
    errorCode=400;
    constructor(message) {
        super(message);
        this.errorCode=401;
        console.log("Error: " +message);
    }
    /**
     * @param errorCode : number
     */
    code = (errorCode)=>{

        this.errorCode = errorCode;
        return this;
    }
}