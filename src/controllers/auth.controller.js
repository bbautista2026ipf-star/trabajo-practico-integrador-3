import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {};
export const login = async (req, res) => {};
export const getProfile = async (req, res) => {};
export const updateProfile = async (req, res) => {};
export const logout = async (req, res) => {};
