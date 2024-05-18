import { Router } from "express";
import {
  createCompany,
  signInCompany,
  viewAllCompanies,
  viewOneCompany,
} from "../controller/companyController";

const router: Router = Router();
router.route("/view-company/:companyID").get(viewOneCompany);
router.route("/view-company").get(viewAllCompanies);

router.route("/create-company").post(createCompany);
router.route("/sign-in-company").post(signInCompany);

export default router;
