import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  userIdValidations,
  updateUserValidations,
} from "../middlewares/validations/user.validations.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidations,
  validate,
  getUserById,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidations,
  updateUserValidations,
  validate,
  updateUser,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidations,
  validate,
  deleteUser,
);

export default router;
