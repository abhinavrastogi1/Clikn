import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { verifyLogin } from "../../Store/Api/LoginApiActions/loginApiSlice";
function LandingPageApp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, showLandingPage } = useSelector(
    (state) => state.loginApiSlice
  );
  useEffect(() => {
    dispatch(verifyLogin());
  }, []);
  useEffect(()=>{
    if(status==="success"){
      navigate("/home")
    }
  })
  return <>{showLandingPage && <Outlet />}</>;
}

export default LandingPageApp;
