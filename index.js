const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("./src/configs/configsDatabase");
const moment = require("moment");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === "production";
app.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).send();
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require("./src/apiv1/routers/routes");
routes(app);

app.options("*", cors());
app.use(helmet());
const updateExpiredRecords = async () => {
  const currentDate = moment().format("YYYY-MM-DD"); // get current date
  const records = await db.query(
    "SELECT * FROM project WHERE ngayHetHan <= ?",
    [currentDate]
  ); // get all records with expiration_date equals to current date
  for (const record of records) {
    await db.query("UPDATE project SET trangThai = 1 WHERE id = ?", [record.id]); // update status to 1 for each record
  }
};

// schedule the cron job to run every day at midnight
const CronJob = require("cron").CronJob;
const job = new CronJob("0 0 0 * * *", updateExpiredRecords);
job.start();
app.get("/", (req, res) => {
  res.json({
    message: "trang chủ",
  });
});

app.get("*", (req, res) => {
  res.json({
    message: "not found",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
