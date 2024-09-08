import { Router } from "express";
import { EmployeeController } from "../controllers/v1/empleados/employee.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { check } from "express-validator";

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
    check("identification", "El identification debe ser minimo de 6 caracteres")
      .isLength({
        min: 6,
      })
      .withMessage("La identificación debe ser minima de 6 caracteres")
      .isLength({
        max: 10,
      })
      .withMessage("La identificacion debe ser maxima 10 caracteres"),
    check("salary").isNumeric(),
  ],
  EmployeeController.createEmployee
);
