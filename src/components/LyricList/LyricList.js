import React, { useEffect, useRef, useState } from "react";
import styles from "./LyricList.module.scss";
import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";
import { PlayingIcon, ButtonIcon } from "..";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

function LyricList() {
  const { listSong, currentIndexSong, playing, invi, songLoading } =
    useSelector((state) => state);

  const dispatch = useDispatch();

  const [position, setPosition] = useState("0");
  const [index, setIndex] = useState(currentIndexSong);
  const [canMove, setCanMove] = useState(false);

  const listRef = useRef(null);
  const wrapRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const handleSong = (index) => {
    if (index === currentIndexSong) {
      dispatch(actions.setPlaying(!playing));
    } else {
      dispatch(actions.playSongSameAlbum(index));
    }
  };

  const handleNext = () => {
    setIndex(index + 2);
    dispatch(actions.setInvi(false));
  };

  const handleBack = () => {
    setIndex(index - 2);
    dispatch(actions.setInvi(false));
  };

  useEffect(() => {
    const newPosition = `calc(32% + 2% + -68% / 3 * ${currentIndexSong})`;
    setPosition(newPosition);
    if (!canMove) {
      setIndex(currentIndexSong);
    }
  }, [currentIndexSong]);

  useEffect(() => {
    if (wrapRef) {
      if (!canMove) {
        wrapRef.current.style.transform = `translateX(${position})`;
      }
    }
  }, [position]);

  useEffect(() => {
    if (index < 0) {
      setIndex(0);
      return;
    }
    if (wrapRef) {
      const newPosition = `calc(32% + 2% + -68% / 3 * ${index})`;
      wrapRef.current.style.transform = `translateX(${newPosition})`;
    }
  }, [index]);

  const mouseOver = () => {
    setCanMove(true);
  };

  const mouseOut = () => {
    setCanMove(false);
  };

  useEffect(() => {
    if (listRef) {
      listRef.current.addEventListener("mouseenter", mouseOver);
      listRef.current.addEventListener("mouseleave", mouseOut);
    }
    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("mouseover", mouseOver);
        listRef.current.removeEventListener("mouseleave", mouseOut);
      }
    };
  }, []);

  useEffect(() => {
    if (!canMove || invi) {
      wrapRef.current.style.transform = `translateX(${position})`;
      setIndex(currentIndexSong);
    }
  }, [canMove, invi]);

  return (
    <div className={clsx(styles.list, invi && styles.inviList)} ref={listRef}>
      <div className={styles.wrap} ref={wrapRef}>
        {listSong.map((item, index) => {
          const { encodeId, title, artistsNames, thumbnailM } = item;
          const newImage = thumbnailM.replace("w240", "w480");
          const valid = index === currentIndexSong;
          const activeClass = valid ? styles.itemActive : "";
          return (
            <div key={encodeId} className={clsx(styles.item, activeClass)}>
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
            </div>
          );
        })}
      </div>
      {currentIndexSong === 0 || index === 0 ? (
        ""
      ) : (
        <div
          className={styles.listBtnLeft}
          onClick={handleBack}
          ref={leftBtnRef}
        >
          <ButtonIcon fill={true} lyric={true}>
            <IoIosArrowBack />
          </ButtonIcon>
        </div>
      )}
      {currentIndexSong === listSong.length || index === listSong.length ? (
        ""
      ) : (
        <div
          className={styles.listBtnRight}
          onClick={handleNext}
          ref={rightBtnRef}
        >
          <ButtonIcon fill={true} lyric={true}>
            <IoIosArrowForward />
          </ButtonIcon>
        </div>
      )}
    </div>
  );
}

export default LyricList;
