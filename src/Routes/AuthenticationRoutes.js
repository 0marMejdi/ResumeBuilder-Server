const express = require ("express");
const UserController = require('../Controllers/UserController');
const authorize = require("../Middlewares/Authorize")
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("all good");
})
router.post('/login', async (req, res) => {
    try{
        let token = await UserController.login(req.body.email, req.body.password);
        res.status(200).json({Authorization: token});
    }
    catch(err){
        res.status(401).json({message: err.message});
    }
}); 
router.post('/register', async (req, res) => {
    try{
        let token = await UserController.register(req.body);
        res.status(200).json({message: "User created successfully",Authorization: token});
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
router.get("/profile/info",(req,res)=>{
    try{
        let user = UserController.getUserById(req.body.user.id);
        res.status(200).json(user);
    }catch(err) {
        res.status(401).json({message: err.message});
    }

});
module.exports = router;