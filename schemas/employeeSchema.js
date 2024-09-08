import * as Yup from "yup";

export const employeeSchema = Yup.object().shape({
  hire_date: Yup.date().required("La fecha de ingreso es obligatoria"),
  identification: Yup.string().required("La Identificacion es obligatoria"),
  full_name: Yup.string()
    .min(6, "El nombre debe tener minimo 6 caracteres")
    .required("El nombre es obligatorio"),
  salary: Yup.number().positive().moreThan(0, "El salario debe ser mayor 0"),
});
