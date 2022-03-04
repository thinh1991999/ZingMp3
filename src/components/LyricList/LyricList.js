import React, { useEffect, useRef, useState } from "react";
import styles from "./LyricList.module.scss";
import "./LyricList.css";
import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";
import { PlayingIcon, ButtonIcon } from "..";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);

function LyricList() {
  const { listSong, currentIndexSong, playing, invi, songLoading } =
    useSelector((state) => state);

  const dispatch = useDispatch();

  const [index, setIndex] = useState(currentIndexSong);
  const [canMove, setCanMove] = useState(false);
  const [width, setWidth] = useState(0);

  const listRef = useRef(null);
  const wrapRef = useRef(null);

  const handleSong = (index) => {
    // if (index === currentIndexSong) {
    //   dispatch(actions.setPlaying(!playing));
    // } else {
    //   dispatch(actions.playSongSameAlbum(index));
    // }
    console.log(wrapRef.current.swiper.slideTo(10, 1000));
  };

  const handleEnter = () => {
    setCanMove(true);
  };

  const handleLeave = () => {
    setCanMove(false);
  };

  useEffect(() => {
    console.log(wrapRef.current.swiper);
  }, []);

  useEffect(() => {
    if (!canMove && typeof currentIndexSong === Number) {
      if (width >= 1024) {
        wrapRef.current.swiper.slideTo(currentIndexSong - 2);
      } else if (width >= 768) {
        wrapRef.current.swiper.slideTo(currentIndexSong - 1);
      } else {
        wrapRef.current.swiper.slideTo(currentIndexSong);
      }
    }
  }, [canMove, width, currentIndexSong]);

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
        className={styles.wrap}
        ref={wrapRef}
        slidesPerView={3}
        spaceBetween={10}
        navigation
        breakpoints={{
          // when window width is >= 640px
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {listSong.map((item, index) => {
          const { encodeId, title, artistsNames, thumbnailM } = item;
          const newImage = thumbnailM.replace("w240", "w480");
          const valid = index === currentIndexSong;
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
                      onClick={() => handleSong(index)}
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
