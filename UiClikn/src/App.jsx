import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useGoogleLogin } from "@react-oauth/google";
import "./App.css";
import axios from "axios";
function App() {
  const [count, setCount] = useState(0);

  async function googleResponse(authresult) {
    try {
      if (authresult["code"]) {
        await axios.get("/user/auth", {
          params: {
            code: authresult.code,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  const googlelogin = useGoogleLogin({
    onSuccess: googleResponse,
    onerror: googleResponse,
    flow: "auth-code",
  });

  return (
    <>
      <div className=" h-[100vh] w-full flex justify-center items-center gap-10">
        <button
          className="bg-red-500 text-2xl h-10 w-24 rounded-md text-white"
          onClick={() => {
            googlelogin();
          }}
        >
          {" "}
          Login{" "}
        </button>
        <button
          className="bg-blue-300 text-2xl h-10 rounded-md w-24 text-white"
          onClick={() => {
            googlelogin();
          }}
        >
          {" "}
          logout{" "}
        </button>
      </div>
    </>
  );
}

export default App;
