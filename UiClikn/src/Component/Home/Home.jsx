import React from "react";

function Home() {
  return (
    <div className="min-h-screen w-full  text-white px-2 sm:px-10 md:px-16 lg:px-20 xl:px-48   ">
      <div className="px-4 mx-auto  sm:px-6 lg:px-8 ">
        <div className="">
          <h1 className="dark:text-white text-gray-900   mx-2 my-6 sm:my-8   sm:mx-8 md:mx-10 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Your Connections Platform
          </h1>
          <div className="grid dark:bg-slate-800  grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-2 p-6 rounded-md shadow-2xl dark:shadow-lg dark:shadow-gray-700 ">
            <div className=" rounded-xl  grid grid-cols-2  bg-white  border-2 border-gray-300 ">
              <div className=" flex    h-full justify-center items-center bg-slate-200 rounded-tl-md  rounded-bl-md ">
                <div className=" flex h-8 w-36 bg-white justify-center items-center border-2  rounded-tl-md  rounded-bl-md ">
                  <div className="  text-black p-2 rounded-md ">
                    {" "}
                    <h3 className="text-gray-900 text-sm sm:text-lg">
                      clikn.in/link
                    </h3>
                  </div>
                  <img src="/link.png" alt="link img" className="h-6 auto" />
                </div>
              </div>
              <div className="bg-white rounded-md p-1">
                <div className=" flex flex-col justify-center items-center  text-sm sm:text-base gap-2 rounded-md">
                  <h2 className=" text-gray-900">Make it short</h2>
                  <button
                    className="text-blue border-2 text-sm sm:text-base
                border-blue hover:bg-sky-100 rounded-md w-28 sm:w-32 p-1 "
                  >
                    {" "}
                    Go to links
                  </button>
                </div>{" "}
              </div>
            </div>
            <div className=" rounded-xl  grid grid-cols-2  bg-white  border-2 border-gray-300 ">
              <div className=" flex    h-full justify-center items-center bg-slate-200 rounded-tl-md  rounded-bl-md ">
                <div className=" flex h-8 w-36 bg-white justify-center items-center border-2  rounded-tl-md  rounded-bl-md ">
                  <div className="  text-black p-2 rounded-md ">
                    {" "}
                    <h3 className="text-gray-900 text-sm sm:text-lg">
                      clikn.in/code
                    </h3>
                  </div>
                  <img src="/qrcode.png" alt="link img" className="h-6 auto" />
                </div>
              </div>
              <div className="bg-white rounded-md p-1">
                <div className=" flex flex-col justify-center items-center text-sm sm:text-base gap-2 rounded-md">
                  <h2 className=" text-gray-900">Make it scannable</h2>
                  <button
                    className="text-blue border-2 w-28 sm:w-32 p-1
                border-blue hover:bg-sky-100 rounded-md text-sm sm:text-base "
                  >
                    {" "}
                    Go to codes
                  </button>
                </div>{" "}
              </div>
            </div>
            <div className=" rounded-xl  grid grid-cols-2  bg-white  border-2 border-gray-300 ">
              <div className=" flex    h-full justify-center items-center bg-slate-200 rounded-tl-md  rounded-bl-md ">
                <div className=" flex h-8 w-36 bg-white justify-center items-center border-2  rounded-tl-md  rounded-bl-md ">
                  <div className="  text-black p-2 rounded-md ">
                    {" "}
                    <h3 className="text-gray-900  text-sm sm:text-lg">
                      clikn.in/data
                    </h3>
                  </div>
                  <img
                    src="/anlaytics.png"
                    alt="link img"
                    className="h-6 auto"
                  />
                </div>
              </div>
              <div className="bg-white rounded-md p-1">
                <div className=" flex flex-col justify-center items-center gap-2  text-sm sm:text-base rounded-md">
                  <h2 className=" text-gray-900">Make it data-driven</h2>
                  <button
                    className="text-blue border-2 w-28 sm:w-32 p-1
                border-blue hover:bg-sky-100 rounded-md text-sm sm:text-base "
                  >
                    {" "}
                    Go to analytics
                  </button>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
