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
  setCurrentTab,
} from "@/entities/chat/model/chatSlice";
import { Message, IUser } from "@/entities/chat/model/types";
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
import { Chat } from "./chat";
import { Profile } from "./profile";
import { User } from "./user";

const Chats = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentTab, users, onlineUsers, authUser, selectedChat } =
    useSelector(selectChat);

  const usersList = users.filter((user: any) => user.id !== authUser?.id);

  const handleChatSelect = async (
    userId: string,
    memberName: string,
    memberEmail: string,
  ) => {
    const chat = await api.get(`/chats/get-or-create/${userId}`);
    console.log(chat);
    dispatch(setSelectedChat({ ...chat.data, memberName, memberEmail }));
  };

  const handleLogout = () => {
    Cookies.remove("jwt_access");
    Cookies.remove("jwt_refresh");
    router.push("/login");
  };

  const isChatSelected = (userId: string) => {
    return selectedChat?.chatMembers.some(
      (member: IUser) => member.id === userId,
    );
  };

  const chatWrapper = () => {
    if (currentTab === "chat") {
      return <Chat />;
    } else if (currentTab === "user") {
      return <User />;
    } else if (currentTab === "profile") {
      return <Profile />;
    }
  };

  const chatFooter = () => {
    if (currentTab === "user") {
      return (
        <>
          {/* Активный юзер */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="16"
              cy="9.33333"
              r="5.33333"
              stroke="url(#paint0_linear_96_1844)"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 18.6667C10.8453 18.6667 6.66663 20.7561 6.66663 23.3334C6.66663 25.9107 10.8453 28.0001 16 28.0001C21.1546 28.0001 25.3333 25.9107 25.3333 23.3334C25.3333 21.8984 24.0379 20.6147 22 19.7587"
              stroke="url(#paint1_linear_96_1844)"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_96_1844"
                x1="10.6666"
                y1="4.47816"
                x2="24.0677"
                y2="10.7223"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#6C5FD4" />
                <stop offset="1" stop-color="#5DD3A9" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_96_1844"
                x1="6.66663"
                y1="19.0851"
                x2="21.9434"
                y2="33.3214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#6C5FD4" />
                <stop offset="1" stop-color="#5DD3A9" />
              </linearGradient>
            </defs>
          </svg>
          {/* Чат */}
          <svg
            onClick={() => dispatch(setCurrentTab("chat"))}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.12 12.4267L8.4533 3.09334C7.71662 2.72669 6.88479 2.59616 6.07121 2.71954C5.25763 2.84293 4.50191 3.21424 3.90707 3.78283C3.31224 4.35142 2.90723 5.08964 2.74729 5.89682C2.58734 6.70401 2.68023 7.54088 3.0133 8.29334L6.2133 15.4533C6.28591 15.6265 6.3233 15.8123 6.3233 16C6.3233 16.1877 6.28591 16.3736 6.2133 16.5467L3.0133 23.7067C2.74223 24.3156 2.62764 24.9827 2.67993 25.6472C2.73223 26.3117 2.94975 26.9526 3.31274 27.5116C3.67573 28.0707 4.17266 28.5301 4.75839 28.8483C5.34412 29.1664 6.00007 29.3332 6.66663 29.3333C7.29094 29.3271 7.90595 29.1813 8.46663 28.9067L27.1333 19.5733C27.7954 19.2403 28.352 18.7297 28.7409 18.0988C29.1298 17.4678 29.3357 16.7412 29.3357 16C29.3357 15.2588 29.1298 14.5322 28.7409 13.9012C28.352 13.2703 27.7954 12.7598 27.1333 12.4267H27.12ZM25.9333 17.1867L7.26663 26.52C7.02151 26.6377 6.74627 26.6776 6.47781 26.6345C6.20935 26.5913 5.96051 26.4671 5.76465 26.2785C5.56879 26.0899 5.43527 25.8459 5.382 25.5793C5.32874 25.3126 5.35827 25.0361 5.46663 24.7867L8.6533 17.6267C8.69455 17.5311 8.73017 17.4331 8.75996 17.3333H17.9466C18.3003 17.3333 18.6394 17.1929 18.8894 16.9428C19.1395 16.6928 19.28 16.3536 19.28 16C19.28 15.6464 19.1395 15.3072 18.8894 15.0572C18.6394 14.8072 18.3003 14.6667 17.9466 14.6667H8.75996C8.73017 14.5669 8.69455 14.469 8.6533 14.3733L5.46663 7.21334C5.35827 6.96396 5.32874 6.68741 5.382 6.42077C5.43527 6.15413 5.56879 5.91015 5.76465 5.72154C5.96051 5.53293 6.20935 5.40872 6.47781 5.36554C6.74627 5.32237 7.02151 5.36231 7.26663 5.48001L25.9333 14.8133C26.1517 14.9252 26.335 15.0952 26.463 15.3046C26.591 15.514 26.6587 15.7546 26.6587 16C26.6587 16.2454 26.591 16.486 26.463 16.6954C26.335 16.9048 26.1517 17.0748 25.9333 17.1867Z"
              fill="#6C5FD4"
            />
            <path
              d="M27.12 12.4267L8.4533 3.09334C7.71662 2.72669 6.88479 2.59616 6.07121 2.71954C5.25763 2.84293 4.50191 3.21424 3.90707 3.78283C3.31224 4.35142 2.90723 5.08964 2.74729 5.89682C2.58734 6.70401 2.68023 7.54088 3.0133 8.29334L6.2133 15.4533C6.28591 15.6265 6.3233 15.8123 6.3233 16C6.3233 16.1877 6.28591 16.3736 6.2133 16.5467L3.0133 23.7067C2.74223 24.3156 2.62764 24.9827 2.67993 25.6472C2.73223 26.3117 2.94975 26.9526 3.31274 27.5116C3.67573 28.0707 4.17266 28.5301 4.75839 28.8483C5.34412 29.1664 6.00007 29.3332 6.66663 29.3333C7.29094 29.3271 7.90595 29.1813 8.46663 28.9067L27.1333 19.5733C27.7954 19.2403 28.352 18.7297 28.7409 18.0988C29.1298 17.4678 29.3357 16.7412 29.3357 16C29.3357 15.2588 29.1298 14.5322 28.7409 13.9012C28.352 13.2703 27.7954 12.7598 27.1333 12.4267H27.12ZM25.9333 17.1867L7.26663 26.52C7.02151 26.6377 6.74627 26.6776 6.47781 26.6345C6.20935 26.5913 5.96051 26.4671 5.76465 26.2785C5.56879 26.0899 5.43527 25.8459 5.382 25.5793C5.32874 25.3126 5.35827 25.0361 5.46663 24.7867L8.6533 17.6267C8.69455 17.5311 8.73017 17.4331 8.75996 17.3333H17.9466C18.3003 17.3333 18.6394 17.1929 18.8894 16.9428C19.1395 16.6928 19.28 16.3536 19.28 16C19.28 15.6464 19.1395 15.3072 18.8894 15.0572C18.6394 14.8072 18.3003 14.6667 17.9466 14.6667H8.75996C8.73017 14.5669 8.69455 14.469 8.6533 14.3733L5.46663 7.21334C5.35827 6.96396 5.32874 6.68741 5.382 6.42077C5.43527 6.15413 5.56879 5.91015 5.76465 5.72154C5.96051 5.53293 6.20935 5.40872 6.47781 5.36554C6.74627 5.32237 7.02151 5.36231 7.26663 5.48001L25.9333 14.8133C26.1517 14.9252 26.335 15.0952 26.463 15.3046C26.591 15.514 26.6587 15.7546 26.6587 16C26.6587 16.2454 26.591 16.486 26.463 16.6954C26.335 16.9048 26.1517 17.0748 25.9333 17.1867Z"
              fill="#BBBBBB"
            />
          </svg>
          {/* Профиль */}
          <svg
            onClick={() => dispatch(setCurrentTab("profile"))}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.3333 3.42266C14.8029 3.15148 15.3315 2.99893 15.8733 2.97826C16.4151 2.95758 16.9538 3.06939 17.4427 3.30399L17.6667 3.42266L26.0587 8.26666C26.5306 8.53904 26.9286 8.92298 27.2178 9.38486C27.5069 9.84673 27.6785 10.3725 27.7173 10.916L27.7253 11.1533V20.844C27.7252 21.3888 27.5916 21.9252 27.3361 22.4063C27.0807 22.8875 26.7112 23.2987 26.26 23.604L26.06 23.7307L17.6667 28.576C17.1971 28.8472 16.6685 28.9997 16.1267 29.0204C15.5849 29.0411 15.0462 28.9293 14.5573 28.6947L14.3333 28.5747L5.94132 23.7333C5.46936 23.4609 5.07137 23.077 4.7822 22.6151C4.49304 22.1533 4.32152 21.6275 4.28266 21.084L4.27466 20.8467V11.1547C4.27493 10.6098 4.40877 10.0733 4.66446 9.5921C4.92015 9.11094 5.28989 8.69979 5.74133 8.39466L5.94132 8.26799L14.3333 3.42266ZM16.3333 5.73199C16.2492 5.68348 16.1555 5.65393 16.0588 5.64541C15.962 5.63689 15.8646 5.6496 15.7733 5.68266L15.6667 5.73199L7.27466 10.5773C7.19063 10.6259 7.11823 10.6922 7.0625 10.7717C7.00676 10.8511 6.96905 10.9418 6.95199 11.0373L6.94132 11.1547V20.8453C6.94142 20.9424 6.96271 21.0382 7.00371 21.1262C7.0447 21.2142 7.10441 21.2922 7.17866 21.3547L7.27466 21.4213L15.6667 26.268C15.7508 26.3165 15.8445 26.3461 15.9412 26.3546C16.0379 26.3631 16.1354 26.3504 16.2267 26.3173L16.3333 26.268L24.7253 21.4227C24.8096 21.3742 24.8823 21.308 24.9382 21.2285C24.9942 21.1491 25.0321 21.0583 25.0493 20.9627L25.0587 20.8453V11.1547C25.0587 11.0577 25.0376 10.9619 24.9969 10.8739C24.9561 10.786 24.8967 10.708 24.8227 10.6453L24.7253 10.5773L16.3333 5.73199ZM16 10.6667C17.4145 10.6667 18.771 11.2286 19.7712 12.2288C20.7714 13.229 21.3333 14.5855 21.3333 16C21.3333 17.4145 20.7714 18.771 19.7712 19.7712C18.771 20.7714 17.4145 21.3333 16 21.3333C14.5855 21.3333 13.2289 20.7714 12.2288 19.7712C11.2286 18.771 10.6667 17.4145 10.6667 16C10.6667 14.5855 11.2286 13.229 12.2288 12.2288C13.2289 11.2286 14.5855 10.6667 16 10.6667ZM16 13.3333C15.2927 13.3333 14.6145 13.6143 14.1144 14.1144C13.6143 14.6145 13.3333 15.2927 13.3333 16C13.3333 16.7072 13.6143 17.3855 14.1144 17.8856C14.6145 18.3857 15.2927 18.6667 16 18.6667C16.7072 18.6667 17.3855 18.3857 17.8856 17.8856C18.3857 17.3855 18.6667 16.7072 18.6667 16C18.6667 15.2927 18.3857 14.6145 17.8856 14.1144C17.3855 13.6143 16.7072 13.3333 16 13.3333Z"
              fill="#BBBBBB"
            />
          </svg>
        </>
      );
    } else if (currentTab === "chat") {
      return (
        <>
          {/* Юзер */}
          <svg
            onClick={() => dispatch(setCurrentTab("user"))}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="16"
              cy="9.33333"
              r="5.33333"
              stroke="#BBBBBB"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 18.6667C10.8453 18.6667 6.66663 20.7561 6.66663 23.3334C6.66663 25.9107 10.8453 28.0001 16 28.0001C21.1546 28.0001 25.3333 25.9107 25.3333 23.3334C25.3333 21.8984 24.0379 20.6147 22 19.7587"
              stroke="#BBBBBB"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {/* Активный чат */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.12 12.4267L8.4533 3.09334C7.71662 2.72669 6.88479 2.59616 6.07121 2.71954C5.25763 2.84293 4.50191 3.21424 3.90707 3.78283C3.31224 4.35142 2.90723 5.08964 2.74729 5.89682C2.58734 6.70401 2.68023 7.54088 3.0133 8.29334L6.2133 15.4533C6.28591 15.6265 6.3233 15.8123 6.3233 16C6.3233 16.1877 6.28591 16.3736 6.2133 16.5467L3.0133 23.7067C2.74223 24.3156 2.62764 24.9827 2.67993 25.6472C2.73223 26.3117 2.94975 26.9526 3.31274 27.5116C3.67573 28.0707 4.17266 28.5301 4.75839 28.8483C5.34412 29.1664 6.00007 29.3332 6.66663 29.3333C7.29094 29.3271 7.90595 29.1813 8.46663 28.9067L27.1333 19.5733C27.7954 19.2403 28.352 18.7297 28.7409 18.0988C29.1298 17.4678 29.3357 16.7412 29.3357 16C29.3357 15.2588 29.1298 14.5322 28.7409 13.9012C28.352 13.2703 27.7954 12.7598 27.1333 12.4267H27.12ZM25.9333 17.1867L7.26663 26.52C7.02151 26.6377 6.74627 26.6776 6.47781 26.6345C6.20935 26.5913 5.96051 26.4671 5.76465 26.2785C5.56879 26.0899 5.43527 25.8459 5.382 25.5793C5.32874 25.3126 5.35827 25.0361 5.46663 24.7867L8.6533 17.6267C8.69455 17.5311 8.73017 17.4331 8.75996 17.3333H17.9466C18.3003 17.3333 18.6394 17.1929 18.8894 16.9428C19.1395 16.6928 19.28 16.3536 19.28 16C19.28 15.6464 19.1395 15.3072 18.8894 15.0572C18.6394 14.8072 18.3003 14.6667 17.9466 14.6667H8.75996C8.73017 14.5669 8.69455 14.469 8.6533 14.3733L5.46663 7.21334C5.35827 6.96396 5.32874 6.68741 5.382 6.42077C5.43527 6.15413 5.56879 5.91015 5.76465 5.72154C5.96051 5.53293 6.20935 5.40872 6.47781 5.36554C6.74627 5.32237 7.02151 5.36231 7.26663 5.48001L25.9333 14.8133C26.1517 14.9252 26.335 15.0952 26.463 15.3046C26.591 15.514 26.6587 15.7546 26.6587 16C26.6587 16.2454 26.591 16.486 26.463 16.6954C26.335 16.9048 26.1517 17.0748 25.9333 17.1867Z"
              fill="#6C5FD4"
            />
            <path
              d="M27.12 12.4267L8.4533 3.09334C7.71662 2.72669 6.88479 2.59616 6.07121 2.71954C5.25763 2.84293 4.50191 3.21424 3.90707 3.78283C3.31224 4.35142 2.90723 5.08964 2.74729 5.89682C2.58734 6.70401 2.68023 7.54088 3.0133 8.29334L6.2133 15.4533C6.28591 15.6265 6.3233 15.8123 6.3233 16C6.3233 16.1877 6.28591 16.3736 6.2133 16.5467L3.0133 23.7067C2.74223 24.3156 2.62764 24.9827 2.67993 25.6472C2.73223 26.3117 2.94975 26.9526 3.31274 27.5116C3.67573 28.0707 4.17266 28.5301 4.75839 28.8483C5.34412 29.1664 6.00007 29.3332 6.66663 29.3333C7.29094 29.3271 7.90595 29.1813 8.46663 28.9067L27.1333 19.5733C27.7954 19.2403 28.352 18.7297 28.7409 18.0988C29.1298 17.4678 29.3357 16.7412 29.3357 16C29.3357 15.2588 29.1298 14.5322 28.7409 13.9012C28.352 13.2703 27.7954 12.7598 27.1333 12.4267H27.12ZM25.9333 17.1867L7.26663 26.52C7.02151 26.6377 6.74627 26.6776 6.47781 26.6345C6.20935 26.5913 5.96051 26.4671 5.76465 26.2785C5.56879 26.0899 5.43527 25.8459 5.382 25.5793C5.32874 25.3126 5.35827 25.0361 5.46663 24.7867L8.6533 17.6267C8.69455 17.5311 8.73017 17.4331 8.75996 17.3333H17.9466C18.3003 17.3333 18.6394 17.1929 18.8894 16.9428C19.1395 16.6928 19.28 16.3536 19.28 16C19.28 15.6464 19.1395 15.3072 18.8894 15.0572C18.6394 14.8072 18.3003 14.6667 17.9466 14.6667H8.75996C8.73017 14.5669 8.69455 14.469 8.6533 14.3733L5.46663 7.21334C5.35827 6.96396 5.32874 6.68741 5.382 6.42077C5.43527 6.15413 5.56879 5.91015 5.76465 5.72154C5.96051 5.53293 6.20935 5.40872 6.47781 5.36554C6.74627 5.32237 7.02151 5.36231 7.26663 5.48001L25.9333 14.8133C26.1517 14.9252 26.335 15.0952 26.463 15.3046C26.591 15.514 26.6587 15.7546 26.6587 16C26.6587 16.2454 26.591 16.486 26.463 16.6954C26.335 16.9048 26.1517 17.0748 25.9333 17.1867Z"
              fill="url(#paint0_linear_23_2612)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_23_2612"
                x1="2.6676"
                y1="3.86938"
                x2="36.1681"
                y2="19.484"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#6C5FD4" />
                <stop offset="1" stop-color="#5DD3A9" />
              </linearGradient>
            </defs>
          </svg>

          {/* Профиль */}
          <svg
            onClick={() => dispatch(setCurrentTab("profile"))}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.3333 3.42266C14.8029 3.15148 15.3315 2.99893 15.8733 2.97826C16.4151 2.95758 16.9538 3.06939 17.4427 3.30399L17.6667 3.42266L26.0587 8.26666C26.5306 8.53904 26.9286 8.92298 27.2178 9.38486C27.5069 9.84673 27.6785 10.3725 27.7173 10.916L27.7253 11.1533V20.844C27.7252 21.3888 27.5916 21.9252 27.3361 22.4063C27.0807 22.8875 26.7112 23.2987 26.26 23.604L26.06 23.7307L17.6667 28.576C17.1971 28.8472 16.6685 28.9997 16.1267 29.0204C15.5849 29.0411 15.0462 28.9293 14.5573 28.6947L14.3333 28.5747L5.94132 23.7333C5.46936 23.4609 5.07137 23.077 4.7822 22.6151C4.49304 22.1533 4.32152 21.6275 4.28266 21.084L4.27466 20.8467V11.1547C4.27493 10.6098 4.40877 10.0733 4.66446 9.5921C4.92015 9.11094 5.28989 8.69979 5.74133 8.39466L5.94132 8.26799L14.3333 3.42266ZM16.3333 5.73199C16.2492 5.68348 16.1555 5.65393 16.0588 5.64541C15.962 5.63689 15.8646 5.6496 15.7733 5.68266L15.6667 5.73199L7.27466 10.5773C7.19063 10.6259 7.11823 10.6922 7.0625 10.7717C7.00676 10.8511 6.96905 10.9418 6.95199 11.0373L6.94132 11.1547V20.8453C6.94142 20.9424 6.96271 21.0382 7.00371 21.1262C7.0447 21.2142 7.10441 21.2922 7.17866 21.3547L7.27466 21.4213L15.6667 26.268C15.7508 26.3165 15.8445 26.3461 15.9412 26.3546C16.0379 26.3631 16.1354 26.3504 16.2267 26.3173L16.3333 26.268L24.7253 21.4227C24.8096 21.3742 24.8823 21.308 24.9382 21.2285C24.9942 21.1491 25.0321 21.0583 25.0493 20.9627L25.0587 20.8453V11.1547C25.0587 11.0577 25.0376 10.9619 24.9969 10.8739C24.9561 10.786 24.8967 10.708 24.8227 10.6453L24.7253 10.5773L16.3333 5.73199ZM16 10.6667C17.4145 10.6667 18.771 11.2286 19.7712 12.2288C20.7714 13.229 21.3333 14.5855 21.3333 16C21.3333 17.4145 20.7714 18.771 19.7712 19.7712C18.771 20.7714 17.4145 21.3333 16 21.3333C14.5855 21.3333 13.2289 20.7714 12.2288 19.7712C11.2286 18.771 10.6667 17.4145 10.6667 16C10.6667 14.5855 11.2286 13.229 12.2288 12.2288C13.2289 11.2286 14.5855 10.6667 16 10.6667ZM16 13.3333C15.2927 13.3333 14.6145 13.6143 14.1144 14.1144C13.6143 14.6145 13.3333 15.2927 13.3333 16C13.3333 16.7072 13.6143 17.3855 14.1144 17.8856C14.6145 18.3857 15.2927 18.6667 16 18.6667C16.7072 18.6667 17.3855 18.3857 17.8856 17.8856C18.3857 17.3855 18.6667 16.7072 18.6667 16C18.6667 15.2927 18.3857 14.6145 17.8856 14.1144C17.3855 13.6143 16.7072 13.3333 16 13.3333Z"
              fill="#BBBBBB"
            />
          </svg>
        </>
      );
    } else if (currentTab === "profile") {
      return (
        <>
          {/* Юзер */}

          <svg
            onClick={() => dispatch(setCurrentTab("user"))}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="16"
              cy="9.33333"
              r="5.33333"
              stroke="#BBBBBB"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 18.6667C10.8453 18.6667 6.66663 20.7561 6.66663 23.3334C6.66663 25.9107 10.8453 28.0001 16 28.0001C21.1546 28.0001 25.3333 25.9107 25.3333 23.3334C25.3333 21.8984 24.0379 20.6147 22 19.7587"
              stroke="#BBBBBB"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {/* Чат */}
          <svg
            onClick={() => dispatch(setCurrentTab("chat"))}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.12 12.4267L8.4533 3.09334C7.71662 2.72669 6.88479 2.59616 6.07121 2.71954C5.25763 2.84293 4.50191 3.21424 3.90707 3.78283C3.31224 4.35142 2.90723 5.08964 2.74729 5.89682C2.58734 6.70401 2.68023 7.54088 3.0133 8.29334L6.2133 15.4533C6.28591 15.6265 6.3233 15.8123 6.3233 16C6.3233 16.1877 6.28591 16.3736 6.2133 16.5467L3.0133 23.7067C2.74223 24.3156 2.62764 24.9827 2.67993 25.6472C2.73223 26.3117 2.94975 26.9526 3.31274 27.5116C3.67573 28.0707 4.17266 28.5301 4.75839 28.8483C5.34412 29.1664 6.00007 29.3332 6.66663 29.3333C7.29094 29.3271 7.90595 29.1813 8.46663 28.9067L27.1333 19.5733C27.7954 19.2403 28.352 18.7297 28.7409 18.0988C29.1298 17.4678 29.3357 16.7412 29.3357 16C29.3357 15.2588 29.1298 14.5322 28.7409 13.9012C28.352 13.2703 27.7954 12.7598 27.1333 12.4267H27.12ZM25.9333 17.1867L7.26663 26.52C7.02151 26.6377 6.74627 26.6776 6.47781 26.6345C6.20935 26.5913 5.96051 26.4671 5.76465 26.2785C5.56879 26.0899 5.43527 25.8459 5.382 25.5793C5.32874 25.3126 5.35827 25.0361 5.46663 24.7867L8.6533 17.6267C8.69455 17.5311 8.73017 17.4331 8.75996 17.3333H17.9466C18.3003 17.3333 18.6394 17.1929 18.8894 16.9428C19.1395 16.6928 19.28 16.3536 19.28 16C19.28 15.6464 19.1395 15.3072 18.8894 15.0572C18.6394 14.8072 18.3003 14.6667 17.9466 14.6667H8.75996C8.73017 14.5669 8.69455 14.469 8.6533 14.3733L5.46663 7.21334C5.35827 6.96396 5.32874 6.68741 5.382 6.42077C5.43527 6.15413 5.56879 5.91015 5.76465 5.72154C5.96051 5.53293 6.20935 5.40872 6.47781 5.36554C6.74627 5.32237 7.02151 5.36231 7.26663 5.48001L25.9333 14.8133C26.1517 14.9252 26.335 15.0952 26.463 15.3046C26.591 15.514 26.6587 15.7546 26.6587 16C26.6587 16.2454 26.591 16.486 26.463 16.6954C26.335 16.9048 26.1517 17.0748 25.9333 17.1867Z"
              fill="#6C5FD4"
            />
            <path
              d="M27.12 12.4267L8.4533 3.09334C7.71662 2.72669 6.88479 2.59616 6.07121 2.71954C5.25763 2.84293 4.50191 3.21424 3.90707 3.78283C3.31224 4.35142 2.90723 5.08964 2.74729 5.89682C2.58734 6.70401 2.68023 7.54088 3.0133 8.29334L6.2133 15.4533C6.28591 15.6265 6.3233 15.8123 6.3233 16C6.3233 16.1877 6.28591 16.3736 6.2133 16.5467L3.0133 23.7067C2.74223 24.3156 2.62764 24.9827 2.67993 25.6472C2.73223 26.3117 2.94975 26.9526 3.31274 27.5116C3.67573 28.0707 4.17266 28.5301 4.75839 28.8483C5.34412 29.1664 6.00007 29.3332 6.66663 29.3333C7.29094 29.3271 7.90595 29.1813 8.46663 28.9067L27.1333 19.5733C27.7954 19.2403 28.352 18.7297 28.7409 18.0988C29.1298 17.4678 29.3357 16.7412 29.3357 16C29.3357 15.2588 29.1298 14.5322 28.7409 13.9012C28.352 13.2703 27.7954 12.7598 27.1333 12.4267H27.12ZM25.9333 17.1867L7.26663 26.52C7.02151 26.6377 6.74627 26.6776 6.47781 26.6345C6.20935 26.5913 5.96051 26.4671 5.76465 26.2785C5.56879 26.0899 5.43527 25.8459 5.382 25.5793C5.32874 25.3126 5.35827 25.0361 5.46663 24.7867L8.6533 17.6267C8.69455 17.5311 8.73017 17.4331 8.75996 17.3333H17.9466C18.3003 17.3333 18.6394 17.1929 18.8894 16.9428C19.1395 16.6928 19.28 16.3536 19.28 16C19.28 15.6464 19.1395 15.3072 18.8894 15.0572C18.6394 14.8072 18.3003 14.6667 17.9466 14.6667H8.75996C8.73017 14.5669 8.69455 14.469 8.6533 14.3733L5.46663 7.21334C5.35827 6.96396 5.32874 6.68741 5.382 6.42077C5.43527 6.15413 5.56879 5.91015 5.76465 5.72154C5.96051 5.53293 6.20935 5.40872 6.47781 5.36554C6.74627 5.32237 7.02151 5.36231 7.26663 5.48001L25.9333 14.8133C26.1517 14.9252 26.335 15.0952 26.463 15.3046C26.591 15.514 26.6587 15.7546 26.6587 16C26.6587 16.2454 26.591 16.486 26.463 16.6954C26.335 16.9048 26.1517 17.0748 25.9333 17.1867Z"
              fill="#BBBBBB"
            />
          </svg>
          {/* Активный профиль */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.3333 3.42266C14.8029 3.15148 15.3315 2.99893 15.8733 2.97826C16.4151 2.95758 16.9538 3.06939 17.4427 3.30399L17.6667 3.42266L26.0587 8.26666C26.5306 8.53904 26.9286 8.92298 27.2178 9.38486C27.5069 9.84673 27.6785 10.3725 27.7173 10.916L27.7253 11.1533V20.844C27.7252 21.3888 27.5916 21.9252 27.3361 22.4063C27.0807 22.8875 26.7112 23.2987 26.26 23.604L26.06 23.7307L17.6667 28.576C17.1971 28.8472 16.6685 28.9997 16.1267 29.0204C15.5849 29.0411 15.0462 28.9293 14.5573 28.6947L14.3333 28.5747L5.94132 23.7333C5.46936 23.4609 5.07137 23.077 4.7822 22.6151C4.49304 22.1533 4.32152 21.6275 4.28266 21.084L4.27466 20.8467V11.1547C4.27493 10.6098 4.40877 10.0733 4.66446 9.5921C4.92015 9.11094 5.28989 8.69979 5.74133 8.39466L5.94132 8.26799L14.3333 3.42266ZM16.3333 5.73199C16.2492 5.68348 16.1555 5.65393 16.0588 5.64541C15.962 5.63689 15.8646 5.6496 15.7733 5.68266L15.6667 5.73199L7.27466 10.5773C7.19063 10.6259 7.11823 10.6922 7.0625 10.7717C7.00676 10.8511 6.96905 10.9418 6.95199 11.0373L6.94132 11.1547V20.8453C6.94142 20.9424 6.96271 21.0382 7.00371 21.1262C7.0447 21.2142 7.10441 21.2922 7.17866 21.3547L7.27466 21.4213L15.6667 26.268C15.7508 26.3165 15.8445 26.3461 15.9412 26.3546C16.0379 26.3631 16.1354 26.3504 16.2267 26.3173L16.3333 26.268L24.7253 21.4227C24.8096 21.3742 24.8823 21.308 24.9382 21.2285C24.9942 21.1491 25.0321 21.0583 25.0493 20.9627L25.0587 20.8453V11.1547C25.0587 11.0577 25.0376 10.9619 24.9969 10.8739C24.9561 10.786 24.8967 10.708 24.8227 10.6453L24.7253 10.5773L16.3333 5.73199ZM16 10.6667C17.4145 10.6667 18.771 11.2286 19.7712 12.2288C20.7714 13.229 21.3333 14.5855 21.3333 16C21.3333 17.4145 20.7714 18.771 19.7712 19.7712C18.771 20.7714 17.4145 21.3333 16 21.3333C14.5855 21.3333 13.2289 20.7714 12.2288 19.7712C11.2286 18.771 10.6667 17.4145 10.6667 16C10.6667 14.5855 11.2286 13.229 12.2288 12.2288C13.2289 11.2286 14.5855 10.6667 16 10.6667ZM16 13.3333C15.2927 13.3333 14.6145 13.6143 14.1144 14.1144C13.6143 14.6145 13.3333 15.2927 13.3333 16C13.3333 16.7072 13.6143 17.3855 14.1144 17.8856C14.6145 18.3857 15.2927 18.6667 16 18.6667C16.7072 18.6667 17.3855 18.3857 17.8856 17.8856C18.3857 17.3855 18.6667 16.7072 18.6667 16C18.6667 15.2927 18.3857 14.6145 17.8856 14.1144C17.3855 13.6143 16.7072 13.3333 16 13.3333Z"
              fill="#6C5FD4"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.3333 3.42266C14.8029 3.15148 15.3315 2.99893 15.8733 2.97826C16.4151 2.95758 16.9538 3.06939 17.4427 3.30399L17.6667 3.42266L26.0587 8.26666C26.5306 8.53904 26.9286 8.92298 27.2178 9.38486C27.5069 9.84673 27.6785 10.3725 27.7173 10.916L27.7253 11.1533V20.844C27.7252 21.3888 27.5916 21.9252 27.3361 22.4063C27.0807 22.8875 26.7112 23.2987 26.26 23.604L26.06 23.7307L17.6667 28.576C17.1971 28.8472 16.6685 28.9997 16.1267 29.0204C15.5849 29.0411 15.0462 28.9293 14.5573 28.6947L14.3333 28.5747L5.94132 23.7333C5.46936 23.4609 5.07137 23.077 4.7822 22.6151C4.49304 22.1533 4.32152 21.6275 4.28266 21.084L4.27466 20.8467V11.1547C4.27493 10.6098 4.40877 10.0733 4.66446 9.5921C4.92015 9.11094 5.28989 8.69979 5.74133 8.39466L5.94132 8.26799L14.3333 3.42266ZM16.3333 5.73199C16.2492 5.68348 16.1555 5.65393 16.0588 5.64541C15.962 5.63689 15.8646 5.6496 15.7733 5.68266L15.6667 5.73199L7.27466 10.5773C7.19063 10.6259 7.11823 10.6922 7.0625 10.7717C7.00676 10.8511 6.96905 10.9418 6.95199 11.0373L6.94132 11.1547V20.8453C6.94142 20.9424 6.96271 21.0382 7.00371 21.1262C7.0447 21.2142 7.10441 21.2922 7.17866 21.3547L7.27466 21.4213L15.6667 26.268C15.7508 26.3165 15.8445 26.3461 15.9412 26.3546C16.0379 26.3631 16.1354 26.3504 16.2267 26.3173L16.3333 26.268L24.7253 21.4227C24.8096 21.3742 24.8823 21.308 24.9382 21.2285C24.9942 21.1491 25.0321 21.0583 25.0493 20.9627L25.0587 20.8453V11.1547C25.0587 11.0577 25.0376 10.9619 24.9969 10.8739C24.9561 10.786 24.8967 10.708 24.8227 10.6453L24.7253 10.5773L16.3333 5.73199ZM16 10.6667C17.4145 10.6667 18.771 11.2286 19.7712 12.2288C20.7714 13.229 21.3333 14.5855 21.3333 16C21.3333 17.4145 20.7714 18.771 19.7712 19.7712C18.771 20.7714 17.4145 21.3333 16 21.3333C14.5855 21.3333 13.2289 20.7714 12.2288 19.7712C11.2286 18.771 10.6667 17.4145 10.6667 16C10.6667 14.5855 11.2286 13.229 12.2288 12.2288C13.2289 11.2286 14.5855 10.6667 16 10.6667ZM16 13.3333C15.2927 13.3333 14.6145 13.6143 14.1144 14.1144C13.6143 14.6145 13.3333 15.2927 13.3333 16C13.3333 16.7072 13.6143 17.3855 14.1144 17.8856C14.6145 18.3857 15.2927 18.6667 16 18.6667C16.7072 18.6667 17.3855 18.3857 17.8856 17.8856C18.3857 17.3855 18.6667 16.7072 18.6667 16C18.6667 15.2927 18.3857 14.6145 17.8856 14.1144C17.3855 13.6143 16.7072 13.3333 16 13.3333Z"
              fill="url(#paint0_linear_96_1883)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_96_1883"
                x1="4.27466"
                y1="4.14345"
                x2="34.7672"
                y2="16.935"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#6C5FD4" />
                <stop offset="1" stop-color="#5DD3A9" />
              </linearGradient>
            </defs>
          </svg>
        </>
      );
    }
  };

  return (
    <div className={style.chatsWrapper}>
      <section className={style.chatsList}>
        <div className="m-4 flex flex-col gap-4">
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
            {usersList.map((user: IUser) => {
              return (
                <button
                  key={user.id}
                  className={cn(style.chatsUser, {
                    "bg-purple-200": isChatSelected(user.id),
                  })}
                  onClick={() =>
                    handleChatSelect(user.id, user.fullName, user.email)
                  }
                >
                  <UserPhoto />
                  <div className={style.userInfoWrapper}>
                    <div className={style.userName}>{user.fullName}</div>
                    <div className={style.userStatus}>
                      {onlineUsers.find((onlineUser: IUser) => {
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
        </div>
        <footer className={style.chatUserFooter}>{chatFooter()}</footer>
      </section>
      {chatWrapper()}
    </div>
  );
};

export default Chats;
