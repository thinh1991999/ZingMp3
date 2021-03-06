import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./ButtonIcon.module.scss";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

function ButtonIcon({
  children,
  circle,
  album,
  topic,
  fill,
  noClick,
  display = true,
  modal,
  active = false,
  lyric,
  player = false,
  popper = { show: false, msg: "", position: "CenterUp" },
}) {
  const { popperInfo } = useSelector((state) => state);
  const [messPopper, setMessPopper] = useState(popper.msg);

  const dispatch = useDispatch();
  const btnRef = useRef(null);

  const dispatchPopper = () => {};

  const handleEnter = (e) => {
    if (popper.show) {
      const { width, height, top, left, bottom, right } =
        e.target.getBoundingClientRect();
      dispatch(
        actions.setPopperInfo({
          show: true,
          top,
          left,
          bottom,
          right,
          width,
          height,
          position: popper.position,
        })
      );
      dispatch(actions.setPopperMess(popper.msg));
    }
  };
  const handleLeave = (e) => {
    if (popper.show) {
      dispatch(actions.setPopperInfo({ show: false }));
      // dispatch(actions.setPopperMess(""));
    }
  };

  useEffect(() => {
    if (player) {
      dispatch(actions.setPopperMess(popper.msg));
    }
  }, [popper.msg, player]);

  useEffect(() => {
    btnRef.current.addEventListener("mouseenter", handleEnter);
    btnRef.current.addEventListener("mouseleave", handleLeave);

    return () => {
      if (btnRef.current) {
        btnRef.current.removeEventListener("mouseenter", handleEnter);
        btnRef.current.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, [popper.msg, player]);

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
    <div
      className={finalClass}
      style={{
        display: `${display ? "" : "none"}`,
      }}
      ref={btnRef}
      // onMouseOver={handlePopperOver}
    >
      {children}
    </div>
  );
}

export default memo(ButtonIcon);
