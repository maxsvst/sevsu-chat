import React, { ChangeEventHandler } from "react";

import style from "./index.module.css";

export const Input = ({
  value,
  changeHandler,
  placeholder,
  Icon,
  register,
  registerName,
  error,
}: {
  value: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  Icon: any;
  register: any;
  registerName: string;
  error: string | undefined;
}) => {
  return (
    <div className={style.errorWrapper}>
      <div className={style.inputWrapper}>
        <Icon />
        <input
          className={style.input}
          {...register(registerName)}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
        />
      </div>
      {!!error ? (
        <span className={style.error}>{error}</span>
      ) : (
        <span className={style.errorHidden}>Ошибка</span>
      )}
    </div>
  );
};
