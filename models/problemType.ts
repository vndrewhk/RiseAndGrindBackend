import mongoose, { Model, Schema } from "mongoose";

// bp for doc
const problemTypeSchema: Schema = new mongoose.Schema({
  typeName: { type: String, required: true },
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
});

// model placed on schema to be able to be used

// convention is to use uppercase char, singular
export const problemTypeModel = mongoose.model(
  "ProblemType",
  problemTypeSchema
);
