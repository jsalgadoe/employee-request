import { EmployeeModel } from "../../../models/employee.js";

export class EmployeeController {
  static createEmployee = async (req, res) => {
    const { hire_date, identification, full_name, salary } = req.body();
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
    } catch (error) {
      console.log(error);
    }
  };
}
