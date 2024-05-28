import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";
import { api } from "@/shared/api";

interface IChat {
  users: [];
  onlineUsers: [];
  messages: [];
  myId: string;
  chatId: string;
}

const initialState: IChat = {
  users: [],
  messages: [],
  onlineUsers: [],
  myId: "",
  chatId: "",
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

export const fetchOnlineUsers = createAsyncThunk(
  "chat/fetchOnlineUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/list-online");
      return data;
    } catch (e) {
      return rejectWithValue("Не удалось получить данные");
    }
  }
);

export const fetchMe = createAsyncThunk(
  "chat/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/me");
      return data;
    } catch (e) {
      return rejectWithValue("Не удалось получить данные");
    }
  }
);

export const fetchChatId = createAsyncThunk(
  "chat/fetchChatId",
  async (title: string, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/chats/create", { title });
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
    ),
      builder.addCase(
        fetchMe.fulfilled,
        (state: IChat, action: PayloadAction<any>) => {
          state.myId = action.payload;
        }
      ),
      builder.addCase(
        fetchChatId.fulfilled,
        (state: IChat, action: PayloadAction<any>) => {
          state.chatId = action.payload.id;
        }
      );
  },
});

export const selectChat = (state: RootState) => state.chat;

export const { addMessage } = contractsReducer.actions;

export default contractsReducer.reducer;
