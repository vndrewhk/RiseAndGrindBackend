import { HttpError } from "../models/http-error";

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const dbconfig = require("./config");
const url = dbconfig.url;
console.log(dbconfig.url);

mongoose
  .connect(url)
  .then(console.log("connected"))
  .catch((error: HttpError) =>
    console.error("Connection error", error.message)
  );
