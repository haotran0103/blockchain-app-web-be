const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connection = require("./src/configs/configsDatabase");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
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
