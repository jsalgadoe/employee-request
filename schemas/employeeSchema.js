import * as Yup from "yup";

export const employeeSchema = Yup.object().shape({
  hire_date: Yup.date().required("La fecha de ingreso es obligatoria"),
  full_name: Yup.string()
    .min(6, "El nombre debe tener minimo 6 caracteres")
    .required("El nombre es obligatorio"),
  salary: Yup.number()
    .required()
    .positive()
    .moreThan(0, "El salario debe ser mayor 0"),
  identification: Yup.number()
    .positive("El Numero de identificación debe ser un entero positivo")
    .integer("El Numero de identificación  debe ser un entero")
    .required("El Numero de identificación  es obligatorio")
    .min(
      6,
      "El Numero de identificación del empleado debe tener minimo 6 digitos"
    ),
});
