import { Router } from "express";
import { RequestController } from "../controllers/v1/request/request.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { query, check } from "express-validator";

export const requestRouter = Router();

requestRouter.use(validarJWT);

requestRouter.get(
  "/solicitudes",
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
  RequestController.listRequest
);
requestRouter.post(
  "/crear-solicitud",
  [
    check("code")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("El código es obligatorio")
      .isString()
      .withMessage("El código debe ser una cadena"),

    check("resumen")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("El resumen es obligatorio")
      .isString()
      .withMessage("El resumen debe ser una cadena"),

    check("description")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("La descripción es obligatoria")
      .isString()
      .withMessage("La descripción debe ser una cadena"),

    check("employee_id")
      .isInt({ min: 1 })
      .withMessage("El identificador del empleado debe ser un entero positivo")
      .toInt(),
    validarCampos,
  ],
  RequestController.createRequest
);
requestRouter.delete("/eliminar-solicitud", RequestController.deleteRequest);
