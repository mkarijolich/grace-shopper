const client = require("./client")
const { password } = require("pg/lib/defaults");
const bcrypt = require('bcrypt');


async function _hashPassword(password) {
    const SALT_COUNT = 10;                   
    return await bcrypt.hash(password, 10);
}


async function createUser({username,password}){
    console.error("CReating user", username, password);
    try{

        const hashedPassword = await _hashPassword(password);
        
        const { rows:[user] } = await client.query(`
            INSERT INTO users(username,password)
            VALUES($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `,[username, hashedPassword]);
        
        delete user.password;
        return user;
    }catch(error){
        throw error;
    }
}

async function getUserByUsername(username){
    try{
        const { rows:[user] } = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1
        `,[username])
        console.log(user)
        return user;
    }catch(error){
        console.log("DB ERROR");
        console.log(error);
        throw error;
    }
}


module.exports = {
    createUser,
    // getUser,
    // getUserById,
    getUserByUsername
}
