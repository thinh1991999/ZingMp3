import React from "react";
import { BiSort } from "react-icons/bi";
import { getTimeText } from "../../../funtions";
import SongItem from "../../Components.Global/SongItem/SongItem";
import styles from "./AlbumRight.module.scss";

function AlbumRight({ title, song }) {
  const { items, total, totalDuration } = song;

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
            <SongItem
              key={encodeId}
              status={streamingStatus}
              worldWide={isWorldWide}
              data={item}
              index={index}
              albumSong={true}
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
