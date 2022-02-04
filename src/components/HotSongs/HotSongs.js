import React, { useEffect } from "react";
import styles from "./HotSongs.module.scss";
import { HomeTitle, HotSongSlide, AlbumItem } from "..";
import { Row } from "react-bootstrap";

function HotSongs({ data }) {
  const { title, items } = data;

  return (
    <div className={styles.hitSongs}>
      <HomeTitle msg={title} />
      <Row className={styles.hitSongsContainer}>
        <div className={styles.hitSongsLeft}>
          <HotSongSlide data={items} />
        </div>
        <div className={styles.hitSongsRight}>
          {items.map((item, index) => {
            const { encodeId, isWorldWide, streamingStatus: status } = item;
            return (
              <AlbumItem
                data={item}
                index={index}
                status={status}
                worldWide={isWorldWide}
                key={encodeId}
                singer={true}
              />
            );
          })}
        </div>
      </Row>
    </div>
  );
}

export default HotSongs;
