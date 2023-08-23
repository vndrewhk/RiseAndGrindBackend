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
router.get("/:pTypeId", leetcode_controllers_1.getProblemTypeById);
router.post("/", leetcode_controllers_1.createSolutionById);
// export default router;
exports.default = router;
