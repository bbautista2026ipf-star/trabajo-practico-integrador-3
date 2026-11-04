import { matchedData } from "express-validator";
import { EventModel } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      capacity,
      price,
      status,
      location,
      categories,
    } = matchedData(req);

    const exists = await EventModel.findOne({ title });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Ya existe un evento con ese título" });
    }

    const event = await EventModel.create({
      title,
      description,
      startDate,
      endDate,
      capacity,
      price,
      status,
      location,
      categories,
      organizer: req.user._id,
    });

    return res.status(201).json({ message: "Evento creado", event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find()
      .populate("organizer", "-password")
      .populate("categories");
    return res.status(200).json({ events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await EventModel.find({ organizer: req.user._id })
      .populate("organizer", "-password")
      .populate("categories");
    return res.status(200).json({ events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id)
      .populate("organizer", "-password")
      .populate("categories");
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    return res.status(200).json({ event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    if (data.title) {
      const exists = await EventModel.findOne({
        title: data.title,
        _id: { $ne: req.params.id },
      });
      if (exists) {
        return res
          .status(400)
          .json({ message: "Ya existe un evento con ese título" });
      }
    }

    const updated = await EventModel.findByIdAndUpdate(req.params.id, data, {
      returnDocument: "after",
      runValidators: true,
    })
      .populate("organizer", "-password")
      .populate("categories");

    return res
      .status(200)
      .json({ message: "Evento actualizado", event: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await EventModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Evento eliminado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
