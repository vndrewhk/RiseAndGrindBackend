"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchSolution = exports.deleteSolutionById = exports.createSolutionById = exports.getSolutionByUser = exports.getSolutionById = exports.getSolutions = exports.createProblem = exports.getProblemTypeById = exports.getProblems = void 0;
const http_error_1 = require(".././models/http-error");
const solution_1 = require("../models/solution");
const mongoose_1 = __importDefault(require("mongoose"));
const problem_1 = require("../models/problem");
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
    return next((0, http_error_1.HttpErrorConstructor)("Could not find solution", 500));
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
let createProblem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, difficulty, problemType } = req.body;
    let createdProblem = new problem_1.problemModel({
        name,
        difficulty,
        problemType,
        solutions: [],
    });
    try {
        yield createdProblem.save();
    }
    catch (err) {
        throw next((0, http_error_1.HttpErrorConstructor)("Could not create problem", 500));
    }
    res.status(201).json({ createdProblem });
});
exports.createProblem = createProblem;
let getSolutions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getSolutions = getSolutions;
let getSolutionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const solutionId = req.params.solutionId;
    let solution;
    try {
        solution = yield solution_1.solutionModel.findById(solutionId);
    }
    catch (err) {
        return next((0, http_error_1.HttpErrorConstructor)("Could not find a solution", 500));
    }
    if (!solution) {
        return next((0, http_error_1.HttpErrorConstructor)("Could not find a solution", 404));
    }
    // by calling getters, we instantiate an id on the object
    res.json({ solution: solution.toObject({ getters: true }) });
});
exports.getSolutionById = getSolutionById;
let getSolutionByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    let solutions;
    try {
        solutions = yield solution_1.solutionModel.find({ userId: userId });
    }
    catch (err) {
        return next((0, http_error_1.HttpErrorConstructor)("Could not find a solution", 500));
    }
    if (!solutions || solutions.length === 0) {
        return next((0, http_error_1.HttpErrorConstructor)("Could not find a solution", 404));
    }
    res.json({
        solutions: solutions.map((place) => place.toObject({ getters: true })),
    });
});
exports.getSolutionByUser = getSolutionByUser;
let createSolutionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, userId, ytUrl, description } = req.body;
    // const pTypeId: string = req.params.pTypeId;
    const problemId = req.params.problemId;
    let problem;
    const createdSolution = new solution_1.solutionModel({
        user,
        userId,
        ytUrl,
        description,
        problem: problemId,
    });
    try {
        problem = yield problem_1.problemModel.findById(problemId);
    }
    catch (err) {
        return next((0, http_error_1.HttpErrorConstructor)("Creating solution failed, please try again", 500));
    }
    if (!problem) {
        return next((0, http_error_1.HttpErrorConstructor)("Could not find parent problem", 404));
    }
    try {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        yield createdSolution.save({ session });
        // mongoose specific push
        problem.solutions.push(createdSolution);
        yield problem.save({ session });
        yield session.commitTransaction();
    }
    catch (error) {
        console.error("Connection error", error);
    }
    res.status(201).json({ createdSolution });
});
exports.createSolutionById = createSolutionById;
let deleteSolutionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let solutionId = req.params.solutionId;
    let solution;
    try {
        solution = (yield solution_1.solutionModel
            .findById(solutionId)
            .populate("problem"));
    }
    catch (err) {
        return next((0, http_error_1.HttpErrorConstructor)("Could not find a solution", 500));
    }
    if (!solution) {
        return next((0, http_error_1.HttpErrorConstructor)("Could not find a solution", 404));
    }
    try {
        let session = yield mongoose_1.default.startSession();
        session.startTransaction();
        yield solution.deleteOne({ session });
        solution.problem.solutions.pull(solution);
        yield solution.problem.save({ session });
        session.commitTransaction();
    }
    catch (err) {
        return next((0, http_error_1.HttpErrorConstructor)("Could not delete solution", 500));
    }
    res.status(200).json({ message: "Deleted solution" });
});
exports.deleteSolutionById = deleteSolutionById;
let patchSolution = (req, res, next) => {
    const { ytUrl, description } = req.body;
    const pTypeId = req.params.pTypeId;
    const problemId = req.params.problemId;
    const solutionId = req.params.solutionId;
    console.log(typeof problemId);
    console.log("hi");
    // finds the problem type it belongs to
    const problemType = testItems.find((problem) => problem.pTypeId === pTypeId);
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
