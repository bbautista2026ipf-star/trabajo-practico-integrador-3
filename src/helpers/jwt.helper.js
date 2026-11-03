import jwt from "jsonwebtoken";

// generar token
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// verificar token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
