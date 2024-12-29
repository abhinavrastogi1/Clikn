import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import browser from "../../assets/browser.png";
import QRCode from "react-qr-code";
import { deleteLinkCall } from "../../Store/Api/DeleteAPiActions/deleteLinkSlice";
import { QRCodeCanvas } from "qrcode.react";

import { useDispatch } from "react-redux";
import { GiCheckMark } from "react-icons/gi";
import { IoCopy } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import linkedinIcon from "../../assets/linkedinIcon.svg";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import twitterIcon from "../../assets/twitterIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";
import DeleteLink from "../Link/DeleteLink";
import { setShortLink } from "../../Store/Api/ShortLinkActions/createShortLinkSlice";
import { useNavigate } from "react-router-dom";
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
  const shareUrl = `https://${shortLink}`;
  const [showShareIcons, setShowShareIcons] = useState(false);
  const shareRef = useRef();
  const shareButtonRef = useRef();
  const navigate = useNavigate();
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
  const qrCodeRef = useRef();
  function downloadQRCode() {
    if (qrCodeRef.current) {
      const svgString = new XMLSerializer().serializeToString(
        qrCodeRef.current
      );
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${linkData?.shortId}QRCode.png`;
      link.click();
    }
    // const canvas = document.querySelector("#qrcode-canvas");
    // if (!canvas) throw new Error("<canvas> not found in the DOM");
    // const newWidth = 200; // Change this to your desired width
    // const newHeight = 200; // Change this to your desired height

    // canvas.width = newWidth;
    // canvas.height = newHeight;

    // // Optionally, you can also scale the content (QR code) if needed
    // const context = canvas.getContext("2d");
    // if (context) {
    //   context.scale(newWidth / canvas.width, newHeight / canvas.height); // Scale the QR code content if necessary
    // }
    // const pngUrl = canvas
    //   .toDataURL("image/png")
    //   .replace("image/png", "image/octet-stream");
    // const downloadLink = document.createElement("a");
    // downloadLink.href = pngUrl;
    // downloadLink.download = "QR code.png";
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);
  }
  const [deleteLink, setDeleteLink] = useState(false);

  return (
    <div className=" grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 dark:bg-slate-800  shadow-2xl dark:shadow-lg dark:shadow-gray-700 rounded-md ">
      <div className=" row-span-2 sm:col-span-2 sm:row-span-1  overflow-hidden p-4 pb-2 border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-gray-200 ">
        <div className="flex flex-row gap-3  overflow-hidden  ">
          <div className="bg-white  p-1 h-[108px] shadow-lg">
            {" "}
            <QRCode
              value={`https://${shortLink} `}
              size={100}
              ref={qrCodeRef}
            />
            {/* <QRCodeCanvas
              id="qrcode-canvas"
              level="H"
              size={100}
              value={`https://${shortLink} `}
              className="h-full w-auto"
            /> */}
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
            <div className="flex gap-2 mt-4 justify-start items-center ">
              <IoStatsChartSharp
                className="dark:text-white cursor-pointer"
                onClick={() => {
                  dispatch(setShortLink(linkData?.shortId));
                  navigate("/home/analytics");
                }}
              />
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

      <div className="  flex justify-end p-2 pt-4 sm:p-4 sm:pt-8  gap-3 flex-wrap relative">
        <div className="relative h-10 flex  flex-col justify-center items-center">
          {/* Button */}
          <button
            className="p-1 border-[1px]  h-10 w-10 lg:w-24 border-gray-200
         flex gap-2 dark:bg-white rounded-md font-bold justify-center items-center 
         transition transform ease-in-out duration-700 hover:scale-110 lg:hidden"
            onClick={() => {
              copyToClipboard(`https://${shortLink}`);
            }}
          >
            {!copied ? (
              <IoCopyOutline className="text-xl " />
            ) : (
              <IoCopy className="text-xl " />
            )}
          </button>
          <button
            className="p-1 border-[1px] h-10 w-24 border-gray-200  gap-2 dark:bg-white 
      rounded-md font-bold transition transform ease-in-out 
      duration-700 hover:scale-110 z-10 relative hidden lg:block"
            onClick={() => {
              copyToClipboard(`https://${shortLink}`);
            }}
          >
            {!copied ? (
              <div className="flex justify-center items-center">
                {" "}
                <IoCopyOutline />
                <span>Copy</span>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <GiCheckMark />
                <span>Copied</span>
              </div>
            )}
          </button>
        </div>

        <button
          className="p-1 border-[1px]  h-10 w-10 lg:w-24 border-gray-200
         flex gap-2 dark:bg-white rounded-md font-bold justify-center items-center 
         transition transform ease-in-out duration-700 hover:scale-110"
          onClick={() => {
            setShowShareIcons(!showShareIcons);
            setAnimateShare(false);
          }}
          ref={shareButtonRef}
        >
          <IoMdShare className="text-xl  " />
          <span className="hidden lg:block">Share</span>
        </button>

        <button
          className="p-1 border-[1px] h-10 w-10  border-gray-200
          text-red-600 flex  gap-2 dark:bg-white rounded-md font-bold justify-center items-center
           transition transform ease-in-out duration-300 hover:scale-110"
          onClick={() => {
            setDeleteLink(true);
          }}
        >
          <MdDelete className="text-2xl  " />
        </button>
        <button
          className="p-1 border-[1px] h-10 w-10  border-gray-200
           flex  gap-2 dark:bg-white rounded-md font-bold justify-center items-center
           transition transform ease-in-out duration-700 hover:scale-110"
          onClick={downloadQRCode}
        >
          <IoMdDownload className="text-2xl  " />
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

      {deleteLink && <DeleteLink _id={_id} setDeleteLink={setDeleteLink} />}
    </div>
  );
}

export default QrCodeCard;
