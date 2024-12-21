import mongoose from "mongoose";
import { Analytics } from "../Models/analyticsModel";
import { Link } from "../Models/linkmodel";
import apiError from "../Utils/apiError";
import asyncHandler from "../Utils/asyncHandler";

const getDateAnalytics = asyncHandler(async (req, res) => {
  const { date, year, month, range, shortId } = req?.query;
  if (date || year || month || range) {
    throw new apiError(400, "Missing required data");
  }
  if (!shortId) {
    throw new apiError(400, "Missing required data");
  }
  const link = await Link.findOne({ shortId: shortId });
  if (!link) {
    throw new apiError(400, "link does not exist");
  }
  let analyticsData;
  if (date) {
    const month = date?.month;
    const year = date?.year;
    const day = date?.day;
    analyticsData = await Analytics.aggregate([
      {
        $match: {
          linkId: new mongoose.Types.ObjectId(link?._id),
        },
      },
      {
        $unwind: "$clikedLink",
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  {
                    $year: "$clikedLink.date",
                  },
                  Number(year),
                ],
              },
              {
                $eq: [
                  {
                    $month: "$clikedLink.date",
                  },
                  Number(month),
                ],
              },
              {
                $eq: [
                  {
                    $dayOfMonth: "$clikedLink.date",
                  },
                  Number(day),
                ],
              },
            ],
          },
        },
      },
      {
        $facet: {
          cliks: [
            {
              $project: {
                hour: { $hour: "$clikedLink.date" },
                minute: { $minute: "$clikedLink.date" },
                _id: 0,
              },
            },
            {
              $group: {
                _id: "$hour",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                hour: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: { hour: 1 },
            },
          ],
          browser: [
            {
              $match: {
                "clikedLink.browser": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.browser",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                browser: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
          device: [
            {
              $match: {
                "clikedLink.device": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.device",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                device: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
          country: [
            {
              $match: {
                "clikedLink.country": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.country",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                country: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
          city: [
            {
              $match: {
                "clikedLink.city": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.city",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                city: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
        },
      },
    ]);
  } 
  else if (year) {
    analyticsData = await Analytics.aggregate([
      {
        $match: {
          linkId: new mongoose.Types.ObjectId(link?._id),
        },
      },
      {
        $unwind: "$clikedLink",
      },
      {
        $match: {
          $expr: {
            $eq: [
              {
                $year: "$clikedLink.date",
              },
              Number(year),
            ],
          },
        },
      },
      {
        $facet: {
            cliks: [
                {
                  $project: {
                    month: { $month: "$clikedLink.date" },
                    _id: 0,
                  },
                },
                {
                  $group: {
                    _id: "$month",
                    count: {
                      $sum: 1,
                    },
                  },
                },
                {
                  $addFields: {
                    month: "$_id",
                  },
                },
                {
                  $project: {
                    _id: 0,
                  },
                },
                {
                  $sort: { month: 1 },
                },
              ],
          browser: [
            {
              $match: {
                "clikedLink.browser": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.browser",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                browser: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
          device: [
            {
              $match: {
                "clikedLink.device": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.device",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                device: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
          country: [
            {
              $match: {
                "clikedLink.country": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.country",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                country: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
          city: [
            {
              $match: {
                "clikedLink.city": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.city",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                city: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
        },
      },
    ]);
  } 
  else if (month) {
    const month = month?.month;
    const year = month?.year;
    analyticsData = await Analytics.aggregate([
      {
        $match: {
          linkId: new mongoose.Types.ObjectId(link?._id),
        },
      },
      {
        $unwind: "$clikedLink",
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  {
                    $year: "$clikedLink.date",
                  },
                  Number(year),
                ],
              },
              {
                $eq: [
                  {
                    $month: "$clikedLink.date",
                  },
                  Number(month),
                ],
              },
            ],
          },
        },
      },
      {
        $facet: {
          cliks: [
            {
              $project: {
                day: { $dayOfMonth: "$clikedLink.date" },
                _id: 0,
              },
            },
            {
              $group: {
                _id: "$day",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                day: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: { day: 1 },
            },
          ],
          browser: [
            {
              $match: {
                "clikedLink.browser": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.browser",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                browser: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
          device: [
            {
              $match: {
                "clikedLink.device": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.device",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                device: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
          country: [
            {
              $match: {
                "clikedLink.country": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.country",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                country: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
          city: [
            {
              $match: {
                "clikedLink.city": { $ne: null },
              },
            },
            {
              $group: {
                _id: "$clikedLink.city",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                city: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: {
                count: 1,
              },
            },
          ],
        },
      },
    ]);
  } else if (range) {
  }
  else{
    throw new apiError(401,"Requested data is not supported")
  }
  res.status(200).json(200,analyticsData,"Analytics Data ")
});
