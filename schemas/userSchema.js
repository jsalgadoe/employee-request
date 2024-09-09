import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => value.toLowerCase())
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .required("El nombre es obligatorio"),
  password: Yup.string()
    .min(6, "El password debe tener al menos 6 caracteres")
    .required("El password es obligatorio"),
  is_admin: Yup.boolean().default(false),
  status: Yup.boolean().default(false),
});

export const userLoginSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => value.toLowerCase())
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .required("El nombre es obligatorio"),
  password: Yup.string()
    .min(6, "El password debe tener al menos 6 caracteres")
    .required("El password es obligatorio"),
});
