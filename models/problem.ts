import mongoose, { Model, Schema } from "mongoose";

// bp for doc
const problemSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  solutions: [{ type: mongoose.Types.ObjectId, ref: "Solution" }],
});

// model placed on schema to be able to be used

// convention is to use uppercase char, singular
export const problemModel = mongoose.model("Problem", problemSchema);
// group of problems with identifier attached to it instead of problemTypes
// array of identifiers ["Arrays","DP"], use identifier as index
// type = 0
// array[0]
// sort by date on solution
// then push to according array
// identrifier can be on frontend?
