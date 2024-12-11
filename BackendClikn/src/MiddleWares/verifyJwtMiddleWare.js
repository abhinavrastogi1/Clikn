import { User } from "../Models/userModel.js";
import apiError from "../Utils/apiError.js";
import asyncHandler from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";
const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const cookies = req?.cookies;
    const accessToken = cookies?.accessToken;
    const refreshToken = cookies?.refreshToken;
    if (!refreshToken || !accessToken) {
      throw new apiError(401, "Unauthorized request");
    }
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN
    );
    const user = await User.findById(decodedAccessToken._id);
    if (!user) {
      throw new apiError(401, "Invalid Access Token");
    }
    req.user = {
      userId: decodedAccessToken._id,
      firstName: decodedAccessToken.firstName,
      email: decodedAccessToken.email,
    };
    next();
  } catch (error) {
    throw new apiError(401, error?.message || " Access Token Expired");
  }
});
export default verifyJwt;
