import express from "express";
const app = express();
export default app;
import employeesRoutes from "./api/employees.js";

// TODO: this file!

app.route("/").get((req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use(express.json());

app.use("/employees", employeesRoutes);

app.use((err, req, res, next) => {
  console.error(e);
  res.status(500).send("Sorry! Something went wrong.");
});
