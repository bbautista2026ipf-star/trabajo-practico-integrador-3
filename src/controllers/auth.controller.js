import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export const register = async (req, res) => {
  try {
    const { username, email, password, profile } = matchedData(req);

    const exists = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res
        .status(400)
        .json({ message: "El email o el username ya están registrados" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profile,
    });

    const userData = user.toObject();
    delete userData.password;

    return res
      .status(201)
      .json({ message: "Usuario registrado", user: userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    const user = await UserModel.findOne({ email, deletedAt: null });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken({ id: user._id, role: user.role });
    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json({ message: "Login exitoso", user: userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userData = req.user.toObject();
    delete userData.password;

    return res.status(200).json({ user: userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profile } = matchedData(req);

    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { $set: { profile } },
      { returnDocument: "after", runValidators: true },
    ).select("-password");

    return res.status(200).json({ message: "Perfil actualizado", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
