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
      .not()
      .isEmpty()
      .withMessage("El usuario es obligatorio")
      .isString()
      .isLength({ min: 4 })
      .withMessage("El usuario debe ser minimo de 4 caracteres"),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  AuthController.login
);
authRouter.post(
  "/register",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("El usuario es obligatorio")
      .isString()
      .isLength({ min: 4 })
      .withMessage("El usuario debe ser minimo de 4 caracteres"),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
    check("identification", "El identification debe ser minimo de 6 caracteres")
      .isLength({
        min: 6,
      })
      .withMessage("La identificación debe ser minima de 6 caracteres")
      .isLength({
        max: 10,
      })
      .withMessage("La identificacion debe ser maxima 10 caracteres"),
    validarCampos,
  ],
  AuthController.register
);
authRouter.get("/renew", validarJWT, AuthController.validateToken);
