import express from "express";
import { mapOrder } from "./utils/common.js";

const app = express();

const hostname = "localhost";
const port = 8080;

app.get("/", (req, res) => {
  res.end("Something");
});

app.listen(port, hostname, () => {
  console.log("Start successfully, listening on port " + port);
});
