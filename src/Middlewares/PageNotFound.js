let express = require("express");
let router = express.Router();
router.use((req,res)=>{
    res.status(404).json({message:"bad route or incorrect method"});
})
module.exports = router;