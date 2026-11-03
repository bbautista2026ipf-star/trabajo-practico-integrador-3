import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 150,
    },
    description: {
      type: String,
      minlength: 20,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
      min: 1,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "La capacidad debe ser un numero entero",
      },
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "finished"],
      default: "scheduled",
    },
    location: {
      venue: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        minlength: 5,
        maxlength: 150,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
        trim: true,
      },
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const EventModel = mongoose.model("Event", eventSchema);
