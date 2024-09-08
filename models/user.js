import { query } from "./db.js";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "@prisma/client";
export class UserModel {
  static async findByUserName(name) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          name: name.toLowerCase(),
        },
        select: {
          name: true,
          id: true,
          status: true,
          is_admin: true,
          password: true,
        },
      });

      if (!user) return null;

      return user;
      // const { rows } = await query("select * from users where name = $1", [
      //   name,
      // ]);
      // return rows.length === 0 ? null : rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
      throw err;
    }
  }
  static async registerUser({ name, password, is_admin, status }) {
    try {
      const salt = bcrypt.genSaltSync();
      const password_bcrypt = bcrypt.hashSync(password, salt);

      const user = await prisma.user.create({
        data: {
          name: name.toLowerCase(),
          password: password_bcrypt,
          is_admin: is_admin,
          status: status,
        },
        select: {
          id: true,
          name: true,
          is_admin: true,
        },
      });

      return user;

      // const userResult = await query(
      //   "INSERT INTO users(name,password,is_admin,identification) VALUES ($1,$2,$3,$4) RETURNING *",
      //   [name, password_bcrypt, is_admin, identification]
      // );
      // return userResult.rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
    }
  }
}
