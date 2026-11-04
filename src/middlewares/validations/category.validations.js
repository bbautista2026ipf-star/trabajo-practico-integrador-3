import { body, param } from "express-validator";

export const categoryIdValidations = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
];

export const createCategoryValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser un texto")
    .bail()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres"),
];

export const updateCategoryValidations = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser un texto")
    .bail()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres"),
];
