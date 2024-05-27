import React from "react";

import style from "./index.module.css";

export const Article = ({ text }: { text: string }) => {
  return <span className={style.article}>{text}</span>;
};
