import React from "react";

import "./index.css";

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
      {additionalText && <span className="additional">{additionalText}</span>}
      <button onClick={clickHandler} className="navigate">
        <span>{text}</span>
      </button>
    </div>
  );
};
