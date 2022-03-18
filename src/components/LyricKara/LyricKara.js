import React, { memo, useEffect, useState } from "react";
import styles from "./LyricKara.module.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";

function LyricKara({ data }) {
  const songCurrentTime = useSelector((state) => state.songCurrentTime);

  const { lyrics, textActiveIndex } = data;

  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(1);
  const [activeTop, setActiveTop] = useState(0);
  const [activeBottom, setActiveBottom] = useState(0);
  const [textTop, setTextTop] = useState([]);
  const [textBottom, setTextBottom] = useState([]);

  useEffect(() => {
    if (lyrics?.length !== 0 && lyrics) {
      setTextBottom(lyrics[bottom].words);
      setTextTop(lyrics[top].words);
    }
  }, [top, bottom]);

  useEffect(() => {
    const wordActive = textTop.findIndex((word) => {
      const { startTime, endTime } = word;
      const current = songCurrentTime * 1000;
      return startTime <= current && current < endTime;
    });

    const wordActiveB = textBottom.findIndex((word) => {
      const { startTime, endTime } = word;
      const current = songCurrentTime * 1000;
      return startTime <= current && current < endTime;
    });
    setActiveTop(wordActive);
    setActiveBottom(wordActiveB);
  }, [songCurrentTime]);

  useEffect(() => {
    if (lyrics) {
      if (textActiveIndex === lyrics.length - 1) {
        return;
      } else if (textActiveIndex >= 2) {
        if (textActiveIndex % 2 === 0) {
          setBottom(textActiveIndex + 1);
        } else {
          setTop(textActiveIndex + 1);
        }
      }
    }
  }, [textActiveIndex]);

  useEffect(() => {
    setTop(0);
    setBottom(1);
    setActiveTop(0);
    setActiveBottom(0);
  }, [lyrics]);

  if (!lyrics) {
    return (
      <div className={styles.kara}>
        <div className={styles.karaWrap}>
          <span>Karaoke chưa được hỗ trợ</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.kara}>
      <div className={styles.karaWrap}>
        <ul>
          <li>
            {textTop.map((item, index) => {
              const { data } = item;
              const activeClass = index <= activeTop ? styles.wrapActive : "";
              return (
                <div key={index} className={clsx(styles.wrap, activeClass)}>
                  <div className={styles.box}>{data}</div>
                  <div className={styles.layer}>{data}</div>
                </div>
              );
            })}
          </li>
          <li>
            {textBottom.map((item, index) => {
              const { data } = item;
              const activeClass =
                index <= activeBottom ? styles.wrapActive : "";
              return (
                <div key={index} className={clsx(styles.wrap, activeClass)}>
                  <div className={styles.box}>{data}</div>
                  <div className={styles.layer}>{data}</div>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(LyricKara);
