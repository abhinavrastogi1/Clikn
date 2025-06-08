import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./Component/Landing/LandingPage.jsx";
import Login from "./Component/Login/Login.jsx";
import Home from "./Component/Home/Home.jsx";
import Links from "./Component/Link/Links.jsx";
import QrCodes from "./Component/QrCode/QrCodes.jsx";
import Analytics from "./Component/Analytics/Analytics.jsx";
import store from "./Store/index.js";
import { Provider } from "react-redux";
import LandingPageApp from "./Component/Landing/LandingPageApp.jsx";
import NotFound from "./Component/NotFound/NotFound.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageApp />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Login /> },
    ],
  },
  {
    path: "/home",
    element: <App />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/home/links", element: <Links /> },
      { path: "/home/qrcodes", element: <QrCodes /> },
      { path: "/home/analytics", element: <Analytics /> },
    ],
  },{
    path:"*",
    element:<NotFound/>
  }
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="280979623482-3rgbmvo5eljje6k8o43acd2cssmqhcqv.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </Provider>
);
