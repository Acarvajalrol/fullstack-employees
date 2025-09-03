import express from "express";
const app = express();
export default app;
import employeesRoutes from "./api/employees.js";

// TODO: this file!
app.use(express.json());

app.use("/employees", employeesRoutes);
