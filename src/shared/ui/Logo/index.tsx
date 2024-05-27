import React from "react";

import style from "./index.module.css";

export const Logo = ({ isAuth = true }: { isAuth?: boolean }) => {
  return <span className={isAuth ? style.authLogo : style.logo}>ChatIS</span>;
};
