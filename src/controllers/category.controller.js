import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model.js";
import { EventModel } from "../models/event.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = matchedData(req);

    const exists = await CategoryModel.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "La categoría ya existe" });
    }

    const category = await CategoryModel.create({ name, description });

    return res.status(201).json({ message: "Categoría creada", category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id).populate(
      "events",
    );
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    return res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    if (data.name) {
      const exists = await CategoryModel.findOne({
        name: data.name,
        _id: { $ne: req.params.id },
      });
      if (exists) {
        return res.status(400).json({ message: "La categoría ya existe" });
      }
    }

    const updated = await CategoryModel.findByIdAndUpdate(req.params.id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    return res
      .status(200)
      .json({ message: "Categoría actualizada", category: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    await EventModel.updateMany(
      { categories: req.params.id },
      { $pull: { categories: req.params.id } },
    );
    await CategoryModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Categoría eliminada" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
