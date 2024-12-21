import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowForward } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar, DateRangePicker, DateRange } from "react-date-range";
import { FaSlidersH } from "react-icons/fa";
import { useSelector } from "react-redux";

function Analytics() {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSelect = (ranges) => {
    // The ranges object contains the updated selection
    setSelectionRange(ranges.selection);
  };
  const startDate = selectionRange.startDate.toLocaleDateString();
  const endDate = selectionRange.endDate.toLocaleDateString();
  const { userlinks } = useSelector((state) => state.getUserLinkSlice);

  return (
    <div className="min-h-screen  px-2 sm:px-10 md:px-16 lg:px-20 xl:px-48 overflow-hidden ">
      <div className="px-4 mx-auto  sm:px-6 lg:px-8  border-b-[1px] border-gray-200">
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
                  {userlinks.map((link) => (
                    <option>{link.shortId}</option>
                  ))}
                </select>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
