import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: 2,
      maxLength: 30,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 200,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

categorySchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "categories",
});

export const CategoryModel = mongoose.model("Category", categorySchema);
