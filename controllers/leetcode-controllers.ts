import express, { Express, NextFunction, Request, Response } from "express";
import { HttpError, HttpErrorConstructor } from ".././models/http-error";
import { v4 as uuidv4 } from "uuid";
import { test } from "node:test";
import { SolutionDocument, solutionModel } from "../models/solution";
import mongoose, { Document } from "mongoose";
import { problemModel } from "../models/problem";

let testItems = [
  {
    pTypeId: "1",
    problemType: "Arrays & Hashing",
    problems: [
      {
        // needs id
        id: "1",
        solved: false,
        name: "Contains Duplicate",
        difficulty: "Easy",
        solutions: [
          {
            user: "Andrew",
            userId: "123",
            ytUrl: "https://www.bing.ca/",
            description: "ABC",
            solutionId: "1",
          },
        ],
      },
      {
        id: "2",
        solved: false,
        name: "Contains Duplicate 2",
        difficulty: "Easy",
        solutions: [
          {
            user: "Andrew",
            userId: "123",
            ytUrl: "https://www.bing.ca/",
            description: "ABC",
            solutionId: "1",
          },
        ],
      },
    ],
  },
  {
    pTypeId: "2",
    problemType: "Stacks",
    problems: [
      {
        id: "3",
        solved: false,
        name: "Contains Duplicate",
        difficulty: "Easy",
        solutions: [
          {
            user: "Andrew",
            userId: "123",
            ytUrl: "https://www.bing.ca/",
            description: "ABC",
            solutionId: "1",
          },
        ],
      },
      {
        id: "4",
        solved: false,
        name: "Contains Duplicate 2",
        difficulty: "Easy",
        solutions: [
          {
            user: "Andrew",
            userId: "123",
            ytUrl: "https://www.bing.ca/",
            description: "ABC",
            solutionId: "1",
          },
        ],
      },
    ],
  },
];

export let getProblems = (req: Request, res: Response, next: NextFunction) => {
  return next(HttpErrorConstructor("Could not find solution", 500));
};

export let getProblemTypeById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const problemTypeId: String = req.params.pTypeId;
  console.log("got req in LC");
  console.log(problemTypeId);

  // by using || {}, we force an empty object to be returned if the returned val is falsey, ie undefined or empty
  const problemList: object = testItems.find(
    (problemType) => problemType.pTypeId === problemTypeId
  )!;
  if (!problemList) {
    const error: HttpError = new Error(
      "Could not find a problem type with specified ID"
    );
    error.statusCode = 404;
    return next(error);
  }
  res.json({ problemList });
  //   res.json(testItems.filter((type) => type.pTypeId === problemTypeId));
};

export let createProblem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, difficulty, problemType } = req.body;
  let createdProblem = new problemModel({
    name,
    difficulty,
    problemType,
    solutions: [],
  });

  try {
    await createdProblem.save();
  } catch (err) {
    throw next(HttpErrorConstructor("Could not create problem", 500));
  }
  res.status(201).json({ createdProblem });
};

export let getSolutions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export let getSolutionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const solutionId = req.params.solutionId;
  let solution: Document | null;
  try {
    solution = await solutionModel.findById(solutionId);
  } catch (err) {
    return next(HttpErrorConstructor("Could not find a solution", 500));
  }

  if (!solution) {
    return next(HttpErrorConstructor("Could not find a solution", 404));
  }

  // by calling getters, we instantiate an id on the object
  res.json({ solution: solution.toObject({ getters: true }) });
};

export let getSolutionByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  let solutions: Document[] | null;
  try {
    solutions = await solutionModel.find({ userId: userId });
  } catch (err) {
    return next(HttpErrorConstructor("Could not find a solution", 500));
  }

  if (!solutions || solutions.length === 0) {
    return next(HttpErrorConstructor("Could not find a solution", 404));
  }
  res.json({
    solutions: solutions.map((place) => place.toObject({ getters: true })),
  });
};

export let createSolutionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, userId, ytUrl, description } = req.body;

  // const pTypeId: string = req.params.pTypeId;
  const problemId: string = req.params.problemId;
  let problem;
  const createdSolution = new solutionModel({
    user,
    userId,
    ytUrl,
    description,
    problem: problemId,
  });
  try {
    problem = await problemModel.findById(problemId);
  } catch (err) {
    return next(
      HttpErrorConstructor("Creating solution failed, please try again", 500)
    );
  }

  if (!problem) {
    return next(HttpErrorConstructor("Could not find parent problem", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await createdSolution.save({ session });
    // mongoose specific push
    problem.solutions.push(createdSolution);
    await problem.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.error("Connection error", error);
  }

  res.status(201).json({ createdSolution });
};

export let deleteSolutionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let solutionId = req.params.solutionId;
  let solution: any;

  try {
    solution = (await solutionModel
      .findById(solutionId)
      .populate("problem")) as SolutionDocument;
  } catch (err) {
    return next(HttpErrorConstructor("Could not find a solution", 500));
  }

  if (!solution) {
    return next(HttpErrorConstructor("Could not find a solution", 404));
  }

  try {
    let session = await mongoose.startSession();
    session.startTransaction();
    await solution.deleteOne({ session });
    solution.problem.solutions.pull(solution);
    await solution.problem.save({ session });
    session.commitTransaction();
  } catch (err) {
    return next(HttpErrorConstructor("Could not delete solution", 500));
  }

  res.status(200).json({ message: "Deleted solution" });
};

export let patchSolution = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ytUrl, description } = req.body;

  const pTypeId: string = req.params.pTypeId;
  const problemId: string = req.params.problemId;
  const solutionId: string = req.params.solutionId;
  console.log(typeof problemId);
  console.log("hi");
  // finds the problem type it belongs to
  const problemType = testItems.find((problem) => problem.pTypeId === pTypeId);
  // console.log(problemType);
  // finds the exact problem it belongs to
  // uses ! because we must validate if it exists
  console.log(problemType?.problems);
  const problem = problemType?.problems.find(
    (problem) => problem.id == problemId
  )!;

  // finds the exact solution
  console.log(problem);
  let updatedSolution = {
    ...problem.solutions.find((solution) => solution.solutionId === solutionId),
  };
  console.log(updatedSolution);
  let solIndex = problem.solutions.findIndex(
    (solution) => solution.solutionId === solutionId
  );
  updatedSolution.ytUrl = ytUrl;
  updatedSolution.description = description;

  res.status(200).json({ solution: updatedSolution });
};
