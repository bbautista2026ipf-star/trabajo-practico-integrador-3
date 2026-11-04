import { body, param } from "express-validator";
import { EventModel } from "../../models/event.model.js";
import { CategoryModel } from "../../models/category.model.js";

export const eventIdValidations = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
];

export const createEventValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .bail()
    .isLength({ min: 3, max: 150 })
    .withMessage("El título debe tener entre 3 y 150 caracteres"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .bail()
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),
  body("startDate")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria")
    .bail()
    .isISO8601()
    .withMessage("La fecha de inicio no es válida"),
  body("endDate")
    .notEmpty()
    .withMessage("La fecha de fin es obligatoria")
    .bail()
    .isISO8601()
    .withMessage("La fecha de fin no es válida")
    .bail()
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error(
          "La fecha de fin debe ser posterior a la fecha de inicio",
        );
      }
      return true;
    }),
  body("capacity")
    .notEmpty()
    .withMessage("La capacidad es obligatoria")
    .bail()
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un número entero mayor o igual a 1"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),
  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("El estado debe ser scheduled, cancelled o finished"),
  body("location.venue")
    .trim()
    .notEmpty()
    .withMessage("El lugar (venue) es obligatorio")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("El lugar (venue) debe tener entre 3 y 100 caracteres"),
  body("location.address")
    .trim()
    .notEmpty()
    .withMessage("La dirección (address) es obligatoria")
    .bail()
    .isLength({ min: 5, max: 150 })
    .withMessage("La dirección (address) debe tener entre 5 y 150 caracteres"),
  body("location.city")
    .trim()
    .notEmpty()
    .withMessage("La ciudad (city) es obligatoria")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("La ciudad (city) debe tener entre 2 y 50 caracteres"),
  body("categories")
    .optional()
    .isArray()
    .withMessage("Las categorías deben enviarse en un array"),
  body("categories.*")
    .isMongoId()
    .withMessage("Cada categoría debe ser un ObjectId válido")
    .bail()
    .custom(async (categoryId) => {
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        throw new Error("La categoría no existe");
      }
      return true;
    }),
];

export const updateEventValidations = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("El título debe tener entre 3 y 150 caracteres"),
  body("description")
    .optional()
    .trim()
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de inicio no es válida")
    .bail()
    .custom(async (startDate, { req }) => {
      if (req.body.endDate) {
        return true;
      }
      const event = await EventModel.findById(req.params.id);
      if (new Date(startDate) >= event.endDate) {
        throw new Error(
          "La fecha de inicio debe ser anterior a la fecha de fin",
        );
      }
      return true;
    }),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de fin no es válida")
    .bail()
    .custom(async (endDate, { req }) => {
      const event = await EventModel.findById(req.params.id);
      const startDate = req.body.startDate || event.startDate;
      if (new Date(endDate) <= new Date(startDate)) {
        throw new Error(
          "La fecha de fin debe ser posterior a la fecha de inicio",
        );
      }
      return true;
    }),
  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un número entero mayor o igual a 1"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),
  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("El estado debe ser scheduled, cancelled o finished"),
  body("location")
    .optional()
    .isObject()
    .withMessage("La ubicación debe ser un objeto")
    .bail()
    .custom((location) => {
      if (!location.venue || !location.address || !location.city) {
        throw new Error(
          "Si se envía la ubicación, venue, address y city son obligatorios",
        );
      }
      return true;
    }),
  body("location.venue")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El lugar (venue) debe tener entre 3 y 100 caracteres"),
  body("location.address")
    .optional()
    .trim()
    .isLength({ min: 5, max: 150 })
    .withMessage("La dirección (address) debe tener entre 5 y 150 caracteres"),
  body("location.city")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("La ciudad (city) debe tener entre 2 y 50 caracteres"),
  body("categories")
    .optional()
    .isArray()
    .withMessage("Las categorías deben enviarse en un array"),
  body("categories.*")
    .isMongoId()
    .withMessage("Cada categoría debe ser un ObjectId válido")
    .bail()
    .custom(async (categoryId) => {
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        throw new Error("La categoría no existe");
      }
      return true;
    }),
];
