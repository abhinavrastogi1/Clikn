import mongoose, { Schema } from "mongoose";

const analyticsSchema = new Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true,
    },
    clikedUrl: {
      type: [
        {
          date: {
            type: Date,
            required: true,
          },
          browser: {
            type: String,
            required: true,
          },
          device: {
            type: String,
            required: true,
          },
          location: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);
export const Analytics = mongoose.model("Analytics", analyticsSchema);
