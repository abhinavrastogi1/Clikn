import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import browser from "../../assets/browser.png";
import QRCode from "react-qr-code";
import { deleteLinkCall } from "../../Store/Api/DeleteAPiActions/deleteLinkSlice";
import { useDispatch } from "react-redux";

function QrCodeCard({ linkData }) {
  const originalUrl = linkData?.originalLink;
  const shortLink = `clikn.in/${linkData?.shortId}`;
  const title = linkData?.title;
  const date = new Date(linkData?.createdAt);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const [urlLogo, seturlLogo] = useState(`${originalUrl}/favicon.ico`);
  const _id = linkData?._id;

  const dispatch = useDispatch();

  return (
    <div className=" grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 dark:bg-slate-800  shadow-2xl dark:shadow-lg dark:shadow-gray-700 rounded-md ">
      <div className=" row-span-2 sm:col-span-2 sm:row-span-1  overflow-hidden p-4 pb-2 border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-gray-200 ">
        <div className="flex flex-row gap-3  overflow-hidden  ">
          <div className="bg-white  p-1 h-[108px] shadow-lg">
            {" "}
            <QRCode value={`https://${shortLink} `} size={100} />
          </div>
          <div>
            <div className="m-2 ml-0">
              <img
                src={urlLogo}
                alt="urlLogo"
                onError={() => {
                  seturlLogo(browser);
                }}
                className=" h-10 w-10 bg-white rounded-full p-1 border-gray-200 border-[1px]"
              />
            </div>
            <h2 className="dark:text-white font-bold text-xl capitalize">
              {title}
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
            <div className="flex gap-2 mt-4 justify-center items-center ">
              <IoStatsChartSharp className="dark:text-white cursor-pointer" />
              <div className="dark:text-white flex  justify-center items-center cursor-pointer">
                <CiCalendar className="font-bold  text-xl " />
                <span className="mt-1">
                  {" "}
                  {month} {day} {year}
                </span>
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
          onClick={() => {
            dispatch(deleteLinkCall(_id));
          }}
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
