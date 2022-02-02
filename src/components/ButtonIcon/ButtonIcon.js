import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./ButtonIcon.module.scss";
import clsx from "clsx";
import Popper from "../Popper/Popper";

function ButtonIcon({
  children,
  circle,
  album,
  topic,
  fill,
  noClick,
  display = true,
  modal,
  active,
  lyric,
  popper = { show: false, msg: "", position: "CenterUp" },
}) {
  const [popperDisplay, setPopperDisplay] = useState(false);

  const btnRef = useRef(null);

  const handlePopperOver = (e) => {};
  useEffect(() => {
    btnRef.current.addEventListener("mousemove", () => {
      setPopperDisplay(true);
    });
    btnRef.current.addEventListener("mouseout", () => {
      setPopperDisplay(false);
    });
  }, []);

  const circleClass = circle ? styles.iconBtnCircle : "";
  const topicClass = topic ? styles.iconBtnTopic : "";
  const fillClass = fill ? styles.iconBtnFill : "";
  const albumClass = album ? styles.iconBtnAlbum : "";
  const modalClass = modal ? styles.iconModal : "";
  const activeClass = active ? styles.iconActive : "";
  const noClickClass = noClick ? styles.iconNoClick : "";
  const lyricClass = lyric ? styles.iconLyric : "";

  const finalClass = clsx(
    styles.iconBtn,
    circleClass,
    topicClass,
    fillClass,
    albumClass,
    modalClass,
    activeClass,
    noClickClass,
    lyricClass
  );

  return (
    <button
      className={finalClass}
      style={{
        display: `${display ? "" : "none"}`,
      }}
      ref={btnRef}
      onMouseOver={handlePopperOver}
    >
      {children}
      {popper.show ? (
        <Popper
          properties={{
            position: "center",
            msg: popper.msg,
            popperDisplay,
            position: popper.position,
          }}
        />
      ) : (
        ""
      )}
    </button>
  );
}

export default memo(ButtonIcon);
