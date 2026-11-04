import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { EventModel } from "../models/event.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null })
      .select("-password")
      .populate("events");
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.params.id,
      deletedAt: null,
    })
      .select("-password")
      .populate("events");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const user = await UserModel.findOne({
      _id: req.params.id,
      deletedAt: null,
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (data.username) {
      const usernameExists = await UserModel.findOne({
        username: data.username,
        _id: { $ne: req.params.id },
      });
      if (usernameExists) {
        return res
          .status(400)
          .json({ message: "El username ya está registrado" });
      }
    }

    if (data.email) {
      const emailExists = await UserModel.findOne({
        email: data.email,
        _id: { $ne: req.params.id },
      });
      if (emailExists) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }
    }

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const updated = await UserModel.findByIdAndUpdate(req.params.id, data, {
      returnDocument: "after",
      runValidators: true,
    }).select("-password");

    return res
      .status(200)
      .json({ message: "Usuario actualizado", user: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.params.id,
      deletedAt: null,
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await UserModel.findByIdAndUpdate(req.params.id, { deletedAt: new Date() });
    await EventModel.deleteMany({ organizer: req.params.id });

    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
