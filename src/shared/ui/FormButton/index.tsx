import React, { MouseEventHandler } from "react";

import style from "./index.module.css";

export const FormButton = ({
  text,
  isDisabled,
  clickHandler,
}: {
  text: string;
  isDisabled: boolean;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className={isDisabled ? style.disabled : style.confirm}
      disabled={isDisabled}
      onClick={clickHandler}
    >
      <span>{text}</span>
    </button>
  );
};
