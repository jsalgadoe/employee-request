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
  identification: Yup.string()
    .required("El numero de identification es obligatorio")
    .min(6, "Numero de identificación debe tener minimo 6 caracteres")
    .max(10, "Numero de identificación debe tener maximo 10 caracteres"),
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
