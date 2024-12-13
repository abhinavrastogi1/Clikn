import mongoose, { Schema } from "mongoose";

const linkSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: "String",
      required: true,
    },
    shortId: {
      type: String,
      required: true,
    },
    qrCodeLink:{
      type:String,
      required:true,
    },
    originalLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Link = mongoose.model("Link", linkSchema);
