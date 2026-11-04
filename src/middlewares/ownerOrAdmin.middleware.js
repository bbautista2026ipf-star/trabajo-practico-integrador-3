import { EventModel } from "../models/event.model.js";

export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    const isAdmin = req.user.role === "admin";
    const isOwner = event.organizer.toString() === req.user._id.toString();
    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json({ message: "No tenes permiso sobre este evento" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
