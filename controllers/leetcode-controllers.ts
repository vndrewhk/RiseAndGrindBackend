import express, { Express, NextFunction, Request, Response } from "express";
import { HttpError } from ".././models/http-error";

import { v4 as uuidv4 } from "uuid";
let testItems = [
  {
    pTypeId: "1",
    problemType: "Arrays & Hashing",
    problems: [
      {
        // needs id
        solved: false,
        name: "Contains Duplicate",
        difficulty: "Easy",
        solution: "https://www.google.ca/",
        url: "https://www.bing.ca/",
      },
      {
        solved: false,
        name: "Contains Duplicate 2",
        difficulty: "Easy",
        solution: "https://www.google.ca/",
        url: "https://www.bing.ca/",
      },
    ],
  },
  {
    pTypeId: "2",
    problemType: "Stacks",
    problems: [
      {
        solved: false,
        name: "Contains Duplicate",
        difficulty: "Easy",
        solution: "https://www.google.ca/",
        url: "https://www.bing.ca/",
      },
      {
        solved: false,
        name: "Contains Duplicate 2",
        difficulty: "Easy",
        solution: "https://www.google.ca/",
        url: "https://www.bing.ca/",
      },
    ],
  },
];
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

export let createSolutionById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, userId, problemId, ytUrl } = req.body;

  const createdSolution: object = {
    user,
    userId,
    problemId,
    solutionId: uuidv4(),
    ytUrl,
  };

  console.log(createdSolution);
  res.status(201).json({ solution: createdSolution });
};
