import jwt from "jsonwebtoken";
import { config } from "../config/env";

const generateToken = (
  id: string
): string => {
  const secret = config.jwtSecret ?? "default_secret";
  const expiresIn = config.jwtExpire ?? "7d";

  return jwt.sign({ id }, secret, { expiresIn });
};

export default generateToken;
