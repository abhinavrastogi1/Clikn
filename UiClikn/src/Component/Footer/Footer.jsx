import React from "react";
import { useNavigate } from "react-router-dom";
import instagramIcon from "../../assets/instagramIcon.svg"
import linkedinIcon from "../../assets/linkedinIcon.svg"
function Footer() {
  const navigate=useNavigate()
  return (
    <footer
      className="footer  text-neutral-content items-center p-4 flex justify-between
    px-2 sm:px-10 md:px-16 lg:px-20 xl:px-36 mt-6
    shadow-xl
    dark:shadow-white
    bg-[#f5f3f1] dark:bg-slate-900"
    >
      <div className="w-full">
        <aside className="flex items-center justify-between w-full">
          <img
            src="/cliknLogo.png"
            className="h-10 w-20 sm:h-16 sm:w-32"
            alt="clikn Logo"
            role="button"
            onClick={()=>{
              navigate("/")
            }}
          />
          <nav className="flex gap-4 md:place-self-center md:justify-self-end  ">
          <a
                href="https://www.instagram.com/abh.inav_ras.togi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline shadow-md rounded-md dark:shadow-white bg-white
              hover:-translate-y-3 duration-500 ease-in-out 
              "
              >
                <img
                  src={instagramIcon}
                  alt="instagram Icon"
                  className="h-10 w-10 "
                />
              </a>
          <a
                href="https://www.linkedin.com/in/abhinav-rastogi-a664612a3/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline shadow-md rounded-md dark:shadow-white bg-white
              hover:-translate-y-3 duration-500 ease-in-out 
              "
              >
                <img
                  src={linkedinIcon}
                  alt="instagram Icon"
                  className="h-10 w-10 "
                />
              </a>
          </nav>
        </aside>
        <p className="w-full text-center font-bold text-lg md:text-xl dark:text-white">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
