import { Router } from "express";
import { check, query } from "express-validator";

import { EmployeeController } from "../controllers/v1/employee/employee.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";

export const employeeRouter = Router();
employeeRouter.use(validarJWT);

employeeRouter.get(
  "/empleados",
  [
    query("search_term")
      .optional()
      .trim()
      .escape()
      .isLength({ min: 2 })
      .withMessage("El termino de busqueda tener al menos 2 caracteres"),
    query("page_number")
      .optional()
      .isInt({ min: 1 })
      .withMessage("El número de página debe ser un entero positivo")
      .toInt(),
    query("page_size")
      .optional()
      .isInt({ min: 1 })
      .withMessage("El tamaño de página debe ser un entero positivo")
      .toInt(),
    validarCampos,
  ],
  EmployeeController.listEmployee
);
employeeRouter.post(
  "/nuevo-empleado",
  [
    check("full_name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isString()
      .withMessage("El nombre debe ser una cadena")
      .isLength({ min: 6 })
      .withMessage("El nombre debe tener al menos 6 caracteres"),

    check("hire_date")
      .trim()
      .isDate()
      .withMessage("La fecha de ingreso es obligatoria"),

    check("salary")
      .trim()
      .isNumeric()
      .withMessage("El salario es requerido y debe ser un número")
      .custom((value) => {
        if (parseFloat(value) <= 0) {
          throw new Error("El salario debe ser mayor a 0");
        }
        return true;
      }),
    check("identification")
      .trim()
      .isInt({ min: 1 })
      .withMessage("La identificación debe ser un número entero positivo")
      .isLength({ min: 6, max: 10 })
      .withMessage("La identificación debe tener entre 6 y 10 dígitos")
      .custom((value) => {
        if (parseInt(value) <= 0) {
          throw new Error("La identificación debe ser positiva");
        }
        return true;
      }),
    validarCampos,
  ],
  EmployeeController.createEmployee
);
