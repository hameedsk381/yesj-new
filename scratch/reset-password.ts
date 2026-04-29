import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

async function resetPassword() {
  if (!dbUrl) {
    console.error("DATABASE_URL is not defined");
    process.exit(1);
  }

  const newPassword = "admin123";
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  console.log(`Resetting password for admin@yesj.in to "${newPassword}"`);
  console.log(`New hash: ${hash}`);

  try {
    const connection = await mysql.createConnection(dbUrl);
    const [result] = await connection.execute(
      "UPDATE users SET hashed_password = ? WHERE email = ?",
      [hash, "admin@yesj.in"]
    );
    console.log("Update result:", result);
    await connection.end();
  } catch (error) {
    console.error("Update failed:", error);
  }
}

resetPassword();
