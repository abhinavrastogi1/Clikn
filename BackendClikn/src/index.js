import { Connect_DB } from "./DB/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
async function startServer() {
  try {
    await Connect_DB();
    app.get("/", (req, res) => {
      res.status(302).redirect("https://app.clikn.in");
    });
    app.listen(port, "0.0.0.0",() => {
      console.log("your server is running at Port no:", port);
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log("mongoDb connection Failed", error);
  }
}
startServer();
