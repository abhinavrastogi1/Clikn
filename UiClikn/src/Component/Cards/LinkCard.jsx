import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { IoStatsChartSharp } from "react-icons/io5";
import browser from "../../assets/browser.png";
import { deleteLinkCall } from "../../Store/Api/DeleteAPiActions/deleteLinkSlice.js";
import { useDispatch } from "react-redux";
import { GiCheckMark } from "react-icons/gi";
import { IoCopyOutline } from "react-icons/io5";
import linkedinIcon from "../../assets/linkedinIcon.svg";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import twitterIcon from "../../assets/twitterIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";
import DeleteLink from "../Link/DeleteLink.jsx";
import { setShortLink } from "../../Store/Api/ShortLinkActions/createShortLinkSlice.js";
import { useNavigate } from "react-router-dom";
function LinkCard({ linkData }) {
  const originalUrl = linkData?.originalLink;
  const shortLink = `clikn.in/${linkData?.shortId}`;
  const title = linkData?.title;
  const date = new Date(linkData?.createdAt);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const [urlLogo, seturlLogo] = useState(`${originalUrl}/favicon.ico`);
  const _id = linkData?._id;
  const [copied, setShowCopied] = useState(false);
  const dispatch=useDispatch()
   const navigate =useNavigate()
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
  const shareUrl = `https://${shortLink}`;
  const [showShareIcons, setShowShareIcons] = useState(false);
  const shareRef = useRef();
  const shareButtonRef = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        shareRef.current &&
        !shareRef.current.contains(e.target) &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(e.target)
      ) {
        setShowShareIcons(false);
        setAnimateShare(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [animateshare, setAnimateShare] = useState(false);
  useEffect(() => {
    if (showShareIcons) {
      setTimeout(() => {
        setAnimateShare(true);
      }, 100);
    }
  }, [showShareIcons]);
  const [deleteLink, setDeleteLink] = useState(false);

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
              {title || "No Title"}
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
            <div className="flex gap-2 mt-4 justify-start items-center ">
              <IoStatsChartSharp className="dark:text-white cursor-pointer" onClick={()=>{
                dispatch(setShortLink(linkData?.shortId))
                navigate("/home/analytics")
              }}/>
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

      <div className="  flex justify-end p-2 sm:p-4  gap-3 flex-wrap relative ">
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
            {!copied ? (
              <div className="flex justify-center items-center gap-1">
                {" "}
                <IoCopyOutline />
                <span>Copy</span>
              </div>
            ) : (
              <div className="flex gap-1 justify-center items-center">
                <GiCheckMark />
                <span>Copied</span>
              </div>
            )}
          </button>
        </div>

        <button
          className="p-1
         border-[1px] h-10 w-24  border-gray-200 flex gap-2
          dark:bg-white rounded-md font-bold justify-center items-center
          transition transform-all ease-in-out duration-700 hover:scale-110"
          onClick={() => {
            setShowShareIcons(!showShareIcons);
            setAnimateShare(false);
          }}
          ref={shareButtonRef}
        >
          <IoMdShare />
          <span>Share</span>
        </button>
        <button
          className="p-1 border-[1px] h-10 w-10 sm:w-24
         border-gray-200 text-red-600 flex  gap-2 dark:bg-white rounded-md
          font-bold justify-center items-center transition transform ease-in-out duration-700 hover:scale-110"
          onClick={() => {
            setDeleteLink(true);
          }}
        >
          <MdDelete className="text-2xl lg:text-xl " />
          <span className="hidden sm:block">Delete</span>
        </button>
        {showShareIcons && (
          <div
            className={`absolute  bg-offwhite shadow-lg dark:shadow-md dark:shadow-white dark:bg-slate-800
        border-[1px]
         top-16 sm:top-20  z-50 p-7 rounded-md items-center justify-center 
          transition transform duration-700 ease-in-out ${
            animateshare ? "scale-100" : "scale-0"
          }
          origin-top-right `}
            ref={shareRef}
          >
            <div className="flex gap-4 w-full sm:flex-col lg:flex-row justify-center items-center">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline shadow-md rounded-md dark:shadow-white bg-white
              hover:-translate-y-3 duration-500 ease-in-out 
              "
              >
                <img
                  src={twitterIcon}
                  alt="whatsapp Icon"
                  className="h-10 w-10 "
                />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline shadow-md rounded-md dark:shadow-white bg-white
                            hover:-translate-y-3 duration-500 ease-in-out 
 "
              >
                <img
                  src={facebookIcon}
                  alt="whatsapp Icon"
                  className="h-10 w-10"
                />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  ` ${shareUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:underline shadow-md rounded-md dark:shadow-white bg-white
                            hover:-translate-y-3 duration-500 ease-in-out 
"
              >
                <img
                  src={whatsappIcon}
                  alt="whatsapp Icon"
                  className="h-10 w-10"
                />
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline shadow-md rounded-md dark:shadow-white bg-white 
                            hover:-translate-y-3 duration-500 ease-in-out 
"
              >
                <img
                  src={linkedinIcon}
                  className="h-10 w-10"
                  alt="linkedin Icon"
                />{" "}
              </a>
            </div>
          </div>
        )}
      </div>
      {deleteLink && <DeleteLink _id={_id}  setDeleteLink={setDeleteLink}/>}
    </div>
  );
}

export default LinkCard;
