import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import leetcodeRoutes from "./routes/leetcode-routes";
import usersRoutes from "./routes/users-routes";
import { ExpressError } from "./models/http-error";
const app: Express = express();
const port = process.env.PORT || 3002;



// when putting filter on app.use ,it just means the path must start with it, not exactly match it
// will only be sent to middleware if url starts with /api/leetcode/....
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/user", usersRoutes);

// error handling
app.use(
  (error: ExpressError, req: Request, res: Response, next: NextFunction) => {
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
  }
);

app.listen(port);

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
