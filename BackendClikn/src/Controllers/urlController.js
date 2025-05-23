import asyncHandler from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import axios from "axios";
import * as cheerio from "cheerio";
import DeviceDetector from "device-detector-js";
import { Link } from "../Models/linkmodel.js";
import apiResponse from "../Utils/apiResponse.js";
import mongoose from "mongoose";
import { Analytics } from "../Models/analyticsModel.js";
import { User } from "../Models/userModel.js";
// Google Safe Browsing API URL
const SAFE_BROWSING_API_URL = "https://safebrowsing.googleapis.com/v4/threatMatches:find";
// Google Safe Browsing API Key
const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
// Function to check if URL is safe using Google Safe Browsing API
const isSafeLink = async (url) => {
  try {
    const response = await axios.post(
      SAFE_BROWSING_API_URL,
      {
        client: {
          clientId: "moceiofn-fnkdnfj-wjieojweifn-ww", // Use your client ID (can be anything for personal use)
          clientVersion: "1.0",
        },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
          platformTypes: ["WINDOWS", "LINUX", "ANDROID", "IOS"],
          threatEntryTypes: ["URL"],
          threatEntries: [
            {
              url: url,
            },
          ],
        },
      },
      {
        params: {
          key: apiKey,
        },
      }
    );
    // If response has matches, the URL is not safe
    if (response.data.matches && response.data.matches.length > 0) {
      return false; // Not safe
    }

    return true; // Safe
  } catch (error) {
    console.error("Error checking URL with Safe Browsing API:", error);
    return false; // If there's an error, consider the link unsafe
  }
};

// Function to generate short link
const generateShortLink = asyncHandler(async (req, res) => {
  const { originalLink } = req?.query;
  let { title } = req?.query || {};
  const { userId } = req?.user;

  if (!originalLink) {
    throw new apiError(400, "Missing required data");
  }

  // Check if the link is safe
  const isSafe = await isSafeLink(originalLink);
  if (!isSafe) {
    throw new apiError(400, "The link is not safe and cannot be shortened.");
  }

  if (!title) {
    try {
      const { data } = await axios.get(originalLink);
      if (data) {
        const $ = cheerio.load(data);
        title = $("title").text().trim() || null; // Set to null if title is empty
      } else {
        title = null;
      }
    } catch (error) {
      title = null;
    }
  }

  const charSet =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
  let generateShortId = "";
  while (true) {
    generateShortId = "";
    for (let i = 0; i < 7; i++) {
      const index = Math.floor(Math.random() * charSet.length);
      generateShortId += charSet[index];
    }
    const shortIdExist = await Link.findOne({ shortId: generateShortId });
    if (!shortIdExist) {
      break;
    }
  }

  const qrCodeLink = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://clikn.in/${generateShortId}`;
  
  const link = await Link.create({
    user: new mongoose.Types.ObjectId(userId),
    title: title || null,
    qrCodeLink: qrCodeLink,
    shortId: generateShortId,
    originalLink: originalLink,
  });

  if (!link) {
    throw new apiError(500, "Something went wrong while generating short Link");
  }

  res.status(200).json(
    new apiResponse(
      200,
      {
        title: link?.title || null,
        qrCodeLink: link.qrCodeLink,
        shortId: link.shortId,
        originalLink: link.originalLink,
      },
      "Link successfully generated"
    )
  );
});

const getOriginalLink = asyncHandler(async (req, res) => {
  const { shortId } = req?.params;
  if (!shortId) {
    throw new apiError(400, "Missing required data");
  }
  const link = await Link.findOne({ shortId: shortId });
  if (!link) {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bad Request</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f8f8f8;
        }
        .container {
          text-align: center;
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #ff4c4c;
        }
        p {
          font-size: 16px;
          color: #333;
        }
        .button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          text-decoration: none;
          cursor: pointer;
        }
        .button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bad Request</h1>
        <p>The request is invalid, or the link may be broken.
        Maybe what you are looking for can be found at
        <a href="https://clikn.in" >clikn.in</a></p>
      </div>
    </body>
    </html>
  `;
    res.setHeader("Content-Type", "text/html");
    res.status(400).send(htmlContent); // Send 400 status for a bad request
    return;
  }
  const deviceDetector = new DeviceDetector();
  const userAgent = req.headers["user-agent"];
  const browserInfo = deviceDetector.parse(userAgent);
  const ipAddress = req?.ip;
  const locationApiRes = await axios.get(`http://ip-api.com/json/${ipAddress}`);
  let date = new Date();
  const analyticsData = {
    date: date,
    browser: browserInfo?.client?.name || null,
    device: browserInfo?.device?.type || null,
    country: locationApiRes?.data?.country || null,
    state: locationApiRes?.data?.regionName || null,
    city: locationApiRes?.data?.city || null,
  };

  let anlaytics = await Analytics.findOne({ linkId: link._id });
  if (!anlaytics) {
    anlaytics = await Analytics.create({
      linkId: new mongoose.Types.ObjectId(link._id),
      clikedLink: [analyticsData],
    });
  } else {
    // If Analytics document exists, push the new analyticsData into the clickedLink array
    await Analytics.findOneAndUpdate(
      {
        linkId: link._id,
      },
      { $push: { clikedLink: analyticsData } }
    );
  }
  const originalLink = link.originalLink;
  res.status(301).redirect(originalLink);
});
const deleteOriginalLink = asyncHandler(async (req, res) => {
  const { _id } = req?.query;
  if (!_id) {
    throw new apiError(401, "_id is Required");
  }
  const link = await Link.findById(_id);
  if (!link) {
    throw new apiError(404, "Link does not exist");
  }
  const isAnalyticsExist = await Analytics.findOne({ linkId: link?._id });

  if (isAnalyticsExist) {
    const deleteAnalytics = await Analytics.deleteOne({ linkId: link?._id });
    if (deleteAnalytics.deletedCount === 0) {
      throw new apiError(
        500,
        "Something went wrong while deleting analytics for the url"
      );
    }
  }
  const deleteLink = await Link.deleteOne({ _id: link?._id });
  if (deleteLink.deletedCount === 0) {
    throw new apiError(500, "Something went wrong while deleting link");
  }
  res.status(200).json(new apiResponse(200, {}, "Successfully deleted link"));
});
const getuserLinks = asyncHandler(async (req, res) => {
  const { userId } = req?.user;
  if (!userId && !skip) {
    throw new apiError(400, "Missing required data");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "User does not exist");
  }

  const userLinks = await Link.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        title: 1,
        shortId: 1,
        originalLink: 1,
        qrCodeLink: 1,
        createdAt: 1,
      },
    },
  ]);
  res.status(200).json(new apiResponse(200, userLinks, "User links "));
});
export { generateShortLink, getOriginalLink, deleteOriginalLink, getuserLinks };
