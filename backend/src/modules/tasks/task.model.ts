import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    position: {
      type: Number,
      default: 0,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Task", TaskSchema);
