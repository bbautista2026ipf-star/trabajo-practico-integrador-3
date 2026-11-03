import { UserModel } from "../models/user.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";
import { EventModel } from "../models/event.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null })
      .select("-password")
      .populate("events");
    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
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
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, password, profile, role } = req.body;
    const user = await UserModel.findOne({
      _id: req.params.id,
      deletedAt: null,
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const exist = await UserModel.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: req.params.id },
    });
    if (exist) {
      return res
        .status(400)
        .json({ message: "El email o el username ya estan registrados" });
    }
    const updateData = { username, email, role, profile };
    if (password) {
      updateData.password = await hashPassword(password);
    }
    const updated = await UserModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after", runValidators: true },
    ).select("-password");
    return res
      .status(200)
      .json({ message: "Usuario actualizado", user: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error del servidor" });
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
    return res.status(500).json({ message: "Error del servidor" });
  }
};
