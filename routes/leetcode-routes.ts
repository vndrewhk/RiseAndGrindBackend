import express, { Express, Request, Response } from "express";
import { HttpError } from ".././models/http-error";
import { getProblemTypeById } from "../controllers/leetcode-controllers";
// obj that u can reg middleware on, and export it
const router = express.Router();

// will have to add ID to the problems eventually

router.get("/:pTypeId", getProblemTypeById);

// export default router;

export default router;
