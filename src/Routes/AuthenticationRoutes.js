const express = require ("express");
const UserController = require('../Controllers/UserController');
const authorize = require("../Middlewares/Authorize")
const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        let token = await UserController.login(req.body.email, req.body.password);
        res.status(200).json({authorization: token});
    }
    catch(err){
        res.status(401).json({message: err.message});
    }
}); 
router.post('/register', async (req, res) => {
    try{
        let token = await UserController.register(req.body.email, req.body.password, req.body.username);
        res.status(200).json({message: "User created",authorization: token});
    }
    catch(err){
        res.status(401).json({message: err.message});
    }
}); 
    
router.get("/allusers", (req, res) => {
    try{
        let users = UserController.getAllUsers();
        res.status(200).json(users);
    }
    catch(err){
        res.status(401).json({message: err.message});
    }
});
router.use(authorize);
router.get("/whoAmI",(req,res)=>{
    try{
        res.status(200).json(req.body.user);
    }catch(err) {
        res.status(401).json({message: "Must Be logged in to see who am i!"});
    }

});
module.exports = router;