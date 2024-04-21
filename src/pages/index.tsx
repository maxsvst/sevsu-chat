import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { api } from "@/shared/api";
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
import { registrationValidationSchema } from "@/shared/lib";

import "./style.css";

const Login = () => {
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

  const registerHandler = () => {
    api
      .post("/auth/signup", { email, username: userName, fullName, password })
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e));
  };

  const isDisabled =
    !!Object.keys(errors).length ||
    !email ||
    !fullName ||
    !userName ||
    !password;

  return (
    <div className="background">
      <div className="form">
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
        <div className="separator" />
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
        />
        <FormButton
          text="Создать"
          clickHandler={registerHandler}
          isDisabled={isDisabled}
        />
        <NavigateButton
          text="Войти"
          clickHandler={() => router.push("/login")}
        />
      </div>
    </div>
  );
};

export default Login;
