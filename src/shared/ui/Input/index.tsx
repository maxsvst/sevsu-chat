import React, { ChangeEventHandler } from "react";

import "./index.css";

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
    <div className="errorWrapper">
      <div className="inputWrapper">
        <Icon />
        <input
          {...register(registerName)}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
        />
      </div>
      {!!error ? (
        <span className="error">{error}</span>
      ) : (
        <span className="error-hidden">Ошибка</span>
      )}
    </div>
  );
};
