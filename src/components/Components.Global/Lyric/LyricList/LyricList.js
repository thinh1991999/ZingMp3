import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./LyricList.module.scss";
import "./LyricList.css";

import PlayingIcon from "../../PlayingIcon/PlayingIcon";
import { actions } from "../../../../store";

SwiperCore.use([Navigation]);

function LyricList() {
  const playing = useSelector((state) => state.song.playing);
  const listSong = useSelector((state) => state.song.listSong);
  const invi = useSelector((state) => state.song.invi);
  const songLoading = useSelector((state) => state.song.songLoading);
  const currentSong = useSelector((state) => state.song.currentSong);

  const dispatch = useDispatch();

  const [canMove, setCanMove] = useState(false);
  const [width, setWidth] = useState(0);

  const listRef = useRef(null);
  const wrapRef = useRef(null);

  const currentIndexSong = useMemo(() => {
    return listSong.findIndex((item) => {
      return item.encodeId === currentSong.encodeId;
    });
  }, [currentSong, listSong]);

  const handleSong = (item) => {
    if (item.encodeId === currentSong?.encodeId) {
      dispatch(actions.setPlaying(!playing));
    } else {
      const { streamingStatus } = item;
      if (streamingStatus === 1) {
        dispatch(actions.playSongSameAlbum(item));
      } else {
        toast.error("Bài hát này chưa được hỗ trợ");
      }
    }
  };

  const handleEnter = () => {
    setCanMove(true);
  };

  const handleLeave = () => {
    setCanMove(false);
  };

  useEffect(() => {
    if ((!canMove && typeof currentIndexSong === "number") || invi) {
      if (width >= 1024) {
        wrapRef.current.swiper.slideTo(currentIndexSong - 2);
      } else if (width >= 768) {
        wrapRef.current.swiper.slideTo(currentIndexSong - 1);
      } else {
        wrapRef.current.swiper.slideTo(currentIndexSong);
      }
    }
  }, [canMove, width, currentIndexSong, invi]);

  const eventResize = (e) => {
    const { innerWidth } = e.target;
    setWidth(innerWidth);
  };

  useEffect(() => {
    if (songLoading) {
      setCanMove(false);
    }
  }, [songLoading]);

  useEffect(() => {
    window.addEventListener("resize", eventResize);
    setWidth(window.screen.width);
    return () => {
      window.removeEventListener("resize", eventResize);
    };
  }, []);

  return (
    <div
      className={clsx(styles.list, invi && styles.inviList)}
      ref={listRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Swiper
        id="swiper"
        className={clsx("swiper-margin", styles.wrap)}
        ref={wrapRef}
        slidesPerView={3}
        spaceBetween={10}
        navigation
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          500: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        centeredSlides={true}
      >
        {listSong.map((item, index) => {
          const { encodeId, title, artistsNames, thumbnailM } = item;
          const newImage = thumbnailM.replace("w240", "w480");
          const valid = encodeId === currentSong?.encodeId;
          const activeClass = valid ? styles.itemActive : "";
          return (
            <SwiperSlide
              key={encodeId}
              className={clsx(styles.item, activeClass)}
            >
              <div className={styles.itemBox}>
                <div className={styles.itemWrap}>
                  <img src={newImage} alt={title} />
                  <div className={styles.layer}></div>
                  <div className={styles.playing}>
                    {playing ? <PlayingIcon lyric={true} /> : ""}
                  </div>
                  <div className={styles.btn}>
                    <button
                      className={styles.btnWrap}
                      onClick={() => handleSong(item)}
                    >
                      {!valid && <BsPlayCircle />}
                      {valid && playing ? <BsPauseCircle /> : ""}
                      {valid && !playing ? <BsPlayCircle /> : ""}
                    </button>
                  </div>
                </div>
                <h2>{title}</h2>
                <h3>{artistsNames}</h3>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default LyricList;
