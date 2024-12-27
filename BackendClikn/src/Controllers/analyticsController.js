import mongoose from "mongoose";
import { Analytics } from "../Models/analyticsModel.js";
import { Link } from "../Models/linkmodel.js";
import apiError from "../Utils/apiError.js";
import asyncHandler from "../Utils/asyncHandler.js";
import apiResponse from "../Utils/apiResponse.js";
const getDateAnalytics = asyncHandler(async (req, res) => {
  const { completeDate, year, month, range, shortId } = req?.query;
  if (!completeDate && !year && !month && !range) {
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
  if (completeDate) {
    const month = completeDate?.month;
    const year = completeDate?.year;
    const date = completeDate?.date;
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
                  Number(date),
                ],
              },
            ],
          },
        },
      },
      {
        $facet: {
          clicks: [
            {
              $project: {
                globalHour: {
                  $mod: [
                    {
                      $add: [
                        {
                          $hour: "$clikedLink.date",
                        },
                        5,
                      ],
                    },
                    24,
                  ],
                },
                globalMinInHour: {
                  $floor: [
                    {
                      $divide: [
                        {
                          $add: [
                            {
                              $minute: "$clikedLink.date",
                            },
                            30,
                          ],
                        },
                        60,
                      ],
                    },
                  ],
                },
                _id: 0,
              },
            },
            {
              $project: {
                localHour: {
                  $add: ["$globalHour", "$globalMinInHour"],
                },
              },
            },
            {
              $group: {
                _id: "$localHour",
                clicks: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                hour: "$_id",
                _id: 0,
                clicks: 1,
              },
            },
            {
              $sort: {
                hour: 1,
              },
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
              },
            },
          ],
        },
      },
    ]);
  } else if (year) {
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
          clicks: [
            {
              $project: {
                month: {
                  $month: "$clikedLink.date",
                },
                _id: 0,
              },
            },
            {
              $group: {
                _id: "$month",
                clicks: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                month: {
                  $arrayElemAt: [
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    {
                      $subtract: ["$_id", 1],
                    },
                  ],
                },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
            {
              $project: {
                _id: 0,
              },
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
              },
            },
          ],
        },
      },
    ]);
  } else if (month) {
    const monthValue = month?.month;
    const yearValue = month?.year;
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
                  Number(yearValue),
                ],
              },
              {
                $eq: [
                  {
                    $month: "$clikedLink.date",
                  },
                  Number(monthValue),
                ],
              },
            ],
          },
        },
      },
      {
        $facet: {
          clicks: [
            {
              $project: {
                date: { $dayOfMonth: "$clikedLink.date" },
                _id: 0,
              },
            },
            {
              $group: {
                _id: "$date",
                clicks: {
                  $sum: 1,
                },
              },
            },
            {
              $addFields: {
                date: "$_id",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $sort: { date: 1 },
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
              },
            },
          ],
        },
      },
    ]);
  } else if (range) {
    const startDate = new Date(`${range?.startDate}`).toISOString();
    const endDate = new Date(`${range?.endDate}`).toISOString();

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
                $gte: [
                  {
                    $toDate: "$clikedLink.date",
                  },
                  new Date(startDate),
                ],
              },
              {
                $lte: [
                  {
                    $toDate: "$clikedLink.date",
                  },
                  new Date(endDate),
                ],
              },
            ],
          },
        },
      },
      {
        $sort: {
          "clikedLink.date": 1,
        },
      },
      {
        $facet: {
          clicks: [
            {
              $project: {
                date: {
                  $arrayElemAt: [
                    {
                      $split: [
                        {
                          $toString: "$clikedLink.date",
                        },
                        "T",
                      ],
                    },
                    0,
                  ],
                },
              },
            },
            {
              $group: {
                _id: "$date",
                clicks: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                clicks: 1,
                date: "$_id",
                _id: 0,
              },
            },
            {
              $sort: {
                date: 1,
              },
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
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
                clicks: {
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
                clicks: 1,
              },
            },
          ],
        },
      },
    ]);
  } else {
    throw new apiError(401, "Requested data is not supported");
  }
  res.status(200).json(new apiResponse(200, analyticsData, "Link Analytics"));
});
export { getDateAnalytics };
