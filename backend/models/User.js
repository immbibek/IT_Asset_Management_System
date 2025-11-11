import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    department: { // Add department field
      type: String,
      required: false,
      default: "Unassigned"
    }
})

export const userModel = mongoose.model("User", userSchema);
