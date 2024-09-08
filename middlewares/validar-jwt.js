import { response } from "express";
import jwt from "jsonwebtoken";

export const validarJWT = (req, res = response, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición o el formato es incorrecto",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const { id, name, is_admin } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    req.id = id;
    req.name = name;
    req.is_admin = is_admin;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  next();
};
