import express from "express";
import { Connect_DB } from "./DB/index.js";
const app = express();
app.get("/", (req, res) => {
  res.json({
    hello: 1,
  });
});
const port = process.env.PORT || 3000;

async function startServer() {
    try {
      await Connect_DB();
      app.listen(port, () => {
        console.log("your server is running at Port no:", port);
        console.log(`http://localhost:${port}`);
      });
    } catch (error) {
      console.log("mongoDb connection Failed", error);
    }
  }
  startServer();
  