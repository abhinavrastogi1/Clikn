import React from "react";
import LinkCard from "../Cards/LinkCard";

function Links() {
  return (
    <div className="min-h-screen  px-2 sm:px-10 md:px-20 lg:px-30 xl:px-48  ">
      <div className="px-4 mx-auto  sm:px-6 lg:px-8">
        <div className="flex justify-between    my-6 sm:my-8 p-4   px-4 mx-auto  sm:px-6 lg:px-8  border-b-[1px] border-gray-200">
          <h1 className="dark:text-white text-gray-900  content-center  text-xl  md:text-3xl lg:text-4xl font-bold">
            Clikn Links
          </h1>
          <button className="bg-blue   w-24 h-10 sm:w-28 p-2 sm:h-10 text-white rounded-md  transition transform ease-in-out duration-700 hover:scale-110">
            Create link
          </button>
        </div>
        <div className="flex flex-col gap-10">
          <LinkCard />
          <LinkCard />
          <LinkCard />
          <LinkCard />
        </div>
      </div>
    </div>
  );
}

export default Links;
