const bcrypt = require("bcryptjs");

function genSaltAsync(rounds) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, (err, salt) => {
            if (err) {
                reject(new Error("Error generating salt"));
            } else {
                resolve(salt);
            }
        });
    });
}

function hashAsync(plainPassword, salt) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainPassword, salt, (err, hash) => {
            if (err) {
                reject(new Error("Error hashing password: " + err.message));
            } else {
                resolve(hash);
            }
        });
    });
}

async function hashPassword(plainPassword) {
    try {
        // Generate a salt
        const salt = await genSaltAsync(12);

        // Hash the password with the generated salt
        const hashedResult = await hashAsync(plainPassword, salt);

        console.log('Hashed Password:', hashedResult);
        return hashedResult;
    } catch (error) {
        throw error;
    }
}

function asyncComparePasswords(enteredPassword, passwordHash) {
    return new Promise((resolve, reject) => {
        // Compare the entered password with the stored hashed password
        bcrypt.compare(enteredPassword, passwordHash, (err, result) => {
            if (err) {
                reject(new Error("Error comparing passwords: "+ err.message +`
attemptin to compare ${enteredPassword} and ${passwordHash}`));
            } else {
                resolve(result);
            }
        });
    });
}
async function comparePasswords(enteredPassword, passwordHash){
    let resulit = await asyncComparePasswords(enteredPassword,passwordHash);
    return resulit;
}

module.exports = { hashPassword,comparePasswords };
