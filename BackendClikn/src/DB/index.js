import mongoose from "mongoose";

export async function Connect_DB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/Clikn`);
  } catch (error) {
    console.log("something went wrong while connecting DB", error);
    process.exitCode(1);
  }
}
