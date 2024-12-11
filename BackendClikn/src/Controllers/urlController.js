import asyncHandler from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import * as cheerio from "cheerio";
const generateShortUrl = asyncHandler(async (req, res) => {
  const { originalurl, title } = req?.query;
  if (!originalurl) {
    throw new apiError(400, "Missing Required Data");
  }

  if (!title) {
    const Html = await fetch(originalurl);
    const $=        // Use $ as a constant bcz it is com
  }
});

export { generateShortUrl };
