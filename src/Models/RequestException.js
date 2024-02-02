module.exports = class RequestException extends Error{
    errorCode=400;
    constructor(message) {
        super(message);
    }

    /**
     *
     * @param errorCode : number
     */
    code = (errorCode)=>{
        this.errorCode = errorCode;
        return this;
    }
}