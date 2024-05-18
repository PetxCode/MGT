import express, { Application } from "express";
import cors from "cors";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";

const port: number = 1111;
const app: Application = express();

app.use(express.json());
app.use(cors());

mainApp(app);

const server = app.listen(port, () => {
  console.clear();

  dbConfig();
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException", error);

  process.exit(1);
});
process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection", reason);

  server.close(() => {
    process.exit(1);
  });
});
