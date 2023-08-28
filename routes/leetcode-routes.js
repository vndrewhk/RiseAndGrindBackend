"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leetcode_controllers_1 = require("../controllers/leetcode-controllers");
// obj that u can reg middleware on, and export it
const router = express_1.default.Router();
// will have to add ID to the problems eventually
router.get("/", leetcode_controllers_1.getProblems);
router.get("/:pTypeId", leetcode_controllers_1.getProblemTypeById);
router.get("/solution/:solutionId", leetcode_controllers_1.getSolutionById);
router.post("/", leetcode_controllers_1.createSolutionById);
router.patch("/:pTypeId/:problemId/:solutionId", leetcode_controllers_1.patchSolution);
router.delete("/:pTypeId/:problemId", leetcode_controllers_1.deleteSolution);
// export default router;
// group of problems with identifier attached to it instead of problemTypes
// array of identifiers ["Arrays","DP"], use identifier as index
// type = 0
// array[0]
// sort by date on solution
exports.default = router;
