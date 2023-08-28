import mongoose, { Model, Schema } from "mongoose";

// bp for doc
const userSchema: Schema = new mongoose.Schema({
  user: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String },
  ytUrl: { type: String },
  solutionId: { type: String, required: true },
});

// model placed on schema to be able to be used

export const userModel = mongoose.model("user", userSchema);

// const createSolution = async (req,res,next) =>{
//     const createdSolution = new solutionModel({
//         user: req.body.name,
//         description:req.body.description,
//         ytUrl: req.body.ytUrl
//     })
// }
