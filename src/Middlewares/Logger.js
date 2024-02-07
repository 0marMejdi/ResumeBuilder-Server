let express = require("express");
let router = express.Router();
let dateNow = require("../Library/stringDate")
router.use((req, res, next) => {
    console.log("\n\n\n");
    console.log(dateNow());
    console.log("========================================================================================")
    console.log(req.method + "\t" + req.url);
    console.log(JSON.stringify(req.body));
    console.log("========================================================================================");
    const originalJson = res.json;
    const originalSend = res.send;
    const originalStatus = res.status;

    res.status = function(statusCode) {

        console.log("status: "+statusCode);
        originalStatus.call(this, statusCode);
        return this;
    };

    // res.json = function(body) {
    //     console.log(body);
    //     console.log("========================================================================================")
    //     console.log("\n\n\n");
    //     originalJson.call(this, body);
    // };

    res.send = function(body) {
        console.log(body);
        console.log("========================================================================================")
        originalSend.call(this, body);
    };

    next();
});
module.exports = router;