import React from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { AppProps } from "next/app";

import "./global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
