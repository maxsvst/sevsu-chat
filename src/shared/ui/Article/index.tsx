import React from "react";

import "./index.css";

export const Article = ({ text }: { text: string }) => {
  return <span className="article">{text}</span>;
};
