import { validationResult } from "express-validator";

// Lee los errores que dejaron las validaciones; si hay alguno corta con 400
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Error de validación", errors: errors.array() });
  }
  next();
};
