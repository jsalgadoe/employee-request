//
import { response } from "express";

export const verificarAdmin = (req, res = response, next) => {
  if (!req.is_admin) {
    return res.status(403).json({
      ok: false,
      msg: "No tienes permisos para acceder a esta ruta",
    });
  }

  next();
};
