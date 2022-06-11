import nodeCron from "node-cron";
import { UserModel } from "*/models/user.model";

const task = nodeCron.schedule(
  "00 50 08 * * *",
  async () => {
    console.log("cron starting. . .");
    const result = await UserModel.cancelService();
    console.log(result);
  },
  {
    scheduled: true,
    timezone: "Asia/Bangkok",
  }
);

exports.cronStart = function cronJobFunction(req, res, next) {
  task.start();
};
