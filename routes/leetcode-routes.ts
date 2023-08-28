import express, { Express, Request, Response } from "express";
import { HttpError } from ".././models/http-error";
import {
  getProblemTypeById,
  createSolutionById,
  patchSolution,
  deleteSolution,
  getProblems,
  getSolutionById,
} from "../controllers/leetcode-controllers";
// obj that u can reg middleware on, and export it
const router = express.Router();

// will have to add ID to the problems eventually
router.get("/", getProblems);
router.get("/:pTypeId", getProblemTypeById);

router.get("/solution/:solutionId", getSolutionById);
router.post("/", createSolutionById);

router.patch("/:pTypeId/:problemId/:solutionId", patchSolution);
router.delete("/:pTypeId/:problemId", deleteSolution);

// export default router;

// group of problems with identifier attached to it instead of problemTypes
// array of identifiers ["Arrays","DP"], use identifier as index
// type = 0
// array[0]
// sort by date on solution

export default router;
