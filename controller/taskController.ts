import { Request, Response } from "express";
import staffModel from "../model/staffModel";
import companyModel from "../model/companyModel";
import taskModel from "../model/taskModel";
import { Types } from "mongoose";
import { iStage } from "../utils/enums";

export const createAndAssignTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { staffID, companyID } = req.params;
    const { title } = req.body;

    const company: any = await companyModel.findById(companyID);
    const readStaff = await staffModel.findById(staffID);

    if (company) {
      const task: any = await taskModel.create({
        title,
        assigned: staffID,
        staff: readStaff,
      });

      company?.programTask.task?.push(task);

      company?.tasks?.push(new Types.ObjectId(task?._id!));
      company?.save();

      readStaff?.tasks?.push(new Types.ObjectId(task?._id!));
      readStaff?.save();

      return res.status(201).json({
        message: "loading staff",
        status: 201,
        data: { task, company },
      });
    } else {
      return res.status(404).json({
        message: "unable to find company",
        status: 404,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error loading",
      status: 404,
      error: error?.message,
    });
  }
};

export const viewOneTaskAndUpdateStart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { staffID, taskID, companyID } = req.params;
    const staff = await staffModel.findById(staffID);

    if (staff) {
      const task = await taskModel.findByIdAndUpdate(
        taskID,
        {
          stage: iStage.START,
        },
        { new: true }
      );

      const companyData: any = await companyModel.findById(companyID);

      console.log(
        companyData?.programTask?.task?.filter((el: any) => {
          return (el?._id).str === "66478a84b40c45f5fc9045b7";
        })
      );

      const filter = companyData?.programTask?.task((el: any) => {
        return el._id !== taskID;
      });
      console.log("loaded");

      const started = companyData?.programTask?.start?.push(task);

      console.log(filter);
      console.log(started);

      await companyModel.findByIdAndUpdate(
        companyID,
        {
          programTask: {
            task: filter,
            start: started,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        message: "loading company",
        status: 200,
        data: task,
      });
    } else {
      return res.status(404).json({
        message: "not a staff",
        status: 404,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error loading company",
      status: 404,
      error: error?.message,
    });
  }
};
