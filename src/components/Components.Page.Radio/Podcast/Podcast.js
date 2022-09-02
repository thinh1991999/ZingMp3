import React from "react";
import styles from "./Podcast.module.scss";

export default function Podcast({ data }) {
  const { thumbnailM, title } = data;
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={thumbnailM} alt="" />
      </div>
      <p className="text-link two-line">{title}</p>
    </div>
  );
}
