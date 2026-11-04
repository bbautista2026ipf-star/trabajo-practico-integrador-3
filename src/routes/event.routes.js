import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/events.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  eventIdValidations,
  createEventValidations,
  updateEventValidations,
} from "../middlewares/validations/event.validations.js";

const router = Router();

router.post("/", authMiddleware, createEventValidations, validate, createEvent);
router.get("/", authMiddleware, getAllEvents);
router.get("/my", authMiddleware, getMyEvents);
router.get("/:id", authMiddleware, eventIdValidations, validate, getEventById);
router.put(
  "/:id",
  authMiddleware,
  eventIdValidations,
  validate,
  ownerOrAdminMiddleware,
  updateEventValidations,
  validate,
  updateEvent,
);
router.delete(
  "/:id",
  authMiddleware,
  eventIdValidations,
  validate,
  ownerOrAdminMiddleware,
  deleteEvent,
);

export default router;
