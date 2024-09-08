import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => value.toLowerCase())
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre no puede exceder 30 caracteres")
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
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre no puede exceder 30 caracteres")
    .required("El nombre es obligatorio"),
  password: Yup.string()
    .min(6, "El password debe tener al menos 6 caracteres")
    .required("El password es obligatorio"),
});
