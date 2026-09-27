import bcrypt from "bcrypt"
import crypto from "crypto"

export const passwordHash = (password) => {
    return bcrypt.hash(password, 12);
}

export const isPassMatch = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
}

export const hashToken = (token) => {
  // console.log("HASH FUNCTION RECEIVED:", token);
  // console.log("HASH FUNCTION TYPE:", typeof token);

  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};