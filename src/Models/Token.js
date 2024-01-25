const jwt = require('jsonwebtoken');
const generateToken = function (user){
    return 'Bearer '+jwt.sign({id: user.id, email: user.email }, 'HASTA_LA_VISTA_BABE', {expiresIn: '1h'});
}
const resolveToken = function(token){
    try{
        let resolved = jwt.verify(token, 'HASTA_LA_VISTA_BABE');
        return {id:resolved.id, email:resolved.email};
    }
    catch(err){
        throw err;
    }
    
}
const isValidToken = function(token){
    try{
        jwt.verify(token, 'HASTA_LA_VISTA_BABE');
        return true;
    }
    catch(err){
        return false;
    }
}

module.exports = {generateToken, resolveToken, isValidToken};