import { EmployeeModel } from "../../../models/employee.js";
import { employeeSchema } from "../../../schemas/employeeSchema.js";

export class EmployeeController {
  static createEmployee = async (req, res) => {
    try {
      const validDataRegister = await employeeSchema.validate(req.body, {
        abortEarly: false,
      });

      let employee = await EmployeeModel.registerEmployee({
        ...validDataRegister,
      });

      return res.status(201).json({
        ok: true,
        empleado: employee,
      });
    } catch (err) {
      res.status(400).json({ errors: err.errors });
    }
  };

  static listEmployee = async (req, res) => {
    const { search_term = "", page_number = 1, page_size = 10 } = req.query;

    try {
      const pagination = await EmployeeModel.findAll(
        search_term,
        page_number,
        page_size
      );
      if (!pagination) {
        return res.status(403).json({
          message: "error",
        });
      }
      return res.status(200).json({
        ok: true,
        pagination,
      });
    } catch (err) {
      res.status(400).json({ errors: err.errors });
    }
  };
}
