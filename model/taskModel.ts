import { Document, Schema, Types, model } from "mongoose";
import { iTask } from "../utils/interfaces";
import { iStage } from "../utils/enums";

interface iTaskData extends iTask, Document {}

const taskModel = new Schema<iTaskData>(
  {
    title: {
      type: String,
    },

    stage: {
      type: String,
      default: iStage.TASK,
    },

    assigned: {
      type: String,
    },

    company: {
      type: Types.ObjectId,
      ref: "companies",
    },

    staff: {
      type: Types.ObjectId,
      ref: "staffs",
    },
  },
  { timestamps: true }
);
export default model<iTaskData>("tasks", taskModel);
