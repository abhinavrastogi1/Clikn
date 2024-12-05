import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    FirstName: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
