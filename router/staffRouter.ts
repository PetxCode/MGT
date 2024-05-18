import { Router } from "express";
import {
  createStaff,
  deleteStaff,
  signInStaff,
  viewCompanyStaff,
  viewOneStaff,
} from "../controller/staffController";

const router: Router = Router();
router.route("/view-staff/:staffID").get(viewOneStaff);
router.route("/view-company-staff/:companyID").get(viewCompanyStaff);

router.route("/create-staff/:adminID").post(createStaff);
router.route("/sign-in-staff").post(signInStaff);

router.route("/remove-staff/:companyID/:staffID").delete(deleteStaff);

export default router;
