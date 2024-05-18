import { Document, Schema, Types, model } from "mongoose";
import { iCompany } from "../utils/interfaces";
import { iRole } from "../utils/enums";

interface iCompanyData extends iCompany, Document {}

const companyModel = new Schema<iCompanyData>(
  {
    companyName: {
      type: String,
    },
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
      default: iRole.ADMIN,
    },
    staff: [
      {
        type: Types.ObjectId,
        ref: "staffs",
      },
    ],

    tasks: [
      {
        type: Types.ObjectId,
        ref: "tasks",
      },
    ],

    programTask: {
      type: {
        task: [],
        start: [],
        progress: [],
        done: [],
      },
      default: {},
    },
  },
  { timestamps: true }
);
export default model<iCompanyData>("companies", companyModel);
