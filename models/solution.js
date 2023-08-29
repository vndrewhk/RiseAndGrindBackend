"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solutionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// bp for doc
const solutionSchema = new mongoose_1.default.Schema({
    user: { type: String, required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "User" },
    description: { type: String },
    ytUrl: { type: String },
}, { timestamps: true });
// model placed on schema to be able to be used
// convention is to use uppercase char, singular
exports.solutionModel = mongoose_1.default.model("Solution", solutionSchema);
// const createSolution = async (req,res,next) =>{
//     const createdSolution = new solutionModel({
//         user: req.body.name,
//         description:req.body.description,
//         ytUrl: req.body.ytUrl
//     })
// }
