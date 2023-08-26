import express, { Express, Request, Response } from "express";
import { HttpError } from ".././models/http-error";
import {
  getProblemTypeById,
  createSolutionById,
  patchSolution,
  deleteSolution,
  getProblems,
} from "../controllers/leetcode-controllers";
// obj that u can reg middleware on, and export it
const router = express.Router();

// will have to add ID to the problems eventually
router.get("/", getProblems);
router.get("/:pTypeId/", getProblemTypeById);

router.post("/:pTypeId/:problemId", createSolutionById);

router.patch("/:pTypeId/:problemId/:solutionId", patchSolution);
router.delete("/:pTypeId/:problemId", deleteSolution);

// export default router;

export default router;
