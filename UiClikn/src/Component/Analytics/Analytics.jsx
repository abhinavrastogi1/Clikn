import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowForward } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { FaSlidersH } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { analyticsApiCall } from "../../Store/Api/AnalyticsApiActions/AnalyticsApiActions";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CreateLink from "../Link/CreateLink";
import { getUserLinkApi } from "../../Store/Api/ShortLinkActions/getUserLinksSlice";

function Analytics() {
  useEffect(() => {
    dispatch(getUserLinkApi());
  }, []);
  const { userlinks, status } = useSelector((state) => state.getUserLinkSlice);
  const { shortLink } = useSelector((state) => state.createShortLinkSlice);
  const [apiCallData, setApiCallData] = useState({});
  useEffect(() => {
    if (status === "success") {
      let shortId = userlinks?.[0]?.shortId;
      if (shortLink) {
        shortId = shortLink;
      }
      const date = new Date();
      dispatch(
        analyticsApiCall({
          year: date.getFullYear(),
          shortId: shortId,
        })
      );
    }
  }, [status]);
  const { analytics } = useSelector((state) => state.analyticsSlice);
  const dispatch = useDispatch();
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };
  const [location, setLocation] = useState(true);
  const [locationButton, setLocationButton] = useState(true);
  const startDate = selectionRange.startDate.toLocaleDateString();
  const endDate = selectionRange.endDate.toLocaleDateString();
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
        setPieChartHeight(250);
        setPieChartOuterRadius(70);
      } else {
        setPieChartHeight(400);
        setPieChartOuterRadius(150);
      }
      if (window.innerWidth >= 1024) {
        setLocationButton(false);
      }
    }
    handleSizeChange();
    window.addEventListener("resize", handleSizeChange);
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, [window]);

  const [filter, setFilter] = useState("Filter");
  const [link, setLink] = useState(shortLink ||userlinks?.[0]?.shortId);
  const [showFilter, setShowFilter] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showcalender, setshowCalender] = useState(false);
  const filterRef = useRef(null);
  const linksRef = useRef(null);
  const rangeRef = useRef(null);
  const options = [
    {
      option: (
        <h2
          className="text-lg dark:text-white font-bold  cursor-pointer hover:shadow-md dark:shadow-white px-4 py-2 transition transform ease-in-out duration-700 hover:scale-110"
          onClick={() => {
            setFilter("Range");
            setShowFilter(false);
          }}
          key="Range"
        >
          Range
        </h2>
      ),
    },
    {
      option: (
        <h2
          className="text-lg dark:text-white font-bold  cursor-pointer  hover:shadow-md dark:shadow-white px-4 py-2 transition transform ease-in-out duration-700 hover:scale-110"
          onClick={() => {
            setFilter("Date");
            setShowFilter(false);
          }}
          key="Date"
        >
          Date
        </h2>
      ),
    },
    {
      option: (
        <h2
          className="text-lg dark:text-white font-bold cursor-pointer hover:shadow-md dark:shadow-white px-4 py-2 transition transform ease-in-out duration-700 hover:scale-110"
          onClick={() => {
            setFilter("Month");
            setShowFilter(false);
          }}
          key="Month"
        >
          Month
        </h2>
      ),
    },
    {
      option: (
        <h2
          className="text-lg dark:text-white cursor-pointer font-bold hover:shadow-md dark:shadow-white px-4 py-2 transition transform ease-in-out duration-700 hover:scale-110"
          onClick={() => {
            setFilter("Year");
            setShowFilter(false);
          }}
          key="Year"
        >
          {" "}
          Year
        </h2>
      ),
    },
  ];
  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
      if (linksRef.current && !linksRef.current.contains(e.target)) {
        setShowLinks(false);
      }
      if (rangeRef.current && !rangeRef.current.contains(e.target)) {
        setshowCalender(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setLink( shortLink || userlinks?.[0]?.shortId);
  }, [userlinks]);
  const [selectDate, setSelectDate] = useState(new Date());
  const [lineChartValue, setlineChartValue] = useState("month");
  useEffect(() => {
    if (filter === "Date") {
      setApiCallData({
        completeDate: {
          date: selectDate.getDate(),
          month: selectDate.getMonth() + 1,
          year: selectDate.getFullYear(),
        },
        shortId: link,
      });
      setlineChartValue("hour");
    } else if (filter === "Month") {
      setApiCallData({
        month: {
          month: selectDate.getMonth() + 1,
          year: selectDate.getFullYear(),
        },
        shortId: link,
      });
      setlineChartValue("date");
    } else if (filter === "Year") {
      setApiCallData({
        year: selectDate.getFullYear(),
        shortId: link,
      });
      setlineChartValue("month");
    } else if (filter === "Range") {
      const parseDate = (dateStr) => {
        const month = dateStr.split("/");
        const day = dateStr.split("/");
        const year = dateStr.split("/");
        return `${year[2]}/${month[0]}/${day[1]}`; // Converts to YYYY/MM/DD format
      };
      const rangeStartDate = parseDate(startDate);
      const rangeEndDate = parseDate(endDate);
      setApiCallData({
        range: { startDate: rangeStartDate, endDate: rangeEndDate },
        shortId: link,
      });
      setlineChartValue("date");
    }
  }, [filter, link, selectDate, startDate, endDate]);

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 dark:bg-DB dark:shadow-sm  shadow-xl bg-white dark:shadow-white text-white rounded ">
          <p className="font-bold text-orange ">{`${capitalizeWords(
            lineChartValue
          )}: ${label}`}</p>
          <p className="font-bold text-blue">{`Clicks: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  function handleAnalytics() {
    if (filter === "Filter") {
      const date = new Date();
      dispatch(
        analyticsApiCall({
          year: date.getFullYear(),
          shortId: link,
        })
      );
    } else {
      dispatch(analyticsApiCall(apiCallData));
    }
  }
  // create link
  const [createLink, setCreateLink] = useState(false);
  const createLinkRef = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (createLinkRef.current && !createLinkRef.current.contains(e.target)) {
        setCreateLink(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return (
    <div className="min-h-screen  px-2 sm:px-10 md:px-16 lg:px-20 xl:px-36 overflow-hidden  mb-6 ">
      <div className="shadow-xl dark:shadow-md  dark:shadow-white ">
        <div className="px-2 mx-auto  sm:px-6 lg:px-8  border-b-[1px] border-gray-200 ">
          <div className="flex justify-between my-3 sm:my-4 p-4   px-4 mx-auto  sm:px-6 lg:px-8 ">
            <h1 className="dark:text-white text-gray-900  content-center  text-2xl  md:text-3xl lg:text-4xl font-bold">
              Analytics
            </h1>
            <div className="relative" ref={createLinkRef}>
              {" "}
              <button
                className="bg-blue   w-28 h-10  p-2 sm:h-10
             text-white rounded-md font-bold
               text-md flex justify-center  items-center transition
                transform ease-in-out duration-700 hover:scale-110"
                onClick={() => {
                  setCreateLink(!createLink);
                }}
              >
                Create link
              </button>
              {createLink && (
                <CreateLink formType="link" setCreateLink={setCreateLink} />
              )}
            </div>
          </div>
          <div className=" mb-2   mx-auto  sm:px-6 lg:px-8  relative   ">
            <div className="flex lg:justify-between flex-col lg:flex-row items-start gap-1 lg:gap-5 lg:items-center">
              {filter === "Range" && (
                <div
                  className="flex lg:w-[40%] w-full sm:w-[70%] border-[1px] xl:w-[30%] dark:border-white 
               rounded-md justify-center items-center relative "
                  ref={rangeRef}
                >
                  <div
                    className="flex w-full justify-center items-center p-1  cursor-pointer "
                    onClick={() => {
                      setshowCalender(!showcalender);
                    }}
                  >
                    <CiCalendar className="dark:text-white  h-full w-10 text-lg" />
                    <div className="w-full bg-transparent dark:text-white   outline-none text-center ">
                      <h3 className="font-bold">{startDate}</h3>
                    </div>
                    <IoIosArrowForward className="dark:text-white  h-full w-8" />
                    <div className="w-full bg-transparent dark:text-white  outline-none text-center ">
                      <h3 className="font-bold">{endDate}</h3>
                    </div>
                  </div>
                  {showcalender && (
                    <div
                      className=" top-10  sm:left-2 absolute  !flex !justify-center !items-center z-10 p-2  rdrCalendarWrapper
                    "
                    >
                      {" "}
                      <DateRange
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                        rangeColors={["#4395b1"]}
                        className=" hadow-xl !bg-[#fffff4] !text-white   custom-date-range content-center "
                      />
                    </div>
                  )}
                </div>
              )}
              {filter === "Filter" && (
                <div className="border-[1px] rounded-md   w-28 flex justify-center items-center ml-1">
                  <h1 className="dark:text-white font-bold  px-3 py-[6px] ">
                    {new Date().getFullYear()}
                  </h1>
                </div>
              )}
              {filter === "Date" && (
                <div>
                  <DatePicker
                    selected={selectDate}
                    onChange={(date) => {
                      setSelectDate(date);
                    }}
                    popperPlacement="bottom-start"
                    className=" bg-transparent dark:text-white font-bold outline-none border-[1px]
                     px-3 py-[6px] flex rounded-md w-28 justify-center items-center ml-1"
                  />
                </div>
              )}
              {filter === "Month" && (
                <div>
                  <DatePicker
                    selected={selectDate}
                    showMonthYearPicker
                    dateFormat="YYYY-MMM"
                    popperPlacement="bottom-start"
                    onChange={(date) => {
                      setSelectDate(date);
                    }}
                    className=" bg-transparent dark:text-white font-bold outline-none border-[1px]
                     px-3 py-1 flex rounded-md w-28 justify-center items-center ml-1"
                  />
                </div>
              )}
              {filter === "Year" && (
                <div>
                  <DatePicker
                    selected={selectDate}
                    showYearPicker
                    dateFormat="YYYY"
                    popperPlacement="bottom-start"
                    onChange={(date) => {
                      setSelectDate(date);
                    }}
                    className=" bg-transparent dark:text-white font-bold outline-none border-[1px]
                     px-3 py-[5px] flex rounded-md w-28 justify-center items-center ml-1"
                  />
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 w-[100%] lg:[60%]">
                <div className="flex flex-row gap-4   ">
                  <div className="bg-transparent dark:text-white p-1 rounded-md outline-none ">
                    <div className="bg-transparent relative " ref={filterRef}>
                      <div
                        onClick={() => {
                          setShowFilter(!showFilter);
                        }}
                        className="rounded-md px-4 py-1 border-[1px] w-28 justify-center items-center "
                      >
                        {" "}
                        {filter === "Filter" ? (
                          <h2
                            className="text-lg dark:text-white font-bold flex  cursor-pointer gap-3 justify-center items-center"
                            onClick={() => {
                              setFilter("Filter");
                            }}
                          >
                            Filter
                            <span>
                              <FaSlidersH />
                            </span>
                          </h2>
                        ) : (
                          <h2
                            className="text-lg dark:text-white font-bold flex cursor-pointer justify-center items-center "
                            onClick={() => {
                              setFilter(filter);
                            }}
                          >
                            {filter}
                          </h2>
                        )}
                      </div>
                      {showFilter && (
                        <div
                          className="flex flex-col border-[1px] mt-1 
                         dark:bg-DB bg-offwhite border-white shadow-md dark:shadow-white rounded-md p-2 absolute z-10"
                        >
                          {options.map((option) => option.option)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" flex  sm:flex-row gap-3">
                  <div className="flex gap-2 " ref={linksRef}>
                    <h2 className="dark:text-white font-bold  items-center flex justify-center text-xl">
                      Links:
                    </h2>
                    <div className="bg-transparent relative ">
                      {userlinks?.length > 0 ? (
                        <div
                          onClick={() => {
                            setShowLinks(!showLinks);
                          }}
                          className="rounded-md px-4 py-1 border-[1px]  justify-center items-center "
                        >
                          <h2 className="text-lg dark:text-white font-bold flex cursor-pointer justify-center items-center ">
                            {link}{" "}
                          </h2>
                        </div>
                      ) : (
                        <div className="rounded-md px-4 py-1 border-[1px]  justify-center items-center ">
                          <h2 className="text-lg dark:text-white font-bold flex cursor-pointer justify-center items-center ">
                            No Links
                          </h2>
                        </div>
                      )}
                      {showLinks && (
                        <div
                          className="flex flex-col border-[1px] mt-1 
                         dark:bg-DB bg-offwhite border-white shadow-md dark:shadow-white rounded-md p-2 absolute z-10
                         max-h-96 overflow-y-auto  scroll"
                        >
                          {userlinks?.map((link) => (
                            <h2
                              className="text-lg dark:text-white font-bold  cursor-pointer hover:shadow-md dark:shadow-white
                               px-4 py-2 transition transform ease-in-out duration-700 hover:scale-110"
                              onClick={() => {
                                setLink(link.shortId);
                                setShowLinks(false);
                              }}
                              key={link.shortId}
                            >
                              {link.shortId}
                            </h2>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className="bg-blue py-1 px-4 w-28 text-white font-bold text-lg rounded-md 
                   transition transform ease-in-out duration-700 hover:scale-110"
                    onClick={handleAnalytics}
                  >
                    Apply{" "}
                  </button>
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
                    <XAxis dataKey={lineChartValue} />
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
                    Y-axis: Clicks &nbsp; & &nbsp; X-axis:{" "}
                    {capitalizeWords(lineChartValue)}
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
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="p-2 dark:bg-DB dark:shadow-sm  shadow-xl bg-white dark:shadow-white text-white rounded ">
                                <p className="font-bold text-blue">{`${payload[0].name}: ${payload[0].value}`}</p>
                              </div>
                            );
                          }
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div>
                    {analytics?.browser?.map((browser, index) => {
                      const color = COLORS[index % COLORS.length];
                      return (
                        <h2
                          style={{ color: color }}
                          className="text-lg  font-bold"
                          key={index}
                        >
                          <span>{browser.browser} :</span>{" "}
                          <span>{browser.clicks}</span>
                        </h2>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col mt-10 p-4 rounded-md dark:shadow-sm  border-2 border-gray-200 shadow-lg dark:shadow-gray-200 ">
                <div className="dark:text-white font-bold text-xl sm:text-2xl md:text-3xl  my-1  sm:my-2 md:my-3 ml-3 ">
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
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div
                                className="p-2 dark:bg-DB dark:shadow-sm  shadow-xl
                                 bg-white dark:shadow-white text-white rounded "
                              >
                                <p className="font-bold text-blue">{`${payload[0].name}: ${payload[0].value}`}</p>
                              </div>
                            );
                          }
                        }}
                      />

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div>
                    {analytics?.device?.map((browser, index) => {
                      const color = COLORS[index % COLORS.length];
                      return (
                        <h2
                          style={{ color: color }}
                          className="text-lg  font-bold"
                          key={index}
                        >
                          <span>{browser.device} :</span>{" "}
                          <span>{browser.clicks}</span>
                        </h2>
                      );
                    })}
                  </div>
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
                  <div className="w-[100%] lg:w-[50%] flex max-h-[60vh] min-h-[20vh] border-md  overflow-y-auto scroll  border-[1px] rounded-md border-gray-200   ">
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
                                <h1
                                  className="dark:text-white p-2 pr-0 font-semibold text-lg "
                                  key={countryObj.country}
                                >
                                  {index + 1} . {countryObj.country}
                                </h1>
                              ))}
                            </div>
                            <div className="flex flex-col w-[25%]">
                              {analytics?.country?.map((countryObj) => (
                                <h1
                                  className=" dark:text-white p-2  font-semibold text-lg "
                                  key={countryObj.country}
                                >
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
                                <h1
                                  className="dark:text-white p-2 pr-0 font-semibold text-lg "
                                  key={cityObj.city}
                                >
                                  {index + 1} . {cityObj.city}
                                </h1>
                              ))}
                            </div>
                            <div className="flex flex-col w-[25%]">
                              {analytics?.city?.map((cityObj) => (
                                <h1
                                  className=" dark:text-white p-2  font-semibold text-lg "
                                  key={cityObj.city}
                                >
                                  {cityObj.clicks}
                                </h1>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-[50%]  max-h-[60vh] hidden  lg:flex min-h-[20vh] border-md overflow-y-auto  scroll border-[1px] border-gray-200 rounded-md ">
                    <div className="w-[100%] h-full rounded-md p-2 pr-0 ">
                      <div className="flex w-full  dark:text-white p-2 pr-0 font-semibold text-lg border-b-[1px] border-gray-400">
                        <div className="w-[75%]"> City</div>
                        <div className="w-[25%]">Clicks</div>
                      </div>
                      <div className="flex w-full  dark:text-white p-2 pr-0 font-semibold text-lg ">
                        <div className="w-[100%] border-b-[1px] border-gray-400 flex flex-row">
                          <div className="flex flex-col w-[75%]">
                            {analytics?.city?.map((cityObj, index) => (
                              <h1
                                className="dark:text-white p-2 pr-0 font-semibold text-lg "
                                key={cityObj.city}
                              >
                                {index + 1} . {cityObj.city}
                              </h1>
                            ))}
                          </div>
                          <div className="flex flex-col w-[25%]">
                            {analytics?.city?.map((cityObj) => (
                              <h1
                                className=" dark:text-white p-2  font-semibold text-lg "
                                key={cityObj.city}
                              >
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
