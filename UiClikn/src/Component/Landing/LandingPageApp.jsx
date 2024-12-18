import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { verifyLogin } from "../../Store/Api/LoginApiActions/loginApiSlice.js";
function LandingPageApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.loginSlice);
  const { status } = useSelector((state) => state.LoginApiSlice);
  const [showLandingPage, setShowLandingPage] = useState(false);
  useEffect(() => {
    setShowLandingPage(false);
    if (!loggedIn) {
      dispatch(verifyLogin());
    }
    if (status === "success") {
      navigate("/home");
    }
    setShowLandingPage(true);
  }, []);

  return <>{showLandingPage && <Outlet />}</>;
}

export default LandingPageApp;
