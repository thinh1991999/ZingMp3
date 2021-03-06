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
import { toast } from "react-toastify";

function AlbumItem({
  data,
  status,
  index,
  singer = false,
  albumSong = false,
  small,
  chartHome,
  listSong,
  search,
  playLists,
  blur,
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
    streamingStatus,
  } = data;

  const { title: albumTitle } = album;
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
        if (albumCurrent?.encodeId === currentAlbum) {
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
      if (search) {
        if (streamingStatus === 1) {
          if (album.encodeId === currentAlbum) {
            dispatch(actions.playSongSameAlbum(idSong));
          } else {
            const setSong = async () => {
              dispatch(actions.setSongCurrentInfo(data));
            };
            const setListSong = async () => {
              try {
                const respon = await fetch(
                  `https://music-player-pink.vercel.app/api/playlist?id=${album.encodeId}`
                );
                const {
                  data: {
                    song: { items },
                  },
                } = await respon.json();
                dispatch(actions.setListSong(items));
              } catch (error) {
                toast.error("B??i h??t n??y ch??a ???????c h??? tr???!");
              }
            };
            Promise.all([setSong(), setListSong()]);
          }
        } else {
          toast.error("B??i h??t n??y ch??a ???????c h??? tr???!");
        }
      }
    }
  };

  const handleShowLyric = () => {
    if (albumSong) {
      if (albumCurrent?.encodeId === currentAlbum) {
        if (idSong !== idCurrentSong) {
          dispatch(actions.playSongSameAlbum(idSong));
        }
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
    if (idSong === idCurrentSong) {
      dispatch(actions.setShowLyric(true));
    }
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
    playLists && styles.playLists,
    blur && styles.blur,
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
          <input type="checkbox" id={idSong} className={styles.checkbox} />
          <label htmlFor={idSong}></label>
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
          <button
            className={styles.btn}
            onClick={() => toast.error("Ch???c n??ng n??y ch??a ???????c h??? tr???")}
          >
            <ButtonIcon
              album={true}
              popper={{
                show: true,
                msg: "Th??m v??o th?? vi???n",
                position: `${playLists ? "CenterUpRight" : "CenterUp"}`,
              }}
            >
              <AiOutlineHeart />
            </ButtonIcon>
          </button>
          <button className={styles.btn} onClick={() => handleShowLyric()}>
            <ButtonIcon
              album={true}
              popper={{
                show: true,
                msg: "Ph??t c??ng l???i b??i h??t",
                position: "CenterUp",
              }}
            >
              <GiMicrophone />
            </ButtonIcon>
          </button>
          <button
            className={styles.btn}
            onClick={() => toast.error("Ch???c n??ng n??y ch??a ???????c h??? tr???")}
          >
            <ButtonIcon
              album={true}
              popper={{
                show: true,
                msg: "Kh??c",
                position: "CenterUp",
              }}
            >
              <BsThreeDots />
            </ButtonIcon>
          </button>
        </div>
        <span>{newDuration}</span>
      </div>
    </div>
  );
}

export default memo(AlbumItem);
