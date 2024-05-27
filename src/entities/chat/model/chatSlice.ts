import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";
import { api } from "@/shared/api";

interface IChat {
  users: [];
  messages: [];
}

const initialState: IChat = {
  users: [],
  messages: [],
};

export const fetchUsers = createAsyncThunk(
  "chat/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/all");
      return data;
    } catch (e) {
      return rejectWithValue("Не удалось получить данные");
    }
  }
);

const contractsReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state: IChat, action: PayloadAction<any>) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state: IChat, action: PayloadAction<any>) => {
        state.users = action.payload;
      }
    );
  },
});

export const selectChat = (state: RootState) => state.chat;

export const { addMessage } = contractsReducer.actions;

export default contractsReducer.reducer;
