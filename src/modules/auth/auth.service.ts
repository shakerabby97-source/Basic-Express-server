import bcrypt from "bcryptjs"
import { pool } from "../../db"
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: {email: string , password: string})=> {

    const {email , password} = payload;

    const user = await pool.query(`

        SELECT * FROM users WHERE email=$1
    `, [email])

    if(user.rowCount === 0){
        throw new Error("User not found, please check email again or email not registered.")
    }

    const matchPassword = await bcrypt.compare(password, user.rows[0].password)

    if(!matchPassword){
        throw new Error("Password did not matched");
    }

    if(!user.rows[0].is_active){
        throw new Error("User Blocked or not active anymore!")
    }

    const userData = user.rows[0]

    const jwtPayload = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        is_active: userData.is_active,
    }

    const secret = config.jwt_secrete;
    if(!secret){
        throw new Error("jwt secrete is not configured")
    }

    const token = jwt.sign(jwtPayload, secret, {expiresIn: "4h"});

    // deleting the password before sending the user object
    delete userData.password;

    return {token, userData}
}


export const authService = {
    loginUser,
}