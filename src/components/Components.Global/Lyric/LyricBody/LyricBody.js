import React, { useRef, useEffect, memo, useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import styles from "./LyricBody.module.scss";
import PlayingIcon from "../../PlayingIcon/PlayingIcon";

function LyricBody({ setCount, data }) {
  const playing = useSelector((state) => state.playing);
  const songCurrentTime = useSelector((state) => state.songCurrentTime);

  const [size, setSize] = useState(20);

  const { image, title, lyricsText, textActiveIndex, count, sizes, textSize } =
    data;

  const ulRef = useRef(null);

  const scrollEvent = () => {
    setCount(0);
  };

  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.addEventListener("scroll", scrollEvent);
    }
    return () => {
      if (ulRef.current) {
        ulRef.current.removeEventListener("scroll", scrollEvent);
      }
    };
  }, [songCurrentTime, ulRef]);

  useEffect(() => {
    if (count > 5 && ulRef.current) {
      const pos =
        (ulRef.current.scrollHeight / lyricsText.length) *
        (textActiveIndex - 2);
      ulRef.current.scrollTop = pos;
    }
  }, [textActiveIndex]);

  useEffect(() => {
    const sizeFilter = sizes.filter((size) => {
      const { name } = size;
      return name === textSize;
    });

    setSize(sizeFilter[0].size);
  }, [textSize]);

  return (
    <Row className={styles.lyricBody}>
      <Col xl={5} lg={5} md={12} className={styles.lyricBodyLeft}>
        <div className={styles.imgWrap}>
          <img src={image} alt={title} />
          <div className={styles.imgLayer}>
            {playing ? <PlayingIcon lyric={true} /> : ""}
          </div>
        </div>
      </Col>
      <Col xl={7} lg={7} md={12} className={styles.lyricBodyRight}>
        <div className={styles.lyricBodyWrap}>
          {lyricsText.length > 0 ? (
            <ul ref={ulRef}>
              {lyricsText.map((lyricText, lyricTextIndex) => {
                const { text } = lyricText;
                const classItem = styles.item;
                const activeClass =
                  lyricTextIndex === textActiveIndex ? styles.itemActive : "";
                const overClass =
                  lyricTextIndex < textActiveIndex ? styles.itemOver : "";
                return (
                  <li
                    key={lyricTextIndex}
                    className={clsx(classItem, activeClass, overClass)}
                    style={{
                      fontSize: `${size}em`,
                    }}
                  >
                    {text}
                  </li>
                );
              })}
            </ul>
          ) : (
            <span>...</span>
          )}
        </div>
      </Col>
    </Row>
  );
}

export default memo(LyricBody);
