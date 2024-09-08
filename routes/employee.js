import { Router } from "express";
import { check } from "express-validator";

import { EmployeeController } from "../controllers/v1/empleados/employee.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";

export const employeeRouter = Router();
employeeRouter.use(validarJWT);

employeeRouter.get("/empleados", EmployeeController.listEmployee);
employeeRouter.post(
  "/nuevo-empleado",
  [
    check("full_name")
      .not()
      .isEmpty()
      .withMessage("El nombre es obligatorio")
      .isString()
      .isLength({ min: 6 })
      .withMessage("El nombre debe ser minimo de 6 caracteres"),
    check("hire_date")
      .isDate()
      .withMessage("La fecha de ingreso es obligatoria"),
    check("salary")
      .isNumeric("El salario es requerido")
      .custom((value) => {
        if (value <= 0) {
          throw new Error("El número debe ser mayor a 0");
        }
        return true;
      })
      .withMessage("El Salario debe ser mayor a 0"),
    validarCampos,
  ],
  EmployeeController.createEmployee
);
