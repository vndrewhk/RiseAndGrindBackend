import express, { Express, Request, Response } from "express";
import { HttpError } from ".././models/http-error";
import { getUserById } from "../controllers/users-controller";
// obj that u can reg middleware on, and export it
const router = express.Router();

// will have to add ID to the problems eventually



router.get("/:userpId", getUserById);

// export default router;

export default router;
