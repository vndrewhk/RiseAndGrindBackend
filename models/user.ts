import mongoose, { Model, Schema } from "mongoose";

// bp for doc
const userSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  solutions: { type: mongoose.Types.ObjectId, required: true, ref: "Solution" },
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
