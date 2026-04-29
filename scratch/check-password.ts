import bcrypt from "bcryptjs";

const password = "admin123";
const hash = "$2b$10$S6mX.9uBGd2tQYXe0PEVTu6t9rbvJEIiSItW7Oj7MZlbISTxljfOW";

async function checkPassword() {
  const match = await bcrypt.compare(password, hash);
  console.log(`Password "${password}" matches hash: ${match}`);
}

checkPassword();
