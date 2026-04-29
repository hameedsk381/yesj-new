import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

async function testConnection() {
  if (!dbUrl) {
    console.error("DATABASE_URL is not defined");
    process.exit(1);
  }

  console.log(`Connecting to: ${dbUrl}`);

  try {
    const pool = mysql.createPool(dbUrl);
    console.log("Pool created. Getting connection...");
    
    const connection = await pool.getConnection();
    console.log("Got connection from pool!");
    
    const [rows] = await connection.execute("SELECT * FROM users");
    console.log("Users in database:", rows);
    
    connection.release();
    await pool.end();
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

testConnection();
