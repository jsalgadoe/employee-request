import * as Yup from "yup";

export const requestSchema = Yup.object().shape({
  code: Yup.string()
    .trim()
    .required("El código es obligatorio")
    .min(1, "El código es obligatorio"),

  resumen: Yup.string()
    .trim()
    .required("El resumen es obligatorio")
    .min(1, "El resumen es obligatorio"),

  description: Yup.string()
    .trim()
    .required("La descripción es obligatoria")
    .min(1, "La descripción es obligatoria"),

  employee_id: Yup.number()
    .positive("El identificador del usuario debe ser un entero positivo")
    .integer("El identificador del usuario debe ser un entero")
    .required("El identificador del usuario es obligatorio"),
});
