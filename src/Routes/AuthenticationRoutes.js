const express = require ("express");
const UserController = require('../Controllers/UserController');
const authorize = require("../Middlewares/Authorize")
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("all good");
})
router.post('/login', async (req, res) => {
    try{
        console.log("attempting to login in with")
        console.log(JSON.stringify(req.body));
        let token = await UserController.login(req.body.email, req.body.password);
        console.log("login success")
        res.status(200).json({Authorization: token});
        
    }
    catch(err){
        console.log(err.message)
        res.status(401).json({message: err.message});
    }
}); 
router.post('/register', async (req, res) => {
    try{
        console.log("attempting to register in with")
        console.log(JSON.stringify(req.body));
        let token = await UserController.register(req.body);
        console.log("register success")
        res.status(200).json({message: "User created successfully",Authorization: token});
    }
    catch(err){
        console.log(err.message)
        res.status(401).json({message: err.message, stack : err.stack});
    }
}); 

module.exports = router;