let express = require("express");
let router = express.Router();
router.use((req,res)=>{
    res.status(404).send("Not Implemented (yet)...");
})
module.exports = router;