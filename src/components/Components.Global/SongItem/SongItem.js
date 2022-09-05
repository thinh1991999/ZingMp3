import React, { memo, useMemo } from "react";
import { toast } from "react-toastify";
import { HiOutlineMusicNote } from "react-icons/hi";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SongItem.module.scss";

import { actions } from "../../../store";
import PlayingIcon from "../PlayingIcon/PlayingIcon";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { ultils } from "../../../Share";
import httpService from "../../../Services/http.service";

function SongItem({
  data,
  status,
  index,
  singer = false,
  albumSong = false,
  small,
  chartHome,
  chartWeek,
  albumId,
  chartWeekIdx,
  newSong = false,
  listSong,
  search,
  playLists,
  blur,
}) {
  const dispatch = useDispatch();
  const {
    currentAlbum,
    album: albumCurrent,
    playing,
    songLoading,
    currentSong,
  } = useSelector((state) => state.song);

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

  const checkPlayingSong = useMemo(() => {
    if (currentSong?.encodeId === idSong && playing && !songLoading) {
      return true;
    }
    return false;
  }, [currentSong, playing, idSong, songLoading]);

  const handlePlaySingleSong = () => {
    if (streamingStatus === 2) {
      toast.error("Bài hát này chưa được hỗ trợ");
      return;
    }
    if (idSong === currentSong?.encodeId) {
      dispatch(actions.setPlaying(!playing));
    } else {
      if (singer) {
        dispatch(actions.playSongAnotherSinger(data));
      }
      if (albumSong) {
        if (albumCurrent?.encodeId === currentAlbum) {
          dispatch(actions.playSongSameAlbum(data));
        } else {
          dispatch(actions.playSongAnotherAlbum(data));
        }
      }
      if (chartHome) {
        let finalAlbum;
        switch (chartWeekIdx) {
          case 0:
            finalAlbum = "6BZZEEFE";
            break;
          case 1:
            finalAlbum = "6BZZF0ED";
            break;
          case 2:
            finalAlbum = "6BZ6Z8IF";
            break;
          default:
            finalAlbum = "ZO68OC68";
            break;
        }
        if (currentAlbum === finalAlbum) {
          dispatch(actions.playSongSameAlbum(data));
        } else {
          dispatch(
            actions.playSongAnotherChartHome({
              song: data,
              album: finalAlbum,
              items: listSong,
            })
          );
        }
      }
      if (chartWeek) {
        if (currentAlbum === albumId) {
          dispatch(actions.playSongSameAlbum(data));
        } else {
          dispatch(
            actions.playSongAnotherChartHome({
              song: data,
              album: albumId,
              items: listSong,
            })
          );
        }
      }
      if (newSong) {
        if (currentAlbum === "ZDB6EB9C") {
          dispatch(actions.playSongSameAlbum(data));
        } else {
          dispatch(
            actions.playNewSong({
              songInfo: data,
              album: "ZDB6EB9C",
              items: listSong,
            })
          );
        }
      }
      if (search) {
        if (currentAlbum === album.encodeId) {
          dispatch(actions.playSongSameAlbum(data));
        } else {
          dispatch(actions.setSongCurrentInfo(data));
          dispatch(actions.setFetchSong(true));
          httpService.getAlbum(album.encodeId).then((res) => {
            const {
              data: {
                song: { items },
              },
            } = res.data;
            dispatch(
              actions.playSearchSong({
                album: album.encodeId,
                items: items,
              })
            );
          });
        }
      }
      if (playLists) {
        dispatch(actions.playSongSameAlbum(data));
      }
    }
  };

  const handleShowLyric = () => {
    if (albumSong) {
      if (albumCurrent?.encodeId === currentAlbum) {
        if (idSong !== currentSong?.encodeId) {
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
    if (idSong === currentSong?.encodeId) {
      dispatch(actions.setShowLyric(true));
    }
  };

  const finalClass = clsx(
    styles.item,
    status === 2 ? styles.itemStatus : null,
    currentSong?.encodeId === idSong ? styles.itemActive : null,
    checkPlayingSong ? styles.itemPlaying : null,
    playLists && styles.playLists,
    blur && styles.blur,
    chartHome || newSong ? styles.itemChart : null,
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
            {songLoading ? (
              <PlayingIcon loading={true} />
            ) : (
              <BsFillPlayFill className={styles.playIcon} />
            )}
            {checkPlayingSong ? (
              <div className={styles.playing}>
                <PlayingIcon className={styles.playingIcon} />
              </div>
            ) : null}
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
        <p>{album?.title || ""}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.rightBtn}>
          <button
            className={styles.btn}
            onClick={() => toast.error("Chức năng này chưa được hỗ trợ")}
          >
            <ButtonIcon
              album={true}
              popper={{
                show: true,
                msg: "Thêm vào thư viện",
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
                msg: "Phát cùng lời bài hát",
                position: "CenterUp",
              }}
            >
              <GiMicrophone />
            </ButtonIcon>
          </button>
          <button
            className={styles.btn}
            onClick={() => toast.error("Chức năng này chưa được hỗ trợ")}
          >
            <ButtonIcon
              album={true}
              popper={{
                show: true,
                msg: "Khác",
                position: "CenterUp",
              }}
            >
              <BsThreeDots />
            </ButtonIcon>
          </button>
        </div>
        <span>{ultils.getTime(duration)}</span>
      </div>
    </div>
  );
}

export default memo(SongItem);
