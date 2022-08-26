import React from "react";
import styles from "./PlayingIcon.module.scss";
import logo from "./playingIcon.gif";
import logo2 from "./loadingIcon.gif";
import clsx from "clsx";

function PlayingIcon({ circle, loading, lyric, topic }) {
  const topicClass = topic ? styles.wrapTopic : "";
  const lyricClass = lyric ? styles.wrapLyric : "";
  const circleClass = circle ? styles.wrapCircle : "";
  const finalClass = clsx(styles.wrap, circleClass, lyricClass, topicClass);
  return (
    <div className={finalClass}>
      <img src={loading ? logo2 : logo} alt="" />
    </div>
  );
}

export default PlayingIcon;
