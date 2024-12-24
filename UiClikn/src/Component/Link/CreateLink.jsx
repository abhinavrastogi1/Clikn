import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShortLinkApi } from "../../Store/Api/ShortLinkActions/createShortLinkSlice";

function CreateLink({ formType, setCreateLink }) {
  const [isUrlWrong, setIsUrlWrong] = useState(false);
  const [url, setUrl] = useState("");
  const [urlTitle, setUrlTitle] = useState("");
  const dispatch = useDispatch();
  function createShortLink(e) {
    e.preventDefault();
    try {
      new URL(url);
      setCreateLink(false);
      dispatch(createShortLinkApi({ originalLink: url, title: urlTitle }));
    } catch (error) {
      console.error(error)
      setIsUrlWrong(true);
    }
  }
  return (
    <div
      className="absolute  top-12 right-0 rounded-md z-50 p-4
  bg-offwhite dark:bg-slate-800 shadow-md dark:shadow-white
   border-[1px] flex flex-col gap-8"
    >
      <div className="flex flex-col gap-4 ">
        <h1 className="dark:text-white text-xl sm:text-2xl font-bold">
          Create a {formType}
        </h1>
        <h3 className="dark:text-white  text-base sm:text-lg font-bold ">
          Destination
        </h3>
        <div>
          {" "}
          <input
            type={url}
            value={url}
            onChange={(e) => {
              setIsUrlWrong(false);
              setUrl(e.target.value);
            }}
            className={`focus:outline-none text-black border-2 
          rounded-md p-2 md:p-3 bg-transparent w-64 sm:w-80 md:w-96  
          ${
            isUrlWrong
              ? "text-red-500 border-red-500"
              : "dark:text-white text-black "
          }`}
            placeholder="https://example.com"
            required
          />
          <div>
            {isUrlWrong && (
              <h2
                className={` text-sm ${
                  isUrlWrong ? "text-red-500" : "text-white"
                }`}
              >
                Please enter a valid URL{" "}
              </h2>
            )}
          </div>
        </div>
        <h3 className="text-base sm:text-lg dark:text-white  font-bold">
          Title(optional)
        </h3>
        <input
          type="text"
          placeholder="Title"
          value={urlTitle}
          onChange={(e) => {
            setUrlTitle(e.target.value);
          }}
          className="focus:outline-none dark:text-white border-2 
          rounded-md p-2 md:p-3 bg-transparent w-64 sm:w-80 md:w-96  
        "
        />
      </div>
      <div className="flex justify-between items-center">
        {" "}
        <button
          className="hover:bg-lightblue dark:text-white duration-1000 rounded-md p-3 font-bold text-lg"
          onClick={() => {
            setCreateLink(false);
          }}
        >
          Cancel
        </button>
        <button
          onClick={createShortLink}
          className="bg-blue p-3 rounded-md font-bold text-lg text-white"
        >
          Create your {formType}
        </button>
      </div>
    </div>
  );
}

export default CreateLink;
