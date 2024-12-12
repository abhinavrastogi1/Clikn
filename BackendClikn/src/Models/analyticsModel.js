import mongoose, { Schema } from "mongoose";

const analyticsSchema = new Schema(
  {
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },
    clikedLink: {
      type: [
        {
          date: {
            type: Date,
            required: true,
          },
          browser: {
            type: String,
          },
          device: {
            type: String,
          },
          country: {
            type: String,
          },
          state: {
            type: String,
          },
          city: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: true }
);
export const Analytics = mongoose.model("Analytics", analyticsSchema);
