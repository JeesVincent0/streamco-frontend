import jwt from "jsonwebtoken";
import { IJwtPayload } from "./interfaces";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyJwt = (token: string): IJwtPayload | null => {
  try {
    if (!JWT_SECRET) return null;
    return jwt.verify(token, JWT_SECRET) as IJwtPayload;
  } catch {
    return null;
  }
};
