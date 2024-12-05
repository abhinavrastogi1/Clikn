import asyncHandler from "../Utils/asyncHandler.js";
import { google } from "googleapis";
const auth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);
const userRegistration = asyncHandler(async (req, res) => {
  const { code } = req?.query;
  const googleRes = await auth2Client.getToken(code);
  auth2Client.setCredentials(googleRes.tokens);
  const userRes = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Convert the ReadableStream into JSON
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    });
  console.log(userRes);
  res.json({ req: "success" });
});
export { userRegistration };
