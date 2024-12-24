import React, { useEffect } from "react";
import "./App.css";
import Footer from "./Component/Footer/Footer.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MainHeader from "./Component/Header/MainHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addUrl,
  verifyLogin,
} from "./Store/Api/LoginApiActions/loginApiSlice.js";
import { createShortLinkApi } from "./Store/Api/ShortLinkActions/createShortLinkSlice.js";
function App() {
  const { loggedIn } = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, formUrl } = useSelector((state) => state.loginApiSlice);
  const location = useLocation();
  useEffect(() => {
    if (!loggedIn) {
      dispatch(verifyLogin());
    }
    if (formUrl) {
      dispatch(createShortLinkApi({ originalLink: formUrl }));
      dispatch(addUrl(""));
    }
  }, []);
  useEffect(() => {
    if (status === "error") {
      navigate("/login");
    } else if (status === "success") {
      navigate(`${location.pathname}`);
    }
  }, [status]);
  return (
    <>
      {loggedIn && (
        <div className="  relative  bg-[#fffff4] dark:bg-DB  ">
          <MainHeader />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
}
export default App;
