import { query } from "./db.js";
import bcrypt from "bcryptjs";

export class UserModel {
  static async findByUserName(name) {
    try {
      const { rows } = await query("select * from users where name = $1", [
        name,
      ]);
      return rows.length === 0 ? null : rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
      throw err;
    }
  }
  static async registerUser({ name, password, is_admin, identification }) {
    try {
      const salt = bcrypt.genSaltSync();
      const password_bcrypt = bcrypt.hashSync(password, salt);

      const userResult = await query(
        "INSERT INTO users(name,password,is_admin,identification) VALUES ($1,$2,$3,$4) RETURNING *",
        [name, password_bcrypt, is_admin, identification]
      );
      return userResult.rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
    }
  }
}
