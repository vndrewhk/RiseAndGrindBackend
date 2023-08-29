import mongoose, { Model, Schema } from "mongoose";
import { userModel } from "./user";

// bp for doc
const solutionSchema: Schema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    description: { type: String },
    ytUrl: { type: String },
  },
  { timestamps: true }
);

// model placed on schema to be able to be used

// convention is to use uppercase char, singular
export const solutionModel = mongoose.model("Solution", solutionSchema);

// const createSolution = async (req,res,next) =>{
//     const createdSolution = new solutionModel({
//         user: req.body.name,
//         description:req.body.description,
//         ytUrl: req.body.ytUrl
//     })
// }
