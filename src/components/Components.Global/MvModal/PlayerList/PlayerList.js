import clsx from "clsx";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./PlayerList.module.scss";

export default function PlayerList({
  playList,
  autoPlay,
  setAutoPlay,
  currentId,
  setCurrentId,
}) {
  return (
    <div className={styles.rightWrap}>
      <div className={styles.top}>
        <h6>Danh sách phát</h6>
        <div>
          <span>Tự động phát</span>
          <input type="checkbox" />
          <div
            className={clsx(
              styles.checkbox,
              autoPlay ? styles.activeCheckBox : ""
            )}
            onClick={() => setAutoPlay(!autoPlay)}
          >
            <div className={styles.toggleWrap}>
              <div className={styles.checkboxToggle}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.center}>
        {playList.map((recommend) => {
          const { encodeId, title, artists, thumbnailM } = recommend;
          return (
            <div
              className={clsx(
                styles.item,
                encodeId === currentId ? styles.itemActive : null
              )}
            >
              <div
                className={styles.imgWrap}
                onClick={() => {
                  setCurrentId(encodeId);
                }}
              >
                <img src={thumbnailM} alt="" />
                <div className={styles.layer}></div>
                <div className={styles.icon}>
                  {encodeId === currentId ? (
                    <span>Đang phát</span>
                  ) : (
                    <BsFillPlayFill />
                  )}
                </div>
              </div>
              <div className={styles.itemRight}>
                <h6
                  onClick={() => {
                    setCurrentId(encodeId);
                  }}
                >
                  {title}
                </h6>
                <p>
                  {artists.map((artist, index) => {
                    const { id, alias, name } = artist;
                    return (
                      <Link key={id} to={"/singer/" + alias}>
                        {name}
                        {index === artists.length - 1 ? "" : ","}
                      </Link>
                    );
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
