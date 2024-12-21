import React from "react";
import ReactDOM from "react-dom";
import { RemoveScroll } from "react-remove-scroll";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

function ShareCard() {
  return ReactDOM.createPortal(
    // <RemoveScroll>
    //   <div
    //     className="min-h-screen min-w-screen inset-0 flex justify-center items-center absolute 
    //     bg-opacity-50
    //    bg-black  z-20 "
    //   >
    //     <div className="h-96 w-96 bg-white  z-30">
    //       dfdk
    //     </div>
    //   </div>
    // </RemoveScroll>,
    document.body
  );
}

export default ShareCard;
