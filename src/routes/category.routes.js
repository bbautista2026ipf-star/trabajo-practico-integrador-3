import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  categoryIdValidations,
  createCategoryValidations,
  updateCategoryValidations,
} from "../middlewares/validations/category.validations.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createCategoryValidations,
  validate,
  createCategory,
);
router.get("/", authMiddleware, getAllCategories);
router.get(
  "/:id",
  authMiddleware,
  categoryIdValidations,
  validate,
  getCategoryById,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  categoryIdValidations,
  updateCategoryValidations,
  validate,
  updateCategory,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  categoryIdValidations,
  validate,
  deleteCategory,
);

export default router;
