const client = require("./client")
const { password } = require("pg/lib/defaults");
const bcrypt = require('bcrypt');


async function _hashPassword(password) {
    const SALT_COUNT = 10;                   
    return await bcrypt.hash(password, 10);
}


async function createUser({username,password,account_type}){//customer or admin
    console.error("Creating user", username, password);
    try{

        const hashedPassword = await _hashPassword(password);
        
        const { rows:[user] } = await client.query(`
            INSERT INTO users(username,password,account_type)
            VALUES($1, $2, $3)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `,[username, hashedPassword, account_type]);
        
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

async function getUser({ username,password}){
    try{
         const user = await getUserByUsername(username);
         const passwordsMatch = await bcrypt.compare(password, user.password);
         
         if (passwordsMatch) {
         // return the user object (without the password)
             delete user.password;
             return user;
         } else {
         throw 'You made a mistake';
         }
     }catch(error){
         console.log(error);
     }
 }

 async function getUserById(id){
    try{
        const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE id=$1
        `, [id])
    
        if(!user) {
            throw "User not found."
        }
        
        delete user.password;
        return user;
    }catch(error){
        throw error;
    }
    }


module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername
}