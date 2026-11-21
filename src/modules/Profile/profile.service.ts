import { pool } from "../../db";

const profileCreate = async (payload: any) => {
  const { user_id, bio, address, phone, gender } = payload;

  const userExist = await pool.query(`
        SELECT * FROM users WHERE id=$1 
    `, [user_id])

    if(userExist.rowCount === 0){
        throw new Error("Profile create cancelled because user does not exist")
    }

  const result = await pool.query(
    `
            INSERT INTO profile 
            (user_id, bio, address, phone, gender) VALUES 
            ($1, $2, $3, $4, $5) RETURNING *
        `,
    [user_id, bio, address, phone, gender],
  );

  return result;
};

export const profileServices = {
  profileCreate,
};
