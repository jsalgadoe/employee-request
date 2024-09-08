import jwt from "jsonwebtoken";

export const generarJwt = (id, name, is_admin) => {
  return new Promise((resolve, reject) => {
    const payload = { id, name, is_admin };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};
