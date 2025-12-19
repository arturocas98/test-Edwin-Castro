import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: String,
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model("Project", ProjectSchema);
