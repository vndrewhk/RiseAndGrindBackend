"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// bp for doc
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    solutions: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Solution" },
});
// model placed on schema to be able to be used
exports.userModel = mongoose_1.default.model("user", userSchema);
// const createSolution = async (req,res,next) =>{
//     const createdSolution = new solutionModel({
//         user: req.body.name,
//         description:req.body.description,
//         ytUrl: req.body.ytUrl
//     })
// }
