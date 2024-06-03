import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { api } from "@/shared/api";
import { loginValidationSchema } from "@/shared/lib";
import {
  Article,
  FormButton,
  FullnameIcon,
  Input,
  Logo,
  NavigateButton,
  PasswordIcon,
} from "@/shared/ui";

import style from "./style.module.css";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { userName: "", password: "" },
    resolver: yupResolver(loginValidationSchema),
    mode: "all",
  });

  useEffect(() => {
    Cookies.get("jwt_access") && api.get("/");
  }, []);

  const loginHandler = (event: any) => {
    event.preventDefault();
    api
      .post("/auth/login", { username: userName, password })
      .then((res) => res.data)
      .then((data) => {
        Cookies.set("jwt_access", data.backendTokens.accessToken);
        Cookies.set("jwt_refresh", data.backendTokens.refreshToken);
        router.push("/chats");
      })
      .catch((e) => console.error(e));
  };

  const isDisabled = !!Object.keys(errors).length || !userName || !password;

  return (
    <div className={style.background}>
      <form className={style.form} onSubmit={loginHandler}>
        <Logo />
        <Article text="Добро пожаловать" />
        <Input
          value={userName}
          Icon={FullnameIcon}
          register={register}
          registerName="userName"
          error={errors.userName?.message}
          changeHandler={(e) => setUserName(e.target.value)}
          placeholder="Введите имя пользователя"
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
        <FormButton text="Войти" isDisabled={isDisabled} />
        <NavigateButton
          additionalText="Ещё нет аккаунта? "
          text="Зарегистрироваться"
          clickHandler={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            router.push("/registration");
          }}
        />
      </form>
    </div>
  );
};

export default Login;
