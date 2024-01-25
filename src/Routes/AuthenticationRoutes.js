const express = require ("express");
const UserController = require('../Controllers/UserController');
const router = express.Router();

router.post('/login', (req, res) => {
    try{
        let token = UserController.login(req.body.email, req.body.password);
        res.status(200).json({token: token});
    }
    catch(err){
        res.status(401).json({message: err.message});
    }
});
router.post('/register', (req, res) => {
    try{
        UserController.register(req.body.email, req.body.password, req.body.username);
        let token = UserController.login(req.body.email, req.body.password);
        
        res.status(200).json({message: "User created",token: token});
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

module.exports = router;