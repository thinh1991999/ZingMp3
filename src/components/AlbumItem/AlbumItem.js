import React, { memo, useEffect, useState } from "react";
import styles from "./AlbumItem.module.scss";
import { PlayingIcon, ButtonIcon } from "..";
import { getTime } from "../../funtions";
import { HiOutlineMusicNote } from "react-icons/hi";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

function AlbumItem({
  data,
  status,
  index,
  singer = false,
  albumSong = false,
  small,
  chartHome,
  listSong,
}) {
  const {
    currentAlbum,
    currentIndexSong,
    album: albumCurrent,
    playing,
    songLoading,
    currentSinger,
    singer: singerCurrent,
    idCurrentSong,
  } = useSelector((state) => state);

  const [activeSongAlbum, setActiveSongAlbum] = useState(false);
  const [activeSongSinger, setActiveSongSinger] = useState(false);
  const [playingSong, setPlayingSong] = useState(false);
  const [loadingSong, setLoadingSong] = useState(false);

  const dispatch = useDispatch();
  const {
    encodeId: idSong,
    artistsNames,
    title = " ",
    album = {},
    thumbnailM,
    duration,
    rakingStatus,
  } = data;

  const { title: albumTitle } = album;
  const { encodeId } = albumCurrent;
  const { id, alias } = singerCurrent;
  const newDuration = getTime(duration);
  const handlePlaySingleSong = () => {
    if (idSong === idCurrentSong) {
      dispatch(actions.setPlaying(!playing));
    } else {
      if (singer) {
        if (alias === currentSinger) {
          dispatch(actions.playSongSameSinger(idSong));
        } else {
          dispatch(actions.playSongAnotherSinger(idSong));
        }
      }
      if (albumSong) {
        if (encodeId === currentAlbum) {
          dispatch(actions.playSongSameAlbum(idSong));
        } else {
          dispatch(actions.playSongAnotherAlbum(idSong));
        }
      }
      if (chartHome) {
        if (currentAlbum === "ZO68OC68") {
          dispatch(actions.playSongSameAlbum(idSong));
        } else {
          dispatch(
            actions.playSongAnotherChartHome({
              id: idSong,
              album: "ZO68OC68",
              items: listSong,
            })
          );
        }
      }
    }
  };

  const handleShowLyric = () => {
    if (albumSong) {
      if (encodeId === currentAlbum) {
        if (index !== currentIndexSong) {
          dispatch(actions.playSongSameAlbum(encodeId));
        }
      } else {
        dispatch(actions.playSongAnotherAlbum(encodeId));
      }
    }
    if (chartHome) {
      if (currentAlbum === "ZO68OC68") {
        dispatch(actions.playSongSameAlbum(idSong));
      } else {
        dispatch(
          actions.playSongAnotherChartHome({
            id: idSong,
            album: "ZO68OC68",
            items: listSong,
          })
        );
      }
    }
    dispatch(actions.setShowLyric(true));
  };

  useEffect(() => {
    if (idSong === idCurrentSong) {
      setActiveSongAlbum(true);
      setActiveSongSinger(true);
    } else {
      setActiveSongAlbum(false);
      setActiveSongSinger(false);
    }
  }, [playing, idCurrentSong]);

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

  const statusClass = status === 2 ? styles.itemStatus : "";
  const activeClass =
    activeSongAlbum || activeSongSinger ? styles.itemActive : "";
  const playingClass = playingSong ? styles.itemPlaying : "";
  const finalClass = clsx(
    styles.item,
    statusClass,
    activeClass,
    playingClass,
    chartHome && styles.itemChart,
    chartHome && index === 0 && styles.spanFirst,
    chartHome && index === 1 && styles.spanSecond,
    chartHome && index === 2 && styles.spanThird,
    small && styles.itemSmall
  );

  return (
    <div className={finalClass}>
      <div className={styles.left}>
        <div className={styles.ranking}>
          <span>{index + 1}</span>
        </div>
        <div className={styles.hint}>
          <span>{rakingStatus === 0 && <MdOutlineHorizontalRule />}</span>
          {rakingStatus > 0 && (
            <span className={styles.hintUp}>
              <BiUpArrow />
              <p>{Math.abs(rakingStatus)}</p>
            </span>
          )}
          {rakingStatus < 0 && (
            <span className={styles.hintDown}>
              <BiDownArrow />
              <p>{Math.abs(rakingStatus)}</p>
            </span>
          )}
        </div>
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
          <div className={styles.infoTitle}>
            {" "}
            <h3>{title}</h3> {status === 2 && <span></span>}
          </div>

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
