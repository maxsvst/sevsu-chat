"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { api } from "@/shared/api";
import { registrationValidationSchema } from "@/shared/lib";
import {
  EmailIcon,
  FormButton,
  FullnameIcon,
  Input,
  NavigateButton,
  PasswordIcon,
  Logo,
  Article,
} from "@/shared/ui";

import style from "./style.module.css";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", fullName: "", userName: "", password: "" },
    resolver: yupResolver(registrationValidationSchema),
    mode: "all",
  });

  useEffect(() => {
    Cookies.get("jwt_access") && api.get("/");
  }, []);

  const registerHandler = (e: any) => {
    e.preventDefault();
    api
      .post("/auth/signup", { email, username: userName, fullName, password })
      .then(() => router.push("/login"))
      .catch((e) => console.error(e));
  };

  const isDisabled =
    !!Object.keys(errors).length || !email || !fullName || !userName || !password;

  return (
    <div className={style.background}>
      <form className={style.form} onSubmit={registerHandler}>
        <Logo />
        <Article text="Регистрация" />
        <Input
          value={userName}
          Icon={FullnameIcon}
          register={register}
          registerName="userName"
          error={errors.userName?.message}
          changeHandler={(e) => setUserName(e.target.value)}
          placeholder="Введите имя пользователя"
        />
        <div className={style.separator} />
        <Input
          value={email}
          Icon={EmailIcon}
          register={register}
          registerName="email"
          error={errors.email?.message}
          changeHandler={(e) => setEmail(e.target.value)}
          placeholder="Введите e-mail"
        />
        <Input
          value={fullName}
          Icon={FullnameIcon}
          register={register}
          registerName="fullName"
          error={errors.fullName?.message}
          changeHandler={(e) => setFullName(e.target.value)}
          placeholder="Введите полное имя"
        />
        <Input
          value={password}
          Icon={PasswordIcon}
          register={register}
          registerName="password"
          error={errors.password?.message}
          changeHandler={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          type="password"
        />
        <FormButton text="Создать" isDisabled={isDisabled} />
        <NavigateButton text="Войти" clickHandler={() => router.push("/login")} />
      </form>
    </div>
  );
};

export default Registration;
