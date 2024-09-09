import { Router } from "express";
import { check } from "express-validator";

import { AuthController } from "../controllers/v1/auth/auth.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";

export const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("El usuario es obligatorio")
      .isString()
      .withMessage("El usuario debe ser una cadena")
      .isLength({ min: 4 })
      .withMessage("El usuario debe tener al menos 4 caracteres"),

    check("password")
      .trim()
      .escape()
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
    validarCampos,
  ],
  AuthController.login
);
authRouter.post(
  "/register",
  [
    check("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("El usuario es obligatorio")
      .isString()
      .withMessage("El usuario debe ser una cadena")
      .isLength({ min: 4 })
      .withMessage("El usuario debe tener al menos 4 caracteres"),

    check("password")
      .trim()
      .escape()
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),

    validarCampos,
  ],
  AuthController.register
);
authRouter.get("/renew", validarJWT, AuthController.validateToken);
