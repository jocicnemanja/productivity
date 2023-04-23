import { Express, Request, Response } from "express";
import express from "express";

import dotenv from "dotenv";
import mongoose, { model, Schema, Types } from "mongoose";
import { Habit, MonthlyRecord } from "./habit-tracker/models/HabitModels";
// import { createHabit } from "./habit-tracker/HabitTrackerService";

// mongoose.connect(
//   "mongodb://admin:p%40ssw0rd@localhost:27017/?authMechanism=DEFAULT"
// );

// const habitSchema = new Schema<Habit>({
//   id: { type: String, required: true },
//   description: { type: String, required: true },
//   stregth: { type: String, required: true },
//   bestStrike: { type: Number, required: true },
//   monthlyRecords: Types.Array<MonthlyRecord>,
// });

// export const HabbitModel = model("Habbit", habitSchema);
dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

app.get("", (req: Request, res: Response) => {
  res.send("Hi!");
});

// app.get("post-test", async (req: Request, res: Response) => {
//   await createHabit({
//     description: "test",
//     id: "",
//     bestStrike: 0,
//     stregth: "WEEK",
//     monthlyRecords: [
//       {
//         month: 1,
//         year: 2023,
//         dailyRecords: [
//           "DONE",
//           "DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//           "NOT_DONE",
//         ],
//       },
//     ],
//   });
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
