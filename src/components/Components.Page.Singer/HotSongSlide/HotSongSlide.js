import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import styles from "./HotSongSlide.module.scss";
import { actions } from "../../../store";

function HotSongSlide({ data }) {
  const playing = useSelector((state) => state.song.playing);
  const currentSong = useSelector((state) => state.song.currentSong);

  const dispatch = useDispatch();

  const slide = useRef(data).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const [centerIndex, setCenterIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(2);

  const handlePlaySingerSong = useCallback(
    (item) => {
      if (item.encodeId === currentSong?.encodeId) {
        dispatch(actions.setPlaying(!playing));
      } else {
        dispatch(actions.playSongAnotherSinger(item));
      }
    },
    [currentSong, dispatch, playing]
  );

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (activeIndex === slide.length - 2) {
        setLastIndex(0);
      } else if (activeIndex === slide.length - 1) {
        setLastIndex(1);
      } else {
        setLastIndex(lastIndex + 1);
      }
      setActiveIndex(centerIndex);
      setCenterIndex(lastIndex);
    }, 4000);
    return () => {
      clearInterval(slideInterval);
    };
  }, [activeIndex, centerIndex, lastIndex, slide]);

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
            <li
              className={positionClass}
              key={encodeId}
              onClick={() => {
                handlePlaySingerSong(item);
              }}
            >
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
