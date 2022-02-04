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

function AlbumItem({
  data,
  status,
  worldWide,
  index,
  singer = false,
  albumSong = false,
}) {
  const {
    currentAlbum,
    currentIndexSong,
    album: albumCurrent,
    playing,
    songLoading,
    currentSinger,
    singer: singerCurrent,
  } = useSelector((state) => state);

  const [activeSongAlbum, setActiveSongAlbum] = useState(false);
  const [activeSongSinger, setActiveSongSinger] = useState(false);
  const [playingSong, setPlayingSong] = useState(false);
  const [loadingSong, setLoadingSong] = useState(false);

  const dispatch = useDispatch();

  const { artistsNames, title = " ", album = {}, thumbnailM, duration } = data;
  const { title: albumTitle } = album;
  const { encodeId } = albumCurrent;
  const { id, alias } = singerCurrent;
  const newDuration = getTime(duration);

  const handlePlaySingleSong = () => {
    if (singer) {
      if (alias === currentSinger) {
        if (index === currentIndexSong) {
          dispatch(actions.setPlaying(!playing));
        } else {
          dispatch(actions.playSongSameSinger(index));
        }
      } else {
        dispatch(actions.playSongAnotherSinger(index));
      }
    }
    if (albumSong) {
      if (encodeId === currentAlbum) {
        if (index === currentIndexSong) {
          dispatch(actions.setPlaying(!playing));
        } else {
          dispatch(actions.playSongSameAlbum(index));
        }
      } else {
        dispatch(actions.playSongAnotherAlbum(index));
      }
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
    if (index === currentIndexSong) {
      if (encodeId === currentAlbum) {
        setActiveSongAlbum(true);
      }
      if (alias === currentSinger) {
        setActiveSongSinger(true);
      }
    } else {
      setActiveSongAlbum(false);
      setActiveSongSinger(false);
    }
  }, [currentIndexSong, playing]);

  useEffect(() => {
    if (activeSongAlbum || activeSongSinger) {
      setPlayingSong(playing);
    } else {
      setPlayingSong(false);
    }
  }, [playing, currentIndexSong, activeSongAlbum, activeSongSinger]);

  useEffect(() => {
    if ((activeSongAlbum && songLoading) || (activeSongSinger && songLoading)) {
      setLoadingSong(true);
      setPlayingSong(false);
    } else if (
      (activeSongAlbum && !songLoading) ||
      (activeSongSinger && !songLoading)
    ) {
      setLoadingSong(false);
    }
  }, [activeSongAlbum, songLoading, activeSongSinger]);

  const statusClass = status === 2 || !worldWide ? styles.itemStatus : "";
  const activeClass =
    activeSongAlbum || activeSongSinger ? styles.itemActive : "";
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
