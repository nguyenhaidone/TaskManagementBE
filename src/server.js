import express from "express";
import cors from "cors";
import { connectDB, corsOptions } from "*/config/configuration";
// import { env } from '*/config/environment'
import { api } from "*/routes/v1";
import { cronStart } from "*/utils/cronJob";

connectDB()
  .then(() => {
    console.log("Connect database successfully");
  })
  .then(() => {
    bootServer();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

const bootServer = () => {
  const app = express();
  /**
   * !use cors configuration
   */
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    );
    next();
  });
  /**
   * !Enable req.body data
   */
  app.use(express.json());
  /**
   * !Use APIs
   */
  app.use("/v1", api);
  /**
   * !use cronjob configuration
   */
  app.use(cronStart);

  app.listen(process.env.PORT, () => {
    console.log("Start successfully, listening on port " + process.env.PORT);
  });
  // app.listen(env.PORT, env.HOSTNAME, () => {
  //   console.log('Start successfully, listening on port ' + env.PORT)
  // })
};
