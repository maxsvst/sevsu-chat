import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { chatReducer } from "@/entities/chat/index";

const setupStore = () =>
  configureStore({
    reducer: {
      chat: chatReducer,
    },
  });

const store = setupStore();

export const useAppDispatch = () => useDispatch<AppDispatch>();

type RootState = ReturnType<typeof store.getState>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore["dispatch"];

export { store, type RootState, type AppDispatch };
