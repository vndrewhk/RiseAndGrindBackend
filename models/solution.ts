import mongoose, { Model, Schema, model } from "mongoose";
import { userModel } from "./user";

// bp for doc
export interface SolutionDocument extends Document {
  user: string;
  userId: string;
  description?: string;
  ytUrl?: string;
  problem: mongoose.Types.ObjectId;
}

const solutionSchema: Schema<SolutionDocument> = new Schema<SolutionDocument>(
  {
    user: { type: String, required: true },
    userId: { type: String, required: true, ref: "User" },
    description: { type: String },
    ytUrl: { type: String },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  },
  { timestamps: true }
);

// const solutionSchema: Schema = new mongoose.Schema(
//   {
//     user: { type: String, required: true },
//     userId: { type: String, required: true, ref: "User" },
//     description: { type: String },
//     ytUrl: { type: String },
//     problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
//   },
//   { timestamps: true }
// );

// model placed on schema to be able to be used

// convention is to use uppercase char, singular
export const solutionModel: Model<SolutionDocument> = model<SolutionDocument>(
  "Solution",
  solutionSchema
);

// const createSolution = async (req,res,next) =>{
//     const createdSolution = new solutionModel({
//         user: req.body.name,
//         description:req.body.description,
//         ytUrl: req.body.ytUrl
//     })
// }
