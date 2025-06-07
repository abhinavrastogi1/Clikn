import React, { useEffect, useRef, useState } from "react";
import LinkCard from "../Cards/LinkCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserLinkApi } from "../../Store/Api/ShortLinkActions/getUserLinksSlice";
import CreateLink from "./CreateLink.jsx";
function Links() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserLinkApi());
  }, []);
  const { userlinks } = useSelector((state) => state.getUserLinkSlice);
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
    <div className="min-h-screen  px-2 sm:px-10 md:px-16 lg:px-20 xl:px-36 relative mb-6">
      <div className="px-4 mx-auto  sm:px-6 lg:px-8">
        <div className="flex justify-between    my-6 sm:my-8 p-4   px-4 mx-auto  sm:px-6 lg:px-8  border-b-[1px] border-gray-200">
          <h1 className="dark:text-white text-gray-900  content-center  text-xl  md:text-3xl lg:text-4xl font-bold">
            Clikn Links
          </h1>
          <div className="relative" ref={createLinkRef}>
            {" "}
            <button
              className="bg-blue  w-24 h-10 
            sm:w-28 p-2 sm:h-10 text-white rounded-md 
             transition transform ease-in-out duration-700 hover:scale-110"
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
        <div className="flex flex-col gap-10">
          {userlinks?.map((linkData) => (
            <LinkCard linkData={linkData} key={linkData?.shortId} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Links;
