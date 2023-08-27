import express, { Express, Request, Response, NextFunction } from "express";
import leetcodeRoutes from "./routes/leetcode-routes";
import usersRoutes from "./routes/users-routes";
import { HttpError } from "./models/http-error";

const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbconfig = require("./db/config");
const url = dbconfig.url;

const app: Express = express();
const port = process.env.PORT || 3002;

// when putting filter on app.use ,it just means the path must start with it, not exactly match it
// will only be sent to middleware if url starts with /api/leetcode/....

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Headers','*')
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*"
    // "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "*"
    // "GET, POST, PATCH, DELETE, PUT"
  );
  next();
});

app.use(express.json());
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/user", usersRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: HttpError = new Error("Could not find this resource");
  error.statusCode = 404;
  return next(error);
});
// error handling
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    // if headers (response has been sent)
    // won't send a response on our own
    return next(error);
  }
  res.status(error.statusCode || 500);
  res.json({
    message:
      error.message ||
      "The server encountered an unexpected condition that prevented it from fulfilling the request",
  });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(port);
  })
  .then(() => {
    console.log("Connected and started");
  })
  .catch((error: HttpError) => console.error("Connection error", error));

// app.listen(port);

// // middleware, all incoming reqs go thru middleware

// // next is used when u dont want to return a response on this middleware
// // but u want to funnel it to the next middleware
// app.use(express.urlencoded({ extended: false }));

// app.post("/user", (req: Request, res: Response) => {
//   res.send("<h1>User:" + req.body.username + "</h1>");
// });

// app.get("/", (req: Request, res: Response) => {
//   res.send(
//     "<form action = '/user' method = 'POST'><input type = 'text' name = 'username'><button>Create User </button> </input></form>"
//   );
// });
