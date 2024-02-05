const authorize = require("../Middlewares/Authorize");
const UserController = require("../Controllers/UserController");
const express = require("express");
let router = express.Router();
router.get("/profile/info",authorize,async (req,res)=>{
    try{
        let user = await UserController.getUserById(req.body.user.id);
        res.status(200).json(user);
    }catch(err) {
        res.status(401).json({message: err.message});
    }

});
module.exports = router;