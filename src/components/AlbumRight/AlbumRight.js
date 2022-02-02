import React, { useState } from "react";
import styles from "./AlbumRight.module.scss";
import { BiSort } from "react-icons/bi";
import { AlbumItem } from "..";
import { getTimeText } from "../../funtions";

function AlbumRight({ title, song }) {
  const [songs, setSongs] = useState(song);

  const { items, total, totalDuration } = songs;

  const newTotalDuration = getTimeText(totalDuration);

  return (
    <div className={styles.albumRight}>
      <div className={styles.albumWrap}>
        <h4 className={styles.albumRightTitle}>
          <span>Lời tựa</span>
          {title}
        </h4>
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <BiSort className={styles.sortBtn} /> bài hát
          </div>
          <div className={styles.infoCenter}>album</div>
          <div className={styles.infoRight}>thời gian</div>
        </div>
        {items.map((item, index) => {
          const { encodeId, streamingStatus, isWorldWide } = item;
          return (
            <AlbumItem
              key={encodeId}
              status={streamingStatus}
              worldWide={isWorldWide}
              data={item}
              index={index}
            />
          );
        })}
      </div>
      <p>
        {total} bài hát - {newTotalDuration}
      </p>
    </div>
  );
}

export default AlbumRight;
