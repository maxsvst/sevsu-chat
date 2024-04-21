import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { api } from "@/shared/api";
import {
  Article,
  FormButton,
  FullnameIcon,
  Input,
  Logo,
  NavigateButton,
  PasswordIcon,
} from "@/shared/ui";
import { loginValidationSchema } from "@/shared/lib";

import "./style.css";

const Index = () => {
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

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    api
      .post("/auth/login", { username: userName, password })
      .then((res) => res.data)
      .then((data) => {
        Cookies.set("jwt_access", data.backendTokens.accessToken);
        Cookies.set("jwt_refresh", data.backendTokens.refreshToken);
      })
      .catch((e) => console.error(e));
  };

  const isDisabled = !!Object.keys(errors).length || !userName || !password;

  return (
    <div className="background">
      <form className="form">
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
        />
        <FormButton
          text="Войти"
          clickHandler={(e) => loginHandler(e)}
          isDisabled={isDisabled}
        />
        <NavigateButton
          additionalText="Ещё нет аккаунта?"
          text="Зарегистрироваться"
          clickHandler={(
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => {
            e.preventDefault();
            router.push("/");
          }}
        />
      </form>
    </div>
  );
};

export default Index;
