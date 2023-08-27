"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbconfig = require("./config");
const url = dbconfig.url;
console.log(dbconfig.url);
mongoose
    .connect(url)
    .then(console.log("connected"))
    .catch((error) => console.error("Connection error", error.message));
