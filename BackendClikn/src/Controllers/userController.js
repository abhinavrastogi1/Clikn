import asyncHandler from "../Utils/asyncHandler.js";
import monggose from "mongoose";
import cookie from "cookie-parser";
import { google } from "googleapis";
import DeviceDetector from "device-detector-js";
import { User } from "../Models/userModel.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import axios from "axios";
const auth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

async function generateTokens(userId) {
  try {
    //genrate access and refresh token
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong while generating access and referesh tokens"
    );
  }
}

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const userRegistration = asyncHandler(async (req, res) => {
  const { code } = req?.query;
  const reqBody = req?.body;
  if (!code && Object.keys(reqBody).length === 0) {
    // checking if one of the value  exist or not
    throw new apiError(400, "Missing Required Data");
  }

  let user;
  if (Object.keys(reqBody).length > 0) {
    // if user used form to register
    const { firstName, secondName, email, password } = reqBody;

    if (firstName == "" || secondName == "" || email == "" || password == "") {
      throw new apiError(409, "All fields are required");
    }

    const userExits = await User.findOne({ email: email });
    if (userExits) {
      throw new apiError(409, "Email is already in use.");
    }

    user = await User.create({
      firstName,
      secondName,
      email,
      password,
    });

    if (!user) {
      throw new apiError(500, "something went wrong while registering user");
    }
  }

  //if user used google to register
  else if (code) {
    // google registration

    const googleRes = await auth2Client.getToken(code);
    const googleUserRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    if (googleUserRes?.status !== 200) {
      throw new apiError(401, `HTTP error! status: ${response.status}`);
    }

    const userResponse = await googleUserRes?.data;

    const userExists = await User.findOne({ email: userResponse?.email });

    if (!userExists) {
      user = await User.create({
        firstName: userResponse?.given_name,
        secondName: userResponse?.family_name || null,
        email: userResponse?.email,
        profilePic: userResponse?.picture,
        googleId: userResponse?.id,
      });
    } else {
      if (userExists?.password) {
        throw new apiError(400, "Email is already in use. login via form");
      } else if (userExists?.googleId) {
        user = userExists;
      }
    }

    if (!user) {
      throw new apiError(500, "Something went wrong while registering user");
    }
  }

  const { accessToken, refreshToken } = await generateTokens(user?._id);
  if (!accessToken || !refreshToken) {
    throw new apiError(500, "Something went wrong while generating  tokens");
  }
  user = await User.findById(user._id).select(
    " -password -refreshToken -createdAt -updatedAt -__v -_id -googleId"
  );
  if (!user) {
    throw new apiError(500, "something went wrong while Creating  user");
  }

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, user, "Registration and login successful"));
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    throw new apiError(400, "Missing  Required Data");
  }
  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    throw new apiError(401, "Invalid email or password");
  }
  if (userExists?.googleId) {
    throw new apiError(
      400,
      "This email is linked to Google login. Please log in via Google."
    );
  }
  const loggedInUser = await User.findById(userExists._id).select(
    "-password -refreshToken -createdAt -updatedAt -__v -_id -googleId"
  );
  const isPasswordCorrect = userExists.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new apiError(401, "Unauthorized request");
  }
  const { accessToken, refreshToken } = await generateTokens(userExists?._id);
  if (!accessToken || !refreshToken) {
    throw new apiError(500, "Something went wrong while generating  tokens");
  }
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(200, loggedInUser, "Registration and login successful")
    );
});

const verifyUser = asyncHandler(async (req, res) => {
  const { userId } = req?.user;
  if (!userId) {
    throw new apiError(401, "Required data is missing ");
  }
  const user = await User.findById(userId).select(
    "-refreshToken -createdAt -updatedAt -__v -_id -googleId"
  );
  if (!user) {
    throw new apiError(404, "User not found");
  }
  res
    .status(200)
    .json(new apiResponse(200, user, "User successfully verified"));
});

export { userRegistration, userLogin, verifyUser };
