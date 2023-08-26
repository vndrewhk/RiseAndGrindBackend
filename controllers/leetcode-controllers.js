"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSolution = exports.patchSolution = exports.createSolutionById = exports.getProblemTypeById = exports.getProblems = void 0;
const uuid_1 = require("uuid");
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
let getProblems = (req, res, next) => {
    res.json(testItems);
};
exports.getProblems = getProblems;
let getProblemTypeById = (req, res, next) => {
    const problemTypeId = req.params.pTypeId;
    console.log("got req in LC");
    console.log(problemTypeId);
    // by using || {}, we force an empty object to be returned if the returned val is falsey, ie undefined or empty
    const problemList = testItems.find((problemType) => problemType.pTypeId === problemTypeId);
    if (!problemList) {
        const error = new Error("Could not find a problem type with specified ID");
        error.statusCode = 404;
        return next(error);
    }
    res.json({ problemList });
    //   res.json(testItems.filter((type) => type.pTypeId === problemTypeId));
};
exports.getProblemTypeById = getProblemTypeById;
let createSolutionById = (req, res, next) => {
    const { user, userId, ytUrl, description } = req.body;
    const pTypeId = req.params.pTypeId;
    const problemId = req.params.problemId;
    const createdSolution = {
        user,
        userId,
        ytUrl,
        description,
        solutionId: (0, uuid_1.v4)(),
    };
    // finds the problem type it belongs to
    const problemType = testItems.find((problem) => (problem.pTypeId = pTypeId));
    // finds the exact problem it belongs to
    // uses ! because we must validate if it exists
    const problem = problemType === null || problemType === void 0 ? void 0 : problemType.problems.find((problem) => problem.id === problemId);
    if (problem) {
        problem.solutions.push(createdSolution);
    }
    console.log(createdSolution);
    console.log(testItems);
    res.status(201).json({ testItems });
};
exports.createSolutionById = createSolutionById;
let patchSolution = (req, res, next) => {
    const { ytUrl, description } = req.body;
    const pTypeId = req.params.pTypeId;
    const problemId = req.params.problemId;
    const solutionId = req.params.solutionId;
    console.log(typeof problemId);
    console.log("hi");
    // finds the problem type it belongs to
    const problemType = testItems.find((problem) => (problem.pTypeId === pTypeId));
    // console.log(problemType);
    // finds the exact problem it belongs to
    // uses ! because we must validate if it exists
    console.log(problemType === null || problemType === void 0 ? void 0 : problemType.problems);
    const problem = problemType === null || problemType === void 0 ? void 0 : problemType.problems.find((problem) => problem.id == problemId);
    // finds the exact solution
    console.log(problem);
    let updatedSolution = Object.assign({}, problem.solutions.find((solution) => solution.solutionId === solutionId));
    console.log(updatedSolution);
    let solIndex = problem.solutions.findIndex((solution) => solution.solutionId === solutionId);
    updatedSolution.ytUrl = ytUrl;
    updatedSolution.description = description;
    res.status(200).json({ solution: updatedSolution });
};
exports.patchSolution = patchSolution;
let deleteSolution = (req, res, next) => { };
exports.deleteSolution = deleteSolution;
