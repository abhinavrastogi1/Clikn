import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { IoStatsChartSharp } from "react-icons/io5";
import browser from "../../assets/browser.png";
import ShareCard from "./ShareCard.jsx";
import { deleteLinkCall } from "../../Store/Api/DeleteAPiActions/deleteLinkSlice.js";
import { useDispatch } from "react-redux";
import { GiCheckMark } from "react-icons/gi";
import { IoCopyOutline } from "react-icons/io5";
function LinkCard({ linkData }) {
  const originalUrl = linkData?.originalLink;
  const shortLink = `clikn.in/${linkData?.shortId}`;
  const title = linkData?.title;
  const date = new Date(linkData?.createdAt);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const [urlLogo, seturlLogo] = useState(`${originalUrl}/favicon.ico`);
  const [showShareComponent, setShareComponent] = useState(false);
  const _id = linkData?._id;
  const dispatch = useDispatch();
  const [copied, setShowCopied] = useState(false);

  const copyToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className=" grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 dark:bg-slate-800  shadow-2xl dark:shadow-lg dark:shadow-gray-700 rounded-md relative">
      <div className=" row-span-2 sm:col-span-2 sm:row-span-1  overflow-hidden p-4 pb-2 border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-gray-200 ">
        <div className="flex flex-row gap-3  overflow-hidden">
          <img
            src={urlLogo}
            alt="urlLogo"
            onError={() => {
              seturlLogo(browser);
            }}
            className=" h-10 w-10 bg-white rounded-full p-1 border-gray-200 border-[1px]"
          />
          <div>
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
            <div className="overflow-hidden w-full">
              <a
                href={originalUrl}
                target="_blank"
                className="dark:text-white text-base block hover:underline w-full whitespace-nowrap  "
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

      <div className="  flex justify-end p-2 sm:p-4  gap-3 flex-wrap ">
        <div className="relative h-10 flex  flex-col justify-center items-center">
          {/* Button */}
          <button
            className="p-1 border-[1px] h-10 w-24 border-gray-200 flex gap-2 dark:bg-white 
      rounded-md font-bold justify-center items-center transition transform ease-in-out 
      duration-700 hover:scale-110 z-10 relative"
            onClick={() => {
              copyToClipboard(`https://${shortLink}`);
            }}
          >
           { !copied?
          <div className="flex justify-center items-center gap-1"> <IoCopyOutline />
            <span>Copy</span></div>:<div className="flex gap-1 justify-center items-center"><GiCheckMark/><span>Copied</span></div>}
          </button>
        </div>

        <button
          className="p-1
         border-[1px] h-10 w-24  border-gray-200 flex gap-2
          dark:bg-white rounded-md font-bold justify-center items-center
          transition transform-all ease-in-out duration-700 hover:scale-110"
        >
          <IoMdShare />
          <span>Share</span>
        </button>
        <button
          className="p-1 border-[1px] h-10 w-10 sm:w-24
         border-gray-200 text-red-600 flex  gap-2 dark:bg-white rounded-md
          font-bold justify-center items-center transition transform ease-in-out duration-700 hover:scale-110"
          onClick={() => {
            dispatch(deleteLinkCall(_id));
          }}
        >
          <MdDelete className="text-2xl lg:text-xl " />
          <span className="hidden sm:block">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default LinkCard;
