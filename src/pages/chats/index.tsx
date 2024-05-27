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
  fetchUsers,
  selectChat,
} from "@/entities/chat/model/chatSlice";

import style from "./style.module.css";
import { api } from "@/shared/api";
import { useAppDispatch } from "@/app/store";

const Chats = () => {
  const [message, setMessage] = useState("");
  const chat = useSelector(selectChat);

  const dispatch = useAppDispatch();

  console.log(chat);

  useEffect(() => {
    dispatch(fetchUsers());
    const socket = new WebSocket("wss://localhost:5000");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const message = event.data;

      dispatch(addMessage(message));
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const mockMessage = [
    {
      message:
        "12312312AAAAAAAAAAAAAAAaWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      type: "in",
    },
    {
      message:
        "12312312AAAAAAAAAAAAAAAaWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      type: "in",
    },
    {
      message:
        "12312312AAAAAAAAAAAAAAAaWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      type: "out",
    },
    {
      message:
        "12312312AAAAAAAAAAAAAAAaWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      type: "out",
    },
    {
      message:
        "12312312AAAAAAAAAAAAAAAaWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      type: "out",
    },
    {
      message:
        "12312312AAAAAAAAAAAAAAAaWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      type: "in",
    },
    {
      message:
        "12312312AAAAAAAAAAAAAAAaWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      type: "in",
    },
  ];

  return (
    <div className={style.chatsWrapper}>
      <section className={style.chatsList}>
        <div className={style.chatsHeader}>
          <Logo isAuth={false} />
          <AddContact />
          <div className={style.plug} />
        </div>
        <div className={style.chatsUserWrapper}>
          {Array.of(1, 2, 3, 4).map((_) => (
            <div className={style.chatsUser}>
              <UserPhoto />
              <div className={style.userInfoWrapper}>
                <div className={style.userName}>Nicolas</div>
                <div className={style.userStatus}>В сети</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={style.chatWrapper}>
        {/* <ChooseChat /> */}

        <header className={style.chatHeader}>
          <div className={style.chatHeaderLeft}>
            <UserPhoto />
            <span className={style.chatHeaderUserName}>Nicolas</span>
          </div>
          <div className={style.chatHeaderRight}>
            <CallIcon />
            <SearchIcon />
            <DotsIcon />
          </div>
        </header>
        <section className={style.chat}>
          {mockMessage.map((mes) => (
            <div
              className={
                mes.type === "in"
                  ? style.messageWrapperIn
                  : style.messageWrapperOut
              }
            >
              <span className={style.message}>{mes.message}</span>
              <time className={style.messageTime}>12.12</time>
            </div>
          ))}
        </section>
        <footer className={style.chatFooter}>
          <input
            className={style.chatFooterInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Сообщение..."
          />
          <SendButton />
        </footer>
      </section>
    </div>
  );
};

export default Chats;
