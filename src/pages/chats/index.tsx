import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

import { useAppDispatch } from "@/app/store";
import {
  addMessage,
  fetchMe,
  fetchOnlineUsers,
  fetchUsers,
  selectChat,
  setSelectedChat,
} from "@/entities/chat/model/chatSlice";
import { Message, User } from "@/entities/chat/model/types";
import { api } from "@/shared/api";
import { cn } from "@/shared/lib";
import { Logo } from "@/shared/ui";
import { AddContact } from "@/shared/ui/AddContact";
import { CallIcon } from "@/shared/ui/CallIcon";
import { DotsIcon } from "@/shared/ui/DotsIcon";
import { SearchIcon } from "@/shared/ui/SearchIcon";
import { SendButton } from "@/shared/ui/SendButton";
import { UserPhoto } from "@/shared/ui/UserPhoto";

import style from "./style.module.css";

const Chats = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { chats, users, onlineUsers, authUser, selectedChat } = useSelector(selectChat);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    message.trim().length ? setIsDisabled(false) : setIsDisabled(true);
  }, [message]);

  useEffect(() => {
    dispatch(fetchOnlineUsers());
    dispatch(fetchUsers());
    dispatch(fetchMe());

    const socket = io("ws://localhost:5000/chat", {
      transports: ["websocket"],
      auth: {
        jwt: Cookies.get("jwt_refresh"),
      },
    });

    socket?.on("connect", () => {
      console.log("WebSocket connected");
    });

    setSocket(socket);

    socket?.on("receiveMessage", (message) => {
      dispatch(addMessage(message));
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formAction = (event: any) => {
    event.preventDefault();
    const message = event.target.message.value;
    setMessage("");
    api.post("/chats/send-message", {
      chatId: selectedChat?.id,
      text: message,
    });
  };

  const usersList = users.filter((user: any) => user.id !== authUser?.id);

  const handleChatSelect = async (userId: string) => {
    const chat = await api.get(`/chats/get-or-create/${userId}`);
    console.log(chat);
    dispatch(setSelectedChat(chat.data));
  };

  const handleLogout = () => {
    Cookies.remove("jwt_access");
    Cookies.remove("jwt_refresh");
    router.push("/login");
  };

  const isChatSelected = (userId: string) => {
    return selectedChat?.chatMembers.some((member: User) => member.id === userId);
  };

  return (
    <div className={style.chatsWrapper}>
      <section className={style.chatsList}>
        <div className="flex justify-between">
          <button
            onClick={handleLogout}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600"
          >
            <LogoutIcon />
          </button>
          <Logo isAuth={false} />
          <AddContact />
        </div>
        <div className={style.chatsUserWrapper}>
          {usersList.map((user: User) => {
            return (
              <button
                key={user.id}
                className={cn(style.chatsUser, {
                  "bg-purple-200": isChatSelected(user.id),
                })}
                onClick={() => handleChatSelect(user.id)}
              >
                <UserPhoto />
                <div className={style.userInfoWrapper}>
                  <div className={style.userName}>{user.fullName}</div>
                  <div className={style.userStatus}>
                    {onlineUsers.find((onlineUser: User) => {
                      return onlineUser.id === user.id;
                    })
                      ? "В сети"
                      : "Не в сети"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
      <section className={style.chatWrapper}>
        <header className={style.chatHeader}>
          <div className={style.chatHeaderLeft}>
            <UserPhoto />
            <span className={style.chatHeaderUserName}></span>
          </div>
          <div className={style.chatHeaderRight}>
            <CallIcon />
            <SearchIcon />
            <DotsIcon />
          </div>
        </header>
        <section className={style.chat}>
          {!selectedChat && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
              <span className="text-2xl text-gray-600">Выберите чат</span>
            </div>
          )}
          {
            <div className={style.chatMessages}>
              {selectedChat?.chatMessages.length === 0 && (
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                  <span className="text-2xl text-purple-600">
                    Здесь пока нет сообщений
                  </span>
                </div>
              )}
            </div>
          }
          {selectedChat?.chatMessages?.map((message: Message) => {
            return (
              <div
                key={message.id}
                className={cn(style.messageWrapperIn, {
                  "self-end": message?.user?.id === authUser?.id,
                })}
              >
                <span className={style.message}>{message.text}</span>
                <time className={style.messageTime}>
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                </time>
              </div>
            );
          })}
        </section>
        <footer className={style.chatFooter}>
          <form onSubmit={formAction} className={style.chatInputForm}>
            <input
              className={style.chatFooterInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Сообщение..."
              name="message"
            />
            <SendButton isDisabled={isDisabled} />
          </form>
        </footer>
      </section>
    </div>
  );
};

export default Chats;
