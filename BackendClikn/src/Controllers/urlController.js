import asyncHandler from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import axios from "axios";
import * as cheerio from "cheerio";
import DeviceDetector from "device-detector-js";
import { Link } from "../Models/linkmodel.js";
import apiResponse from "../Utils/apiResponse.js";

import mongoose from "mongoose";
import { Analytics } from "../Models/analyticsModel.js";
const generateShortLink = asyncHandler(async (req, res) => {
  const { originalLink } = req?.query;
  let { title } = req?.query || null;

  const { userId } = req?.user;
  if (!originalLink) {
    throw new apiError(400, "Missing Required Data");
  }
  if (!title) {
    const { data } = await axios.get(originalLink);
    if (!data) {
      throw new apiError(500, "something went wrong while fetching data");
    }
    // Use $ as a constant bcz it is common way in jQuery
    const $ = cheerio.load(data);
    title = $("title").text();
  }
  if (!title) {
    userId;
    throw new apiError(
      400,
      "something went wrong while getting title or link is wrong "
    );
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
  const link = await Link.create({
    user: new mongoose.Types.ObjectId(userId),
    title: title,
    shortId: generateShortId,
    originalLink: originalLink,
  });
  if (!link) {
    throw new apiError(500, "Something went wrog while generating short Link");
  }
  res.status(200).json(
    new apiResponse(
      200,
      {
        title: link.title,

        shortId: link.shortId,

        originalLink: link.originalLink,
      },
      "link is successfully generated"
    )
  );
});
const getOriginalLink = asyncHandler(async (req, res) => {
  console.log(req.ip, req?.headers["x-forwarded-for"]);
  res.send({"headers":req?.headers["x-forwarded-for"],
    ip:req.ip
  })

  
  // const { shortId } = req?.params;
  // if (!shortId) {
  //   throw new apiError(400, "Missing Required Data");
  // }
  // const link = await Link.findOne({ shortId: shortId });
  // if (!link) {
  //   const htmlContent = `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <title>Bad Request</title>
  //     <style>
  //       body {
  //         font-family: Arial, sans-serif;
  //         display: flex;
  //         justify-content: center;
  //         align-items: center;
  //         height: 100vh;
  //         margin: 0;
  //         background-color: #f8f8f8;
  //       }
  //       .container {
  //         text-align: center;
  //         border: 1px solid #ddd;
  //         padding: 20px;
  //         border-radius: 10px;
  //         background: #fff;
  //         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  //       }
  //       h1 {
  //         color: #ff4c4c;
  //       }
  //       p {
  //         font-size: 16px;
  //         color: #333;
  //       }
  //       .button {
  //         margin-top: 20px;
  //         padding: 10px 20px;
  //         font-size: 16px;
  //         color: #fff;
  //         background-color: #007bff;
  //         border: none;
  //         border-radius: 5px;
  //         text-decoration: none;
  //         cursor: pointer;
  //       }
  //       .button:hover {
  //         background-color: #0056b3;
  //       }
  //     </style>
  //   </head>
  //   <body>
  //     <div class="container">
  //       <h1>Bad Request</h1>
  //       <p>The request is invalid, or the link may be broken.
  //       Maybe what you are looking for can be found at
  //       <a href="https://clikn.in" >clikn.in</a></p>
  //     </div>
  //   </body>
  //   </html>
  // `;
  //   res.setHeader("Content-Type", "text/html");
  //   res.status(400).send(htmlContent); // Send 400 status for a bad request
  //   return;
  // }
  // const deviceDetector = new DeviceDetector();
  // const userAgent = req.headers["user-agent"];

  // const browserInfo = deviceDetector.parse(userAgent);

  // const ipAddress = req.ip;
  // req.headers["x-forwarded-for"] || // Check for proxies
  //   req.socket.remoteAddress || // Fallback to remoteAddress
  //   "Unknown IP";
  // const locationApiRes = await axios.get(`http://ip-api.com/json/${ipAddress}`);
  // let date = new Date();
  // const analyticsData = {
  //   date: date.toLocaleString(),
  //   browser: browserInfo?.client?.name || null,
  //   device: browserInfo?.device?.type || null,
  //   country: locationApiRes?.data?.country || null,
  //   state: locationApiRes?.data?.regionName || null,
  //   city: locationApiRes?.data?.city || null,
  // };

  // let anlaytics = await Analytics.findOne({ linkId: link._id });
  // if (!anlaytics) {
  //   anlaytics = await Analytics.create({
  //     linkId: new mongoose.Types.ObjectId(link._id),
  //     clikedLink: [analyticsData],
  //   });
  // } else {
  //   // If Analytics document exists, push the new analyticsData into the clickedLink array
  //   await Analytics.findOneAndUpdate(
  //     {
  //       linkId: link._id,
  //     },
  //     { $push: { clikedLink: analyticsData } }
  //   );
  // }

  // const originalLink = link.originalLink;
  // res.status(301).redirect(originalLink);
});
export { generateShortLink, getOriginalLink };