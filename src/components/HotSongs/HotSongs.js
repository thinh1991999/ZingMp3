import React, { useEffect } from "react";
import styles from "./HotSongs.module.scss";
import { HomeTitle, HotSongSlide, AlbumItem } from "..";
import { Row, Col } from "react-bootstrap";

function HotSongs({ data }) {
  const { title, items } = data;

  return (
    <div className={styles.hitSongs}>
      <HomeTitle msg={title} />
      <Row className={styles.hitSongsContainer}>
        <Col className={styles.hitSongsLeft} md={4} sm={4}>
          <HotSongSlide data={items} />
        </Col>
        <Col className={styles.hitSongsRight} md={7} sm={7}>
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
        </Col>
      </Row>
    </div>
  );
}

export default HotSongs;
