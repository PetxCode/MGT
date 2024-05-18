import { Request, Response } from "express";
import companyModel from "../model/companyModel";
import staffModel from "../model/staffModel";
import { Types } from "mongoose";

export const createStaff = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { adminID } = req.params;
    const { personalName } = req.body;

    const admin = await companyModel.findById(adminID);
    console.log(admin);

    if (admin) {
      let name = personalName.replaceAll(" ", "").trim().toLowerCase();

      const staff: any = await staffModel.create({
        personalName,
        email: `${name}@${admin?.companyName.toLowerCase()}.com`,
        password: name,
        companyID: adminID,
      });

      admin?.staff?.push(new Types.ObjectId(staff?._id));
      admin?.save();

      return res.status(201).json({
        message: "Admin creating staff",
        status: 201,
        data: staff,
      });
    } else {
      return res.status(404).json({
        message: "you can't creating staff",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating staff",
      status: 404,
    });
  }
};

export const signInStaff = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const readStaff = await staffModel.findOne({ email });

    if (readStaff) {
      if (readStaff.password === password) {
        return res.status(200).json({
          message: "you are signed in",
          status: 200,
          data: readStaff,
        });
      } else {
        return res.status(404).json({
          message: "password is incorrect",
          status: 404,
        });
      }
    } else {
      return res.status(404).json({
        message: "Email not found",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error signing staff ",
      status: 404,
      error: error,
    });
  }
};

export const viewOneStaff = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { staffID } = req.params;
    const readStaff = await staffModel.findById(staffID);
    return res.status(200).json({
      message: "loading staff",
      status: 200,
      data: readStaff,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error loading staff",
      status: 404,
      error: error,
    });
  }
};

export const deleteStaff = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { staffID, companyID } = req.params;

    const readCompany: any = await companyModel.findById(companyID);

    await staffModel.findByIdAndDelete(staffID);

    readCompany?.staff?.pull(new Types.ObjectId(staffID));

    readCompany.save();

    return res.status(201).json({
      message: " staff deleted successfully",
      status: 201,
      data: staffModel,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error loading staff",
      status: 404,
      error: error,
    });
  }
};

export const viewCompanyStaff = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { companyID } = req.params;
    const readCompanyStaff = await companyModel.findById(companyID).populate({
      path: "staff",
    });

    return res.status(200).json({
      message: "loading staff",
      status: 200,
      data: readCompanyStaff,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error loading staff",
      status: 404,
      error: error,
    });
  }
};
