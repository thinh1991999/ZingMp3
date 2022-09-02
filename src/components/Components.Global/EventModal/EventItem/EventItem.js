import clsx from "clsx";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";

import styles from "./EventItem.module.scss";
import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function EventItem({
  data,
  active,
  activeIndex,
  index,
  handleBack,
  handleNext,
  setIdx,
  size,
}) {
  const [currentTime, setCurrentTime] = useState("");
  const [translateX, setTranslateX] = useState(0);

  const {
    coverV,
    coverS,
    thumbType,
    titleFormat,
    title,
    startText,
    guests,
    host: { name },
    startUrlText,
    subscribeText,
    followers,
    totalFollow,
  } = data;
  useEffect(() => {
    const startTime = data?.startTime;
    moment.locale("vi");
    const time = moment.unix(startTime).format("h:mm dddd[,] Do MMMM ");
    setCurrentTime(time);
  }, [data]);

  useEffect(() => {
    if (index - activeIndex > 1) {
      setTranslateX(-25);
    } else if (activeIndex - index > 1) {
      setTranslateX(25);
    } else {
      setTranslateX(0);
    }
  }, [index, activeIndex]);
  return (
    <div
      className={clsx(styles.container, active && styles.containerActive)}
      style={{
        transform: `translateX(${translateX}%)`,
      }}
    >
      <div
        className={styles.contentWrap}
        onClick={() => {
          !active && setIdx(index);
        }}
      >
        <div className={styles.content}>
          <div
            className={styles.blur}
            style={{
              backgroundImage: `url(${thumbType === 1 ? coverV : coverS})`,
            }}
          ></div>
          <div className={clsx(styles.img, thumbType === 2 && styles.imgPd)}>
            <img src={thumbType === 1 ? coverV : coverS} alt="" />
          </div>
        </div>
        <div className={styles.wrap}>
          <div className={styles.info}>
            <h5>{thumbType === 1 ? titleFormat : title}</h5>
            <h5>
              {name}
              {guests?.length > 0 ? ", " : null}
              {guests?.map((guest, index) => {
                const { name } = guest;
                return (
                  <span key={index}>
                    {index > 0 ? `, ` : ""}
                    {name}
                  </span>
                );
              })}
            </h5>
            <span>{startText}</span>
            <p>{currentTime}</p>
            <button>
              <PrimaryButton
                info={{
                  msg: subscribeText || startUrlText,
                }}
              ></PrimaryButton>
            </button>
            <div className={styles.liked}>
              <span>Lượt chúc mừng</span>
              {followers.map((follower) => {
                const { avatar, id } = follower;
                return <img src={avatar} key={id} alt="" />;
              })}
              <p>+{totalFollow}</p>
            </div>
          </div>
        </div>
        <div className={styles.layer}></div>
      </div>

      {active && (
        <>
          {activeIndex !== 0 && (
            <button
              className={styles.btnLeft}
              onClick={() => {
                handleBack();
              }}
            >
              <AiOutlineLeft />
            </button>
          )}
          {size - activeIndex !== 1 && (
            <button className={styles.btnRight} onClick={() => handleNext()}>
              <AiOutlineRight />
            </button>
          )}
        </>
      )}
    </div>
  );
}
