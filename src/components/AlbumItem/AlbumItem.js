import React, { memo, useEffect, useState } from "react";
import styles from "./AlbumItem.module.scss";
import { PlayingIcon, ButtonIcon } from "..";
import { getTime } from "../../funtions";
import { HiOutlineMusicNote } from "react-icons/hi";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

function AlbumItem({ data, status, worldWide, index }) {
  const {
    currentAlbum,
    currentIndexSong,
    album: albumCurrent,
    playing,
    songLoading,
  } = useSelector((state) => state);

  const [activeSong, setActiveSong] = useState(false);
  const [playingSong, setPlayingSong] = useState(false);
  const [loadingSong, setLoadingSong] = useState(false);

  const dispatch = useDispatch();

  const { artistsNames, title = " ", album = {}, thumbnailM, duration } = data;
  const { title: albumTitle } = album;
  const { encodeId } = albumCurrent;
  const newDuration = getTime(duration);

  const handlePlaySingleSong = () => {
    if (encodeId === currentAlbum) {
      if (index === currentIndexSong) {
        dispatch(actions.setPlaying(!playing));
      } else {
        dispatch(actions.playSongSameAlbum(index));
      }
    } else {
      dispatch(actions.playSongAnotherAlbum(index));
    }
  };

  const handleShowLyric = () => {
    if (encodeId === currentAlbum) {
      if (index !== currentIndexSong) {
        dispatch(actions.playSongSameAlbum(index));
      }
    } else {
      dispatch(actions.playSongAnotherAlbum(index));
    }
    dispatch(actions.setShowLyric(true));
  };

  useEffect(() => {
    if (index === currentIndexSong && encodeId === currentAlbum) {
      setActiveSong(true);
    } else {
      setActiveSong(false);
    }
  }, [currentIndexSong, playing]);

  useEffect(() => {
    if (activeSong) {
      setPlayingSong(playing);
    } else {
      setPlayingSong(false);
    }
  }, [playing, currentIndexSong]);

  useEffect(() => {
    if (activeSong && songLoading) {
      setLoadingSong(true);
      setPlayingSong(false);
    } else if (activeSong && !songLoading) {
      setLoadingSong(false);
    }
  }, [activeSong, songLoading]);

  const statusClass = status === 2 || !worldWide ? styles.itemStatus : "";
  const activeClass = activeSong ? styles.itemActive : "";
  const playingClass = playingSong ? styles.itemPlaying : "";
  const finalClass = clsx(styles.item, statusClass, activeClass, playingClass);

  return (
    <div className={finalClass}>
      <div className={styles.left}>
        <div className={styles.icon}>
          <HiOutlineMusicNote className={styles.musicIcon} />
          <input type="checkbox" id="checkbox" className={styles.checkbox} />
          <label htmlFor="checkbox"></label>
        </div>
        <div className={styles.img}>
          <img src={thumbnailM} alt="" />
          <div className={styles.layer} />
          <div className={styles.play} onClick={handlePlaySingleSong}>
            {loadingSong ? (
              <PlayingIcon loading={true} />
            ) : (
              <BsFillPlayFill className={styles.playIcon} />
            )}
            {playingSong ? (
              <div className={styles.playing}>
                <PlayingIcon className={styles.playingIcon} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.info}>
          <h3>{title}</h3>
          <span>{artistsNames}</span>
        </div>
      </div>
      <div className={styles.center}>
        <p>{albumTitle ? albumTitle : ""}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.rightBtn}>
          <div className={styles.btn}>
            <ButtonIcon
              album={true}
              popper={{
                show: true,
                msg: "Thêm vào thư viện",
              }}
            >
              <AiOutlineHeart />
            </ButtonIcon>
          </div>
          <div className={styles.btn} onClick={() => handleShowLyric()}>
            <ButtonIcon
              album={true}
              popper={{
                show: true,
                msg: "Phát cùng lời bài hát",
              }}
            >
              <GiMicrophone />
            </ButtonIcon>
          </div>
          <div className={styles.btn}>
            <ButtonIcon
              album={true}
              popper={{
                show: true,
                msg: "Khác",
              }}
            >
              <BsThreeDots />
            </ButtonIcon>
          </div>
        </div>
        <span>{newDuration}</span>
      </div>
    </div>
  );
}

export default memo(AlbumItem);
