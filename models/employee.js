import { prisma } from "../lib/prisma.js";
export class EmployeeModel {
  static async findAll(search_term = "", page_number = 1, page_size = 10) {
    const offset = (page_number - 1) * page_size;

    //** TODO PENDIENTE SEARCH_TERM */
    try {
      const results = await prisma.employee.findMany({
        skip: Number(offset),
        take: Number(page_size),
        where: {
          full_name: {
            contains: search_term,
            mode: "insensitive",
          },
        },
        orderBy: {
          id: "desc",
        },
      });

      const totalResults = await prisma.employee.count({
        where: {
          full_name: {
            contains: search_term,
            mode: "insensitive",
          },
        },
      });

      console.log(totalResults / page_size);

      const total_pages = Math.ceil(totalResults / page_size);

      return {
        current_page: parseInt(page_number),
        total_pages: total_pages,
        total_results: totalResults,
        page_size: parseInt(page_size),
        has_next_page: page_number < total_pages,
        has_previous_page: page_number > 1,
        results: results,
      };
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
      throw err;
    }
  }

  static async registerEmployee({
    hire_date,
    full_name,
    salary,
    identification,
  }) {
    const employee = await prisma.employee.create({
      data: {
        hire_date: new Date(hire_date).toISOString(),
        full_name,
        salary,
        identification: identification,
      },
      select: {
        id: true,
        hire_date: true,
        full_name: true,
        identification: true,
        salary: true,
      },
    });

    return employee;
  }

  static async findOne(identification) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { identification: identification },
      });
      if (!employee) {
        return null;
      }
      return employee;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
    }
  }
}
