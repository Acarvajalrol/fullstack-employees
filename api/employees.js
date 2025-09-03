import express from "express";
const router = express.Router();
export default router;

// TODO: this file!
import {
  createEmployee,
  getEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from "#db/queries/employees";

router
  .route("/")
  .get(async (req, res) => {
    const employees = await getEmployees();
    return res.send(employees, "Welcome to the Fullstack Employees API.");
  })
  .post(async (req, res) => {
    // console.log(req.body);
    if (req.body === undefined) {
      return res.status(400).send("Request has no body");
    } else if (!req.body.name || !req.body.birthday || !req.body.salary) {
      return res.status(400).send("Missing required fields");
    } else {
      try {
        const { name, birthday, salary } = req.body;
        const response = await createEmployee(name, birthday, salary);
        return res.status(201).send(response);
      } catch (e) {
        return res.status(400).send(e);
      }
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    if (!/^-?\d+(\.\d+)?$/.test(id) || id < 0) {
      return res.status(400).send("Employee id is not a positive integer");
    } else {
      try {
        const employee = await getEmployee(id);
        if (employee === undefined) {
          return res.status(404).send("Employee does not exist");
        }
        return res.send(employee);
      } catch (e) {
        return res.status(400).send(e);
      }
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    if (!/^-?\d+(\.\d+)?$/.test(id) || id < 0) {
      return res.status(400).send("Employee id is not a positive integer");
    } else {
      try {
        const employee = await deleteEmployee(id);
        if (employee === undefined) {
          return res.status(404).send("Employee does not exist");
        }
        return res.status(204).send(employee);
      } catch (e) {
        return res.status(400).send(e);
      }
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    if (!/^-?\d+(\.\d+)?$/.test(id) || id < 0) {
      return res.status(400).send("Employee id is not a positive integer");
    } else if (req.body === undefined) {
      return res.status(400).send("Request has no body.");
    } else if (!req.body.name || !req.body.birthday || !req.body.salary) {
      return res.status(400).send("Missing required fields.");
    } else {
      try {
        const { name, birthday, salary } = req.body;
        const employee = await updateEmployee({ id, name, birthday, salary });
        if (employee === undefined) {
          return res.status(404).send("Employee does not exist.");
        }
        return res.send(employee);
      } catch (e) {
        return res.status(400).send(e);
      }
    }
  });
