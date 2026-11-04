import { body, param } from "express-validator";
import { optionalProfileValidations } from "./profile.validations.js";

export const userIdValidations = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
];

export const updateUserValidations = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .bail()
    .isAlphanumeric()
    .withMessage("El username solo puede tener letras y números"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("El email no es válido"),
  body("password")
    .optional()
    .isString()
    .withMessage("La contraseña debe ser un texto")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser user o admin"),
  ...optionalProfileValidations,
];
