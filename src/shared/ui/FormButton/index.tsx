import React from "react";

import style from "./index.module.css";

export const FormButton = ({
  text,
  isDisabled,
}: {
  text: string;
  isDisabled: boolean;
}) => {
  return (
    <button
      className={isDisabled ? style.disabled : style.confirm}
      disabled={isDisabled}
      type="submit"
    >
      <span>{text}</span>
    </button>
  );
};
