import { Request, Response } from "express";
import companyModel from "../model/companyModel";

export const viewAllCompanies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const readCompany = await companyModel.find();
    return res.status(200).json({
      message: "loading companies list",
      status: 200,
      data: readCompany,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error loading companies list",
      status: 404,
      error: error,
    });
  }
};

export const viewOneCompany = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { companyID } = req.params;
    const readCompany = await companyModel.findById(companyID);
    return res.status(200).json({
      message: "loading company",
      status: 200,
      data: readCompany,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error loading company",
      status: 404,
      error: error,
    });
  }
};

export const signInCompany = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const readCompany = await companyModel.findOne({ email });

    if (readCompany) {
      if (readCompany.password === password) {
        return res.status(200).json({
          message: "you are signed in",
          status: 200,
          data: readCompany,
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
      message: "Error loading companies list",
      status: 404,
      error: error,
    });
  }
};

export const createCompany = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { companyName, personalName, email, password } = req.body;

    const readCompany = await companyModel.create({
      companyName,
      personalName,
      email,
      password,
    });

    return res.status(200).json({
      message: "creating company",
      status: 200,
      data: readCompany,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating company",
      status: 404,
      error: error,
    });
  }
};
