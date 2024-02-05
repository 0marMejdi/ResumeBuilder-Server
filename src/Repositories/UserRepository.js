const connection = require("../Models/ResumeBuilderDataBase").getConnection();

function getUserById(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE id = ? ;', [id], (err, result) => {
          if (err) {
            reject(err);
          } else {
              if (result.length==0)
                  reject (new  Error("none is found"));
            resolve(result);
          }
        });
      });
}

function createUser(user) {
    return new Promise((resolve,reject)=>{
        connection.query('INSERT INTO user SET ? ;',user, (err, result) => {
            console.log("inserting")
            if (err) {
                console.log("occured error " + err);
                reject(new Error(err.message));
                console.log("its have been rejected");
            } else {
                console.log("inserted: " + result);
                resolve(result);
            }
      })
    });


}


function updateUser(user) {
    return new Promise((resolve,reject)=>{
    connection.query('UPDATE user SET ? WHERE id = ? ;',[user,user.id],(err,result)=>{
        if (err) {
            reject(err);
           } else {
            resolve(result)
           }
        
    })})
}

/**
 *
 * @param email
 * @returns {Promise<User>}
 */
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE email = ? ;', [email], /**@param result : User */(err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log("retrieved " + result);
              resolve(result);
          }
        });
      });
}
function emailExists(email) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE email = ? ;`, [email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(result.length > 0);
                resolve(result.length > 0);
            }
        });
    });
}

function userExists(id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE id = ? ;`,[id], (err, result) => {
            if (err) {
                reject((err));
            } else {
                resolve(result.length > 0);
            }
        });
    });
}

module.exports = { getUserById, createUser, updateUser, getUserByEmail, emailExists, userExists };