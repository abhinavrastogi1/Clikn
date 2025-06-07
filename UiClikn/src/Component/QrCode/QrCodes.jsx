import React, { useEffect, useRef, useState } from "react";
import QrCodeCard from "../Cards/QrCodeCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserLinkApi } from "../../Store/Api/ShortLinkActions/getUserLinksSlice.js";
import CreateLink from "../Link/CreateLink.jsx";
function QrCodes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserLinkApi());
  }, []);
  const { userlinks } = useSelector((state) => state.getUserLinkSlice);
  const [createQr, setCreateQR] = useState(false);
  const createQRRef = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (createQRRef.current && !createQRRef.current.contains(e.target)) {
        setCreateQR(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return ( 
    <div className="min-h-screen  px-2 sm:px-10 md:px-20 lg:px-30 xl:px-36  mb-6 ">
      <div className="px-4 mx-auto  sm:px-6 lg:px-8 ">
        <div className="flex justify-between    my-6 sm:my-8 p-4   px-4 mx-auto  sm:px-6 lg:px-8  border-b-[1px] border-gray-200">
          <h1 className="dark:text-white text-gray-900  content-center  text-xl  md:text-3xl lg:text-4xl font-bold">
            QR Codes
          </h1>
          <div className="relative" ref={createQRRef}>
            <button className="bg-blue  w-28 h-10 sm:w-28 p-2 sm:h-10 text-white rounded-md 
             transition transform ease-in-out duration-700 hover:scale-110 "
             onClick={() => {
              setCreateQR(!createQr);
            }}
             >
              Create Code
            </button>
            {createQr && (
              <CreateLink formType="link" setCreateLink={setCreateQR} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {userlinks?.map((linkData) => (
            <QrCodeCard linkData={linkData} key={linkData?.shortId} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QrCodes;
