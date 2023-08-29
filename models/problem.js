"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// bp for doc
const problemSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    difficulty: { type: String, required: true },
    solutions: [{ type: mongoose_1.default.Types.ObjectId, ref: "Solution" }],
});
// model placed on schema to be able to be used
// convention is to use uppercase char, singular
exports.problemModel = mongoose_1.default.model("Problem", problemSchema);
// group of problems with identifier attached to it instead of problemTypes
// array of identifiers ["Arrays","DP"], use identifier as index
// type = 0
// array[0]
// sort by date on solution
// then push to according array
// identrifier can be on frontend?
