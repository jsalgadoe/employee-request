import { query } from "./db.js"; //* uso de apdater pg
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

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
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
    }
  }
}
