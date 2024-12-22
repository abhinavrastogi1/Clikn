import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowForward } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar, DateRangePicker, DateRange } from "react-date-range";
import { FaSlidersH } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { analyticsApiCall } from "../../Store/Api/AnalyticsApiActions/AnalyticsApiActions";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function Analytics() {
  const { analytics } = useSelector((state) => state.analyticsSlice);
  console.log(analytics);
  const dispatch = useDispatch();
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  useEffect(() => {
    dispatch(analyticsApiCall());
  }, []);
  const [location, setLocation] = useState(true);
  const [locationButton, setLocationButton] = useState(true);
  const handleSelect = (ranges) => {
    // The ranges object contains the updated selection
    setSelectionRange(ranges.selection);
  };
  const startDate = selectionRange.startDate.toLocaleDateString();
  const endDate = selectionRange.endDate.toLocaleDateString();
  const { userlinks } = useSelector((state) => state.getUserLinkSlice);
  const [pieChartheight, setPieChartHeight] = useState(400);
  const [pieChartOuterRadius, setPieChartOuterRadius] = useState(150);
  const COLORS = [
    "#8884d8", // Purple
    "#82ca9d", // Green
    "#ffc658", // Yellow
    "#ff8042", // Orange
    "#8dd1e1", // Light Blue
    "#4395b1", // Blue
    "#f44336", // Red
    "#9c27b0", // Deep Purple
    "#cddc39", // Lime Green
    "#3f51b5", // Indigo
    "#4caf50", // Green (darker)
    "#ffeb3b", // Bright Yellow
    "#9e9e9e", // Grey
    "#00bcd4", // Cyan
    "#e91e63", // Pink
    "#2196f3", // Blue (brighter)
    "#673ab7", // Deep Purple (darker)
    "#009688", // Teal
  ];
  useEffect(() => {
    function handleSizeChange() {
      if (window.innerWidth < 1024) {
        setLocationButton(true);
        setLocation(true);
      }
      if (window.innerWidth < 625) {
        setPieChartHeight(300);
        setPieChartOuterRadius(100);
      } else {
        setPieChartHeight(400);
        setPieChartOuterRadius(150);
        setLocationButton(false);
      }
    }
    handleSizeChange();
    window.addEventListener("resize", handleSizeChange);
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, [window]);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 dark:bg-DB dark:shadow-sm  shadow-xl bg-white dark:shadow-white text-white rounded ">
          <p className="font-bold text-orange ">{`Month: ${label}`}</p>
          <p className="font-bold text-blue">{`Clicks: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="min-h-screen  px-2 sm:px-10 md:px-16 lg:px-20 xl:px-48 overflow-hidden  ">
      <div className="shadow-xl dark:shadow-md  dark:shadow-white ">
        <div className="px-4 mx-auto  sm:px-6 lg:px-8  border-b-[1px] border-gray-200 ">
          <div className="flex justify-between my-3 sm:my-4 p-4   px-4 mx-auto  sm:px-6 lg:px-8 ">
            <h1 className="dark:text-white text-gray-900  content-center  text-2xl  md:text-3xl lg:text-4xl font-bold">
              Analytics
            </h1>
            <button className="bg-blue   w-24 h-10 sm:w-28 p-2 sm:h-10 text-white rounded-md  transition transform ease-in-out duration-700 hover:scale-110">
              Create link
            </button>
          </div>
          <div className=" mb-2  px-4 mx-auto  sm:px-6 lg:px-8  relative   ">
            <div className="flex lg:justify-between flex-col lg:flex-row items-start gap-1 lg:gap-5 lg:items-center">
              <div className="flex lg:w-[40%] w-full sm:w-[70%] border-[1px] xl:w-[30%] dark:border-white border-black rounded-md justify-center items-center relative ">
                <div className="flex w-full justify-center items-center p-1">
                  <CiCalendar className="dark:text-white  h-full w-10 text-lg" />
                  <div className="w-full bg-transparent dark:text-white   outline-none text-center ">
                    <h3>{startDate}</h3>
                  </div>
                  <IoIosArrowForward className="dark:text-white  h-full w-8" />
                  <div className="w-full bg-transparent dark:text-white  outline-none text-center ">
                    <h3>{endDate}</h3>
                  </div>
                </div>
                {/* <div className=" top-10  sm:left-2 absolute w-full flex justify-center items-center">
                {" "}
                <DateRange
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  rangeColors={["#4395b1"]}
                  className="   shadow-xl !bg-[#fffff4] !text-white onfocus:!bg-red-500 "
                />
              </div> */}
              </div>

              <div className="flex justify-between items-center w-[100%] lg:[60%]">
                <div className="flex flex-row ">
                  <div className="dark:text-white flex ">
                    Filter
                    <span>
                      <FaSlidersH />
                    </span>
                  </div>
                  <div>
                    <select className="bg-transparent dark:text-white p-1 rounded-md outline-none border-[1px] border-white">
                      <option className="bg-transparent">All Time </option>
                      <option className="bg-transparent text-black">
                        All Time{" "}
                      </option>
                    </select>
                  </div>
                </div>
                <div className=" flex  ">
                  <h2 className="dark:text-white">Link:</h2>
                  <select>
                    {userlinks?.map((link) => (
                      <option>{link.shortId}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mx-auto  sm:px-6 lg:px-8 my-3 sm:my-4 p-4   ">
          <div className="flex flex-col ">
            <div className="w-full flex flex-col mt-10 p-4  rounded-md dark:shadow-sm  border-2 border-gray-200 shadow-lg dark:shadow-gray-200">
              <div className="dark:text-white font-bold text-xl sm:text-2xl md:text-3xl  my-1  sm:my-2 md:my-3 ml-3">
                {" "}
                <h1>Clicks + Scans over time</h1>
              </div>
              <div className="flex flex-col ">
                <ResponsiveContainer width="100%" height={pieChartheight}>
                  <LineChart
                    data={analytics?.clicks}
                    margin={{ top: 20, right: 20, bottom: 10, left: -25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis dataKey="clicks" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#4395b1"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className=" w-full  flex justify-center items-center ">
                  <h3 className="dark:text-white w-full  flex justify-center items-center font-bold text-md sm:text-lg ">
                    {" "}
                     Y-axis: Clicks &nbsp; & &nbsp; X-axis: Month
                  </h3>{" "}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-4">
              <div className="w-full flex flex-col mt-10 p-4  rounded-md dark:shadow-sm  border-2 border-gray-200 shadow-lg dark:shadow-gray-200">
                <div className="dark:text-white font-bold text-xl sm:text-2xl md:text-3xl  my-1  sm:my-2 md:my-3 ml-3">
                  {" "}
                  <h1>Clicks + Scans by browser</h1>
                </div>
                <div className="w-full">
                  <ResponsiveContainer width="100%" height={pieChartheight}>
                    <PieChart width="100%" height={pieChartheight}>
                      <Pie
                        data={analytics?.browser}
                        dataKey="clicks"
                        nameKey="browser"
                        cx="50%"
                        cy="50%"
                        outerRadius={pieChartOuterRadius}
                        label
                      >
                        {analytics?.browser?.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="w-full flex flex-col mt-10 p-4 rounded-md dark:shadow-sm  border-2 border-gray-200 shadow-lg dark:shadow-gray-200">
                <div className="dark:text-white font-bold text-xl sm:text-2xl md:text-3xl  my-1  sm:my-2 md:my-3 ml-3">
                  {" "}
                  <h1>Clicks + Scans by device</h1>
                </div>
                <div className="w-full">
                  <ResponsiveContainer width="100%" height={pieChartheight}>
                    <PieChart width={730} height={pieChartheight}>
                      <Pie
                        data={analytics?.device}
                        dataKey="clicks"
                        nameKey="device"
                        cx="50%"
                        cy="50%"
                        outerRadius={pieChartOuterRadius}
                        label
                      >
                        {analytics?.device?.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col mt-10 p-4 rounded-md dark:shadow-sm  border-2 border-gray-200 shadow-lg dark:shadow-gray-200">
              <div className="dark:text-white font-bold text-xl sm:text-2xl md:text-3xl  my-1  sm:my-2 md:my-3 ml-3">
                {" "}
                <h1>Clicks + Scans by location</h1>
              </div>
              <div className="max-h-[70vh] min-h-[30vh] flex flex-col w-full  border-md p-2 ">
                <div className=" w-full flex flex-row p-2 bg-slate-200 rounded-full my-2 ">
                  <h2
                    className={` w-[50%] flex justify-center items-center font-bold lg sm:text-2xl  rounded-full cursor-pointer ${
                      location && "bg-white"
                    } `}
                    onClick={() => {
                      if (locationButton) setLocation(true);
                    }}
                  >
                    Country
                  </h2>
                  <h2
                    className={` w-[50%] flex justify-center items-center font-bold  lg  sm:text-2xl rounded-full cursor-pointer ${
                      !location && "bg-white"
                    } `}
                    onClick={() => {
                      if (locationButton) setLocation(false);
                    }}
                  >
                    City
                  </h2>
                </div>
                <div className="flex flex-row gap-2">
                  {" "}
                  <div className="w-[100%] lg:w-[50%] flex max-h-[60vh] min-h-[20vh] border-md  overflow-y-auto  border-[1px] rounded-md border-gray-200   ">
                    {location ? (
                      <div className="w-[100%] h-full rounded-md p-2 pr-0  ">
                        <div className="flex w-full  dark:text-white p-2 pr-0 font-semibold text-lg border-b-[1px] border-gray-400">
                          <div className="w-[75%]"> Country</div>
                          <div className="w-[25%]">Clicks</div>
                        </div>
                        <div className="flex w-full  dark:text-white p-2 pr-0 font-semibold text-lg ">
                          <div className="w-[100%] border-b-[1px] border-gray-400 flex flex-row">
                            <div className="flex flex-col w-[75%]">
                              {analytics?.country?.map((countryObj, index) => (
                                <h1 className="dark:text-white p-2 pr-0 font-semibold text-lg ">
                                  {index + 1} . {countryObj.country}
                                </h1>
                              ))}
                            </div>
                            <div className="flex flex-col w-[25%]">
                              {analytics?.country?.map((countryObj) => (
                                <h1 className=" dark:text-white p-2  font-semibold text-lg ">
                                  {countryObj.clicks}
                                </h1>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-[100%] h-full rounded-md p-2 pr-0 ">
                        <div className="flex w-full  dark:text-white p-2 pr-0 font-semibold text-lg border-b-[1px] border-gray-400">
                          <div className="w-[75%]"> City</div>
                          <div className="w-[25%]">Clicks</div>
                        </div>
                        <div className="flex w-full  dark:text-white p-2 pr-0 font-semibold text-lg ">
                          <div className="w-[100%] border-b-[1px] border-gray-400 flex flex-row">
                            <div className="flex flex-col w-[75%]">
                              {analytics?.city?.map((cityObj, index) => (
                                <h1 className="dark:text-white p-2 pr-0 font-semibold text-lg ">
                                  {index + 1} . {cityObj.city}
                                </h1>
                              ))}
                            </div>
                            <div className="flex flex-col w-[25%]">
                              {analytics?.city?.map((cityObj) => (
                                <h1 className=" dark:text-white p-2  font-semibold text-lg ">
                                  {cityObj.clicks}
                                </h1>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-[50%]  max-h-[60vh] hidden  lg:flex min-h-[20vh] border-md overflow-y-auto   border-[1px] border-gray-200 rounded-md ">
                    <div className="w-[100%] h-full rounded-md p-2 pr-0 ">
                      <div className="flex w-full  dark:text-white p-2 pr-0 font-semibold text-lg border-b-[1px] border-gray-400">
                        <div className="w-[75%]"> City</div>
                        <div className="w-[25%]">Clicks</div>
                      </div>
                      <div className="flex w-full  dark:text-white p-2 pr-0 font-semibold text-lg ">
                        <div className="w-[100%] border-b-[1px] border-gray-400 flex flex-row">
                          <div className="flex flex-col w-[75%]">
                            {analytics?.city?.map((cityObj, index) => (
                              <h1 className="dark:text-white p-2 pr-0 font-semibold text-lg ">
                                {index + 1} . {cityObj.city}
                              </h1>
                            ))}
                          </div>
                          <div className="flex flex-col w-[25%]">
                            {analytics?.city?.map((cityObj) => (
                              <h1 className=" dark:text-white p-2  font-semibold text-lg ">
                                {cityObj.clicks}
                              </h1>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
