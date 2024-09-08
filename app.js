import express, { json } from "express";
import dotenv from "dotenv";

import { authRouter } from "./routes/auth.js";
import { employeeRouter } from "./routes/employee.js";
import { validarJWT } from "./middlewares/validar-jwt.js";
import { verificarAdmin } from "./middlewares/verificar_admin.js";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 12345;

app.disable("x-powered-by");

app.use(express.json());

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/employee", employeeRouter);

// app.get("/admin", [validarJWT, verificarAdmin], (req, res) => {
//   res.json({
//     ok: true,
//     msg: "Acceso concedido a ruta de admin",
//   });
// });

app.listen(PORT, () => {
  console.log(`Servido en el puerto http://localhost:${PORT} !!!`);
});
