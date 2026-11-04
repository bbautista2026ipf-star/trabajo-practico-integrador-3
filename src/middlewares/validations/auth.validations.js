import { body } from "express-validator";
import { profileValidations } from "./profile.validations.js";

export const registerValidations = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .bail()
    .isAlphanumeric()
    .withMessage("El username solo puede tener letras y números"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no es válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isString()
    .withMessage("La contraseña debe ser un texto")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  ...profileValidations,
];

export const loginValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no es válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

export const updateProfileValidations = profileValidations;
