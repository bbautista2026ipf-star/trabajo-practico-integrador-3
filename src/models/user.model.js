import mongoose from "mongoose";

// definir esquema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
      },
      birthDate: {
        type: Date,
      },
      phone: {
        type: String,
      },
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// virtual populate
userSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "organizer",
});

// crear modelo
// exportar modelo
export const UserModel = mongoose.model("User", userSchema);
