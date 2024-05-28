import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Logo } from "@/shared/ui";
import { UserPhoto } from "@/shared/ui/UserPhoto";
import { AddContact } from "@/shared/ui/AddContact";
import { ChooseChat } from "@/shared/ui/ChooseChat";
import { CallIcon } from "@/shared/ui/CallIcon";
import { SearchIcon } from "@/shared/ui/SearchIcon";
import { DotsIcon } from "@/shared/ui/DotsIcon";
import { SendButton } from "@/shared/ui/SendButton";
import {
  addMessage,
  fetchChatId,
  fetchMe,
  fetchOnlineUsers,
  fetchUsers,
  selectChat,
} from "@/entities/chat/model/chatSlice";

import style from "./style.module.css";
import { useAppDispatch } from "@/app/store";
import { io, Socket } from "socket.io-client";
import { api } from "@/shared/api";

const Chats = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { messages, users, onlineUsers, myId, chatId } =
    useSelector(selectChat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !!message.trim().length ? setIsDisabled(false) : setIsDisabled(true);
  }, [message]);

  useEffect(() => {
    // chatId &&
    // api.get(`/chats/messages/${chatId}`).then((res) => console.log(res));
  }, [chatId]);

  useEffect(() => {
    dispatch(fetchOnlineUsers());
    dispatch(fetchChatId("chat"));
    dispatch(fetchUsers());
    dispatch(fetchMe());

    api.get("/chats/my-chats").then((res) => console.log(res));

    const socket = io("ws://localhost:5000/chat", {
      transports: ["websocket"],
    });

    socket?.on("connect", () => {
      // console.log("WebSocket connected");
    });

    setSocket(socket);

    socket?.on("receiveMessage", (message) => {
      dispatch(addMessage(message));
    });

    socket.on("disconnect", () => {
      // console.log("WebSocket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formAction = (event: any) => {
    event.preventDefault();
    const message = event.target.message.value;
    setMessage("");
    socket?.emit("sendMessage", { text: message, chatId: chatId });
  };

  const usersList = users.filter((user) => user.id !== myId.id);

  return (
    <div className={style.chatsWrapper}>
      <section className={style.chatsList}>
        <div className={style.chatsHeader}>
          <Logo isAuth={false} />
          <AddContact />
          <div className={style.plug} />
        </div>
        <div className={style.chatsUserWrapper}>
          {usersList.map((user) => {
            return (
              <div key={user.id} className={style.chatsUser}>
                <UserPhoto />
                <div className={style.userInfoWrapper}>
                  <div className={style.userName}>{user.fullName}</div>
                  <div className={style.userStatus}>
                    {onlineUsers.find((onlineUser) => {
                      return onlineUser.id === user.id;
                    })
                      ? "В сети"
                      : "Не в сети"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className={style.chatWrapper}>
        {/* <ChooseChat /> */}

        <header className={style.chatHeader}>
          <div className={style.chatHeaderLeft}>
            <UserPhoto />
            <span className={style.chatHeaderUserName}>
              {/* {usersList[0].fullName} */}
            </span>
          </div>
          <div className={style.chatHeaderRight}>
            <CallIcon />
            <SearchIcon />
            <DotsIcon />
          </div>
        </header>
        <section className={style.chat}>
          {messages.map((mes) => (
            <div className={style.messageWrapperIn}>
              <span className={style.message}>{mes.text}</span>
              <time className={style.messageTime}>12:12</time>
            </div>
          ))}
          {/* {mockMessage.map((mes) => (
            <div
              className={s
                mes.type === "in"
                  ? style.messageWrapperIn
                  : style.messageWrapperOut
              }
            >
              <span className={style.message}>{mes.message}</span>
              <time className={style.messageTime}>12.12</time>
            </div>
          ))} */}
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
