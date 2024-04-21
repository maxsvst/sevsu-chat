import React, { MouseEventHandler } from "react";

import "./index.css";

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
      className={isDisabled ? "disabled" : "confirm"}
      disabled={isDisabled}
      onClick={clickHandler}
    >
      <span>{text}</span>
    </button>
  );
};
