import jwt from "jsonwebtoken";
export const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, "secret", { expiresIn });
};
export const veryfyToken = (token) => {
  return jwt.verify(token, "secret");
};
