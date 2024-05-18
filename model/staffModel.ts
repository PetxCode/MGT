import { Document, Schema, Types, model } from "mongoose";
import { iStaff } from "../utils/interfaces";
import { iRole } from "../utils/enums";

interface iStaffData extends iStaff, Document {}

const staffModel = new Schema<iStaffData>(
  {
    personalName: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      default: iRole.MEMBER,
    },

    tasks: [
      {
        type: Types.ObjectId,
        ref: "tasks",
      },
    ],

    company: {
      type: Types.ObjectId,
      ref: "companies",
    },
  },

  { timestamps: true }
);
export default model<iStaffData>("staffs", staffModel);
