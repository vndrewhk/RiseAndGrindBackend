import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import leetcodeRoutes from "./routes/leetcode-routes";
import usersRoutes from "./routes/users-routes";
const app: Express = express();
const port = process.env.PORT || 3002;

// when putting filter on app.use ,it just means the path must start with it, not exactly match it
// will only be sent to middleware if url starts with /api/leetcode/....
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/user",usersRoutes)

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
