import React from "react";
import { useNavigate } from "react-router-dom";
import instagramIcon from "../../assets/instagramIcon.svg";
import linkedinIcon from "../../assets/linkedinIcon.svg";
function Footer() {
  const navigate = useNavigate();
  return (
    <footer
      className="footer  text-neutral-content items-center p-4 flex justify-between
    px-2 sm:px-10 md:px-16 lg:px-20 xl:px-36 
    shadow-xl
    dark:shadow-white
    bg-[#f5f3f1] dark:bg-slate-900"
    >
      <div className="w-full flex flex-col gap-3 " >
        <aside className="flex items-center justify-between w-full">
          <img
            src="/cliknLogo.png"
            className="h-10 w-20 sm:h-16 sm:w-32"
            alt="clikn Logo"
            role="button"
            onClick={() => {
              navigate("/home");
            }}
          />
          <nav className="flex gap-4 md:place-self-center md:justify-self-end  ">
            <a
              href="https://www.instagram.com/abh.inav_ras.togi/"
              target="_blank"
              rel="noopener noreferrer"
              className=" shadow-md rounded-md  h-8 w-8 sm:h-10 sm:w-10
              "
            >
              <img
                src={instagramIcon}
                alt="instagram Icon"
                className="h-full w-full "
              />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinav-rastogi-a664612a3/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className=" shadow-md rounded-md h-8 w-8 sm:h-10 sm:w-10
              "
            >
              <img
                src={linkedinIcon}
                alt="instagram Icon"
                className="h-full w-full "
              />
            </a>
          </nav>
        </aside>
        <p className="w-full text-center font-bold text-sm sm:text-lg md:text-xl dark:text-white">
          Copyright © {new Date().getFullYear()} - All rights reserved -
          <a
            href="/privacy-policy.html"
            className="text-blue-500 hover:text-blue-700 underline"
            target="_blank"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
