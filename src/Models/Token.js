const jwt = require('jsonwebtoken');

const generateToken = function (user) {
    return new Promise((resolve, reject) => {
        jwt.sign({ id: user.id, email: user.email }, 'HASTA_LA_VISTA_BABE', (err, token) => {
            if (err) {
                reject(new Error('Error generating token: ' + err.message));
            } else {
                resolve('Bearer ' + token);
            }
        });
    });
};

const resolveToken =  function(token){
    let resolved = {};
    jwt.verify(token, 'HASTA_LA_VISTA_BABE',(err,decoded)=>{
        if(err){
            throw new Error("Invalid Token!");
        }else{
            resolved.id = decoded.id;
            resolved.email = decoded.email;
        }
    });
    return resolved ;

    
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