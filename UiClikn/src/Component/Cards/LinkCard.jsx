import React from "react";
import { MdDelete } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { IoStatsChartSharp } from "react-icons/io5";

function LinkCard() {
  const urlLogo = "https://www.youtube.com/favicon.ico";
  const originalUrl =
    "https://youtubessssssssssssssssssssssssssssssssssssssssssssssssssssssssss.com";
  const shortLink = "clikn.in/qwerte";
  const Date = "24 Dec 2024";
  const linkName = "youtube";
  return (
    <div className=" grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 dark:bg-slate-800  shadow-2xl dark:shadow-lg dark:shadow-gray-700 rounded-md ">
      <div className=" row-span-2 sm:col-span-2 sm:row-span-1  overflow-hidden p-4 pb-2 border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-gray-200 ">
        <div className="flex flex-row gap-3  overflow-hidden">
          <img
            src={urlLogo}
            alt=""
            className=" h-10 w-10 bg-white rounded-full p-2 border-gray-200 border-[1px]"
          />
          <div>
           
            <h2 className="dark:text-white font-bold text-xl capitalize">
              {linkName}
            </h2>
            <div>
              <a
                href={`https://${shortLink}`}
                target="_blank"
                className="text-blue text-base hover:underline "
              >
                {shortLink}
              </a>
            </div>
            <div className="overflow-hidden w-full">
              <a
                href={originalUrl}
                target="_blank"
                className="dark:text-white text-base block hover:underline w-full whitespace-nowrap  "
              >
                {originalUrl}
              </a>
            </div>
            <div className="flex gap-2 mt-4 ">
              <IoStatsChartSharp className="dark:text-white cursor-pointer" />
              <div className="dark:text-white flex  justify-center items-center cursor-pointer">
                <CiCalendar />
                {Date}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="  flex justify-end p-2 sm:p-4  gap-3 flex-wrap ">
        <button
          className="p-1 border-[1px]
         h-10 w-24   border-gray-200 flex gap-2 dark:bg-white rounded-md font-bold justify-center 
         items-center transition transform ease-in-out duration-700 hover:scale-110"
        >
          <MdContentCopy />
          <span>Copy</span>
        </button>
        <button
          className="p-1
         border-[1px] h-10 w-24  border-gray-200 flex gap-2
          dark:bg-white rounded-md font-bold justify-center items-center
          transition transform ease-in-out duration-700 hover:scale-110"
        >
          <IoMdShare />
          <span>Share</span>
        </button>
        <button
          className="p-1 border-[1px] h-10 w-10 sm:w-24
         border-gray-200 text-red-600 flex  gap-2 dark:bg-white rounded-md
          font-bold justify-center items-center transition transform ease-in-out duration-700 hover:scale-110"
        >
          <MdDelete className="text-2xl lg:text-xl " />
          <span className="hidden sm:block">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default LinkCard;