import express, { Application, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
const app: Application = express();


// body parser
app.use(express.json());

const pool = new Pool({
  connectionString: config.connection_string,
});

// console.log(pool)

const initDb = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INT,
        is_Active BOOLEAN DEFAULT true,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
      
      `);

    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

initDb();

app.get("/", (req: Request, res: Response) => {
  res.send("Express server on Fire!");
});

// create user
app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body;

    const result = await pool.query(
      `
    INSERT INTO users (name, email, password, age) VALUES
    ($1,$2,$3,$4) RETURNING * 
    `,
      [name, email, password, age],
    );

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// get all users
app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
            SELECT * FROM users
        `);

    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// get single user
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        SELECT * FROM users WHERE id=$1
        `,
      [id],
    );

    if (result.rowCount === 0) {
      throw new Error(`NO user exist, with id: ${id}`);
    }

    res.status(200).json({
      success: true,
      message: "user retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// update user data
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, password, age, is_Active } = req.body;

    const result = await pool.query(
      `
        UPDATE users 
        SET name = COALESCE($1 , name),
            password = COALESCE($2, password),
            age = COALESCE($3, age),
            is_Active = COALESCE($4, is_Active),
            updated_at = NOW()

        WHERE id=$5  RETURNING *
      `,
      [name ?? null, password ?? null, age ?? null, is_Active ?? null, id],
    );

     if (result.rowCount === 0) {
      throw new Error(`NO user exist, with id: ${id}`);
    }

    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// Delete user
app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM users 
      WHERE id=$1
        `,
      [id],
    );

    if (result.rowCount === 0) {
      throw new Error(`NO user exist, with id: ${id}`);
    }

    res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
