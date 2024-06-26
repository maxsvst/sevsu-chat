import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as Yup from "yup";

export const registrationValidationSchema = Yup.object().shape({
  userName: Yup.string().required("Имя пользователя не должен быть пустым"),
  fullName: Yup.string().required("Логин не должен быть пустым"),
  email: Yup.string().email("E-mail должен быть валидным"),
  password: Yup.string()
    .required("Пароль не должен быть пустым")
    .min(6, "Пароль должен состоять не менее, чем из 6 символов")
    .max(20, "Пароль должен состоять не более, чем из 20 символов"),
  // .matches(
  //   RegExp(/^(?=.*[A-Z])/g),
  //   "Пароль должен содержать хотя бы одну латинскую букву в верхнем регистре"
  // )
  // .matches(
  //   RegExp(/^(?=.*[a-z])/g),
  //   "Пароль должен содержать хотя бы одну латинскую букву в нижнем регистре"
  // )
  // .matches(RegExp(/^(?=.*[0-9])/g), "Пароль должен содержать число")
  // .matches(
  //   RegExp(/^(?=.*[!@#$%^&*])/g),
  //   "Пароль должен содержать хотя бы один спецсимвол"
  // ),
});

export const loginValidationSchema = Yup.object().shape({
  userName: Yup.string().required("Имя пользователя не должен быть пустым"),
  password: Yup.string()
    .required("Пароль не должен быть пустым")
    .min(6, "Пароль должен состоять не менее, чем из 6 символов")
    .max(20, "Пароль должен состоять не более, чем из 20 символов"),
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
