import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "change-this-to-a-secure-random-string-in-production");
const ALGORITHM = "HS256";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  // Check if it's a bcrypt hash (starts with $2a$ or $2b$)
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$")) {
    return await bcrypt.compare(password, hash);
  }
  
  // NOTE: If you have legacy pbkdf2-sha256 hashes from Python/Passlib, 
  // you would need a custom verification function here.
  // For now, we assume the use of bcrypt for Next.js compatibility.
  return false;
}

export async function createAccessToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("24h") // Adjust based on your settings
    .sign(SECRET);
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      algorithms: [ALGORITHM],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession(req?: NextRequest) {
  const token = req 
    ? req.cookies.get("token")?.value 
    : cookies().get("token")?.value;
    
  if (!token) return null;
  return await verifyAccessToken(token);
}
