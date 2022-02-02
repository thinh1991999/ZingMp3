import React, { useEffect, useState } from "react";
import styles from "./HotSongSlide.module.scss";
import clsx from "clsx";

function HotSongSlide({ data }) {
  const [slide, setSlides] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);
  const [centerIndex, setCenterIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(2);

  useEffect(() => {
    if (activeIndex === slide.length - 2) {
      setLastIndex(0);
    } else if (activeIndex === slide.length - 1) {
      setLastIndex(1);
    }
  }, [activeIndex, centerIndex, lastIndex]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveIndex(centerIndex);
      setCenterIndex(lastIndex);
      setLastIndex(lastIndex + 1);
    }, 3000);
    return () => {
      clearInterval(slideInterval);
    };
  });

  return (
    <>
      <ul className={styles.hitSongList}>
        {slide.map((item, itemIndex) => {
          const { thumbnailM: image, title, encodeId } = item;
          let positionClass = styles.hitSongItem;
          if (itemIndex === activeIndex) {
            positionClass = clsx(styles.hitSongItem, styles.hitSongItemActive);
          } else if (itemIndex === centerIndex) {
            positionClass = clsx(styles.hitSongItem, styles.hitSongItemCenter);
          } else if (itemIndex === lastIndex) {
            positionClass = clsx(styles.hitSongItem, styles.hitSongItemLast);
          }
          return (
            <li className={positionClass} key={encodeId}>
              <a>
                <img src={image} alt={title} />
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default HotSongSlide;
