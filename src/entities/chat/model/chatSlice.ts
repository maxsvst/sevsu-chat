import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";
import { Chat, Message, IUser } from "@/entities/chat/model/types";
import { api } from "@/shared/api";

interface IChat {
  users: [];
  onlineUsers: [];
  authUser: IUser | null;
  chats: Chat[];
  selectedChat: Chat | null;
  currentTab: string;
}

const initialState: IChat = {
  users: [],
  onlineUsers: [],
  authUser: null,
  chats: [],
  selectedChat: null,
  currentTab: "chat",
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
  },
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
  },
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
  },
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
  },
);

const contractsReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state: IChat, action: PayloadAction<Message>) => {
      state.selectedChat?.chatMessages.unshift(action.payload);
    },
    setSelectedChat: (state: IChat, action: PayloadAction<Chat>) => {
      state.selectedChat = action.payload;
    },
    setCurrentTab: (state: IChat, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state: IChat, action: PayloadAction<any>) => {
        state.users = action.payload;
      },
    ),
      builder.addCase(
        fetchOnlineUsers.fulfilled,
        (state: IChat, action: PayloadAction<any>) => {
          state.onlineUsers = action.payload;
        },
      ),
      builder.addCase(
        fetchMe.fulfilled,
        (state: IChat, action: PayloadAction<any>) => {
          state.authUser = action.payload;
        },
      ),
      builder.addCase(
        fetchChatId.fulfilled,
        (state: IChat, action: PayloadAction<Chat>) => {
          state.chats.push(action.payload);
          state.selectedChat = action.payload;
        },
      );
  },
});

export const selectChat = (state: RootState) => state.chat;

export const { addMessage, setSelectedChat, setCurrentTab } =
  contractsReducer.actions;

export default contractsReducer.reducer;
