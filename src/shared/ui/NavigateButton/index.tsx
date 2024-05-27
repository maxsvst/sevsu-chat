import React from "react";

import style from "./index.module.css";

export const NavigateButton = ({
  text,
  clickHandler,
  additionalText,
}: {
  text: string;
  clickHandler?: any;
  additionalText?: string;
}) => {
  return (
    <div>
      {additionalText && (
        <span className={style.additional}>{additionalText}</span>
      )}
      <button onClick={clickHandler} className={style.navigate}>
        <span>{text}</span>
      </button>
    </div>
  );
};
