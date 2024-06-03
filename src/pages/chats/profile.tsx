import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import style from "./style.module.css";
import { selectChat } from "@/entities/chat/model/chatSlice";

export const Profile = () => {
  const { authUser } = useSelector(selectChat);

  const formHandler = () => {
    console.log("test");
  };

  return (
    <section className={style.chatWrapper}>
      <header className={style.profileHeader}>
        <span className={style.profileHeaderText}>{authUser?.fullName}</span>
      </header>
      <form className={style.profileForm} action={formHandler}>
        {/* <div className="flex flex-col gap-2"> */}
        <div className={style.chatFooterInputWrapper}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="13.0001"
              cy="7.58333"
              r="4.33333"
              stroke="#BBBBBB"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.0001 15.1667C8.81192 15.1667 5.41675 16.8643 5.41675 18.9584C5.41675 21.0524 8.81192 22.75 13.0001 22.75C17.1882 22.75 20.5834 21.0524 20.5834 18.9584C20.5834 17.7924 19.5309 16.7494 17.8751 16.0539"
              stroke="#BBBBBB"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input
            value={authUser?.fullName}
            className={style.profileFooterInput}
          />
          <svg
            style={{ cursor: "pointer" }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 15.625V16.5625V16.5625C5 17.4254 5.69956 18.125 6.5625 18.125H14.5C16.1569 18.125 17.5 16.7819 17.5 15.125V5.9375C17.5 5.07456 16.8004 4.375 15.9375 4.375V4.375H15H14.6875M5 15.625V7.375C5 5.71815 6.34315 4.375 8 4.375H14.6875M5 15.625V15.625C3.61929 15.625 2.5 14.5057 2.5 13.125L2.5 4.875C2.5 3.21815 3.84315 1.875 5.5 1.875H12.1875C13.5682 1.875 14.6875 2.99429 14.6875 4.375V4.375"
              stroke="#BBBBBB"
            />
          </svg>
        </div>
        <div className={style.chatFooterInputWrapper}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5835 9.75L13.0002 13.5417L18.4168 9.75"
              stroke="#B0B0B0"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.16675 18.4167V7.58335C2.16675 7.00872 2.39502 6.45762 2.80135 6.05129C3.20768 5.64496 3.75878 5.41669 4.33341 5.41669H21.6667C22.2414 5.41669 22.7925 5.64496 23.1988 6.05129C23.6051 6.45762 23.8334 7.00872 23.8334 7.58335V18.4167C23.8334 18.9913 23.6051 19.5424 23.1988 19.9488C22.7925 20.3551 22.2414 20.5834 21.6667 20.5834H4.33341C3.75878 20.5834 3.20768 20.3551 2.80135 19.9488C2.39502 19.5424 2.16675 18.9913 2.16675 18.4167Z"
              stroke="#B0B0B0"
            />
          </svg>
          <input value={authUser?.email} className={style.profileFooterInput} />
          <svg
            style={{ cursor: "pointer" }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 15.625V16.5625V16.5625C5 17.4254 5.69956 18.125 6.5625 18.125H14.5C16.1569 18.125 17.5 16.7819 17.5 15.125V5.9375C17.5 5.07456 16.8004 4.375 15.9375 4.375V4.375H15H14.6875M5 15.625V7.375C5 5.71815 6.34315 4.375 8 4.375H14.6875M5 15.625V15.625C3.61929 15.625 2.5 14.5057 2.5 13.125L2.5 4.875C2.5 3.21815 3.84315 1.875 5.5 1.875H12.1875C13.5682 1.875 14.6875 2.99429 14.6875 4.375V4.375"
              stroke="#BBBBBB"
            />
          </svg>
        </div>
        {/* </div> */}
        {/* <button type="submit" className={style.profileSubmitbutton}>
          Сохранить
        </button> */}
      </form>
    </section>
  );
};
