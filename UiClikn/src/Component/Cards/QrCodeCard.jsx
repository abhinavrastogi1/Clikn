import React from "react";
import { MdDelete } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
function QrCodeCard() {
  const urlLogo = "https://www.youtube.com/favicon.ico";
  const originalUrl =
    "https://youtubessssssssssssssssssssssssssssssssssssssssssssssssssssssssss.com";
  const shortLink = "clikn.in/qwerte";
  const Date = "24 Dec 2024";
  const linkName = "youtube";
  const qrCodeLink = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://clikn.in/add`;

  return (
    <div className=" grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 dark:bg-slate-800  shadow-2xl dark:shadow-lg dark:shadow-gray-700 rounded-md ">
      <div className=" row-span-2 sm:col-span-2 sm:row-span-1  overflow-hidden p-4 pb-2 border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-gray-200 ">
        <div className="flex flex-row gap-3  overflow-hidden">
          <img
            src={qrCodeLink}
            alt="qrcode"
            className=" h-24 w-24 bg-white  p-1 rounded-sm shadow-md border-gray-200 border-[1px]"
          />
          <div>
            <div className="m-2 ml-0">
              <img
                src={urlLogo}
                alt=""
                className=" h-10 w-10 bg-white rounded-full p-2 border-gray-200 border-[1px]"
              />
            </div>
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
            <div className="block overflow-hidden  max-w-32 sm:max-w-60 md:max-w-64 lg:max-w-96">
              <a
                href={originalUrl}
                target="_blank"
                className="dark:text-white text-base  hover:underline whitespace-nowrap  
                block overflow-hidden text-ellipsis  w-full"
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

      <div className="  flex justify-end p-2 pt-4 sm:p-4 sm:pt-8  gap-3 flex-wrap ">
        <button
          className="p-1 border-[1px] h-10 w-10 lg:w-24   border-gray-200 flex gap-2 dark:bg-white rounded-md font-bold justify-center 
        items-center transition transform ease-in-out duration-700 hover:scale-110"
        >
          <MdContentCopy className="text-xl  " />
          <span className="hidden lg:block">Copy</span>
        </button>
        <button
          className="p-1 border-[1px]  h-10 w-10 lg:w-24 border-gray-200
         flex gap-2 dark:bg-white rounded-md font-bold justify-center items-center transition transform ease-in-out duration-700 hover:scale-110"
        >
          <IoMdShare className="text-xl  " />
          <span className="hidden lg:block">Share</span>
        </button>
        <button
          className="p-1 border-[1px] h-10 w-10  border-gray-200
          text-red-600 flex  gap-2 dark:bg-white rounded-md font-bold justify-center items-center
           transition transform ease-in-out duration-700 hover:scale-110"
        >
          <MdDelete className="text-2xl  " />
        </button>
        <button
          className="p-1 border-[1px] h-10 w-10  border-gray-200
           flex  gap-2 dark:bg-white rounded-md font-bold justify-center items-center
           transition transform ease-in-out duration-700 hover:scale-110"
        >
          <IoMdDownload className="text-2xl  " />
        </button>
      </div>
    </div>
  );
}

export default QrCodeCard;