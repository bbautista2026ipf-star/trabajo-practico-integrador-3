import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  registerValidations,
  loginValidations,
  updateProfileValidations,
} from "../middlewares/validations/auth.validations.js";

const router = Router();

router.post("/register", registerValidations, validate, register);
router.post("/login", loginValidations, validate, login);
router.get("/profile", authMiddleware, getProfile);
router.put(
  "/profile",
  authMiddleware,
  updateProfileValidations,
  validate,
  updateProfile,
);
router.post("/logout", authMiddleware, logout);

export default router;
