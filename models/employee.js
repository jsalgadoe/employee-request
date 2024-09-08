import { query } from "./db.js";
export class EmployeeModel {
  static async findAll(search_term = "", page_number = 1, page_size = 10) {
    const offset = (page_number - 1) * page_size;

    //** TODO PENDIENTE SEARCH_TERM */
    try {
      const results = await query(
        `SELECT * FROM employees 
         WHERE full_name ILIKE $1
         ORDER BY id LIMIT $2 OFFSET $3`,
        [`%${search_term}%`, page_size, offset]
      );

      const totalResults = await query(
        `SELECT COUNT(*) FROM employees
         WHERE full_name ILIKE $1`,
        [`%${search_term}%`]
      );

      const total_pages = Math.ceil(totalResults.rows[0].count / page_size);

      return {
        current_page: parseInt(page_number),
        total_pages: total_pages,
        total_results: totalResults.rows[0].count,
        page_size: parseInt(page_size),
        has_next_page: page_number < total_pages,
        has_previous_page: page_number > 1,
        results: results.rows,
      };
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
      throw err;
    }
  }

  static async registerEmployee() {}
}
