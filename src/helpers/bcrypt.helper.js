import bcrypt from "bcrypt";

// hasheo de contraseña
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// verificar hasheo de contraseña
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
