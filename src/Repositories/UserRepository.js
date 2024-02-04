let users = [{
    "id": "1706821332398",
    "email": "omar@insat.ucar.tn",
    "firstName": "omar",
    "lastName": "mejdi"
}];
function getUserById(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE id = ?', [id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}

function createUser(user) {
        connection.query('INSERT INTO user SET ?',newUser, (err, result) => {
        if (err) {
         return('Error:', err);
        } else {
          return('Result:', result);
        }
      });
    }


function updateUser(user) {
    connection.query('UPDATE user SET ? WHERE id = ? ',[userUpdate,userUpdate.userID],(err,result)=>{
        if (err) {
            return('Error:', err);
           } else {
             
            return('Result:', result);
           }
        
    })
}
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}
function emailExists(email) {
    connection.query(`SELECT * FROM user WHERE email = ?`,[email],(err,result)=>{
        if(err) throw new Error(err)
        else if(result.legth==0){
                return false; }
        else{
            return true;
        }
    })

}

function userExists(id) {
    connection.query(`SELECT * FROM user WHERE id = ?`,[id],(err,result)=>{
        if(err) throw new Error(err);
        else if(result.legth==0){
            return false;
        }
        else{
            return true;
        }
    })

}
module.exports = { getUserById, createUser, updateUser, getUserByEmail, emailExists, userExists };