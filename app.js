"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leetcode_routes_1 = __importDefault(require("./routes/leetcode-routes"));
const users_routes_1 = __importDefault(require("./routes/users-routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3002;
// when putting filter on app.use ,it just means the path must start with it, not exactly match it
// will only be sent to middleware if url starts with /api/leetcode/....
app.use(express_1.default.json());
app.use("/api/leetcode", leetcode_routes_1.default);
app.use("/api/user", users_routes_1.default);
app.use((req, res, next) => {
    const error = new Error("Could not find this resource");
    error.statusCode = 404;
    return next(error);
});
// error handling
app.use((error, req, res, next) => {
    if (res.headersSent) {
        // if headers (response has been sent)
        // won't send a response on our own
        return next(error);
    }
    res.status(error.statusCode || 500);
    res.json({
        message: error.message ||
            "The server encountered an unexpected condition that prevented it from fulfilling the request",
    });
});
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
