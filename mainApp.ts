import { Application } from "express";
import company from "./router/companyRouter";
import staff from "./router/staffRouter";
import task from "./router/taskRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api", company);
    app.use("/api", staff);
    app.use("/api", task);
  } catch (error) {
    console.error(error);
  }
};
