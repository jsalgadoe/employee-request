import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool
  .connect()
  .then((client) => {
    console.log("Conectado a la base de datos PostgreSQL");
    client.release();
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos", err);
  });

export const query = (text, params) => {
  return pool.query(text, params);
};
