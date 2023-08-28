"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemTypeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// bp for doc
const problemTypeSchema = new mongoose_1.default.Schema({
    typeName: { type: String, required: true },
    problems: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Problem" }],
});
// model placed on schema to be able to be used
// convention is to use uppercase char, singular
exports.problemTypeModel = mongoose_1.default.model("ProblemType", problemTypeSchema);
