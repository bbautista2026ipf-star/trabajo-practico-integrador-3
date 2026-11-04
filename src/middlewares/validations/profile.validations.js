import { body } from "express-validator";

export const profileValidations = [
  body("profile.firstName")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
  body("profile.lastName")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
  body("profile.birthDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento no es válida")
    .bail()
    .custom((birthDate) => {
      if (new Date(birthDate) > new Date()) {
        throw new Error("La fecha de nacimiento no puede ser futura");
      }
      return true;
    }),
  body("profile.phone")
    .optional()
    .isString()
    .withMessage("El teléfono debe ser un texto"),
];

export const optionalProfileValidations = [
  body("profile")
    .optional()
    .isObject()
    .withMessage("El perfil debe ser un objeto")
    .bail()
    .custom((profile) => {
      if (!profile.firstName || !profile.lastName) {
        throw new Error(
          "Si se envía el perfil, el nombre y el apellido son obligatorios",
        );
      }
      return true;
    }),
  body("profile.firstName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
  body("profile.lastName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
  body("profile.birthDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento no es válida")
    .bail()
    .custom((birthDate) => {
      if (new Date(birthDate) > new Date()) {
        throw new Error("La fecha de nacimiento no puede ser futura");
      }
      return true;
    }),
  body("profile.phone")
    .optional()
    .isString()
    .withMessage("El teléfono debe ser un texto"),
];
