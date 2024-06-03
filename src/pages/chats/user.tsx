import React from "react";
import { useSelector } from "react-redux";

import { selectChat, setCurrentTab } from "@/entities/chat/model/chatSlice";
import { useAppDispatch } from "@/app/store";

import style from "./style.module.css";

export const User = () => {
  const dispatch = useAppDispatch();
  const { selectedChat } = useSelector(selectChat);

  console.log(selectedChat);

  return (
    <section className={style.chatWrapper}>
      <header className={style.userHeader}>
        <span className={style.profileHeaderText}>
          {selectedChat?.memberName}
        </span>
        <span className={style.profileHeaderLowerText}>
          {!selectedChat ? "Выберите чат" : "В сети"}
        </span>
      </header>

      <form className={style.profileForm}>
        {selectedChat && (
          <>
            <div className="flex flex-col gap-2">
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
                  value={selectedChat?.memberName}
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
                <input
                  value={selectedChat?.memberEmail}
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
            </div>
            <button
              onClick={() => dispatch(setCurrentTab("chat"))}
              className={style.profileSubmitButton}
            >
              <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.6201 12.4267L8.95342 3.09334C8.21674 2.72669 7.38491 2.59616 6.57133 2.71954C5.75776 2.84293 5.00203 3.21424 4.40719 3.78283C3.81236 4.35142 3.40736 5.08964 3.24741 5.89682C3.08746 6.70401 3.18035 7.54088 3.51342 8.29334L6.71342 15.4533C6.78603 15.6265 6.82342 15.8123 6.82342 16C6.82342 16.1877 6.78603 16.3736 6.71342 16.5467L3.51342 23.7067C3.24235 24.3156 3.12776 24.9827 3.18006 25.6472C3.23235 26.3117 3.44988 26.9526 3.81286 27.5116C4.17585 28.0707 4.67279 28.5301 5.25852 28.8483C5.84425 29.1664 6.5002 29.3332 7.16675 29.3333C7.79106 29.3271 8.40607 29.1813 8.96675 28.9067L27.6334 19.5733C28.2956 19.2403 28.8521 18.7297 29.241 18.0988C29.6299 17.4678 29.8358 16.7412 29.8358 16C29.8358 15.2588 29.6299 14.5322 29.241 13.9012C28.8521 13.2703 28.2956 12.7598 27.6334 12.4267H27.6201ZM26.4334 17.1867L7.76675 26.52C7.52164 26.6377 7.24639 26.6776 6.97793 26.6345C6.70947 26.5913 6.46063 26.4671 6.26477 26.2785C6.06891 26.0899 5.93539 25.8459 5.88213 25.5793C5.82886 25.3126 5.85839 25.0361 5.96675 24.7867L9.15342 17.6267C9.19467 17.5311 9.23029 17.4331 9.26009 17.3333H18.4468C18.8004 17.3333 19.1395 17.1929 19.3896 16.9428C19.6396 16.6928 19.7801 16.3536 19.7801 16C19.7801 15.6464 19.6396 15.3072 19.3896 15.0572C19.1395 14.8072 18.8004 14.6667 18.4468 14.6667H9.26009C9.23029 14.5669 9.19467 14.469 9.15342 14.3733L5.96675 7.21334C5.85839 6.96396 5.82886 6.68741 5.88213 6.42077C5.93539 6.15413 6.06891 5.91015 6.26477 5.72154C6.46063 5.53293 6.70947 5.40872 6.97793 5.36554C7.24639 5.32237 7.52164 5.36231 7.76675 5.48001L26.4334 14.8133C26.6518 14.9252 26.8351 15.0952 26.9631 15.3046C27.0911 15.514 27.1588 15.7546 27.1588 16C27.1588 16.2454 27.0911 16.486 26.9631 16.6954C26.8351 16.9048 26.6518 17.0748 26.4334 17.1867Z"
                  fill="white"
                />
              </svg>
              <span className={style.profileSubmitButtonText}>Написать</span>
            </button>
          </>
        )}
      </form>
    </section>
  );
};
