import { Router } from "express";
import {
  createAndAssignTask,
  viewOneTaskAndUpdateStart,
} from "../controller/taskController";

const router: Router = Router();
router.route("/create-task/:companyID/:staffID").post(createAndAssignTask);
router
  .route("/start-task/:companyID/:staffID/:taskID")
  .patch(viewOneTaskAndUpdateStart);

export default router;
