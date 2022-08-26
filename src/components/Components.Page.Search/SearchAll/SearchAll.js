import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import { GiMusicSpell } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import clsx from "clsx";
import styles from "./SearchAll.module.scss";
import { actions } from "../../../store";
import ButtonIcon from "../../Components.Global/ButtonIcon/ButtonIcon";
import PlayingIcon from "../../Components.Global/PlayingIcon/PlayingIcon";
import HomeTitle from "../../Components.Global/HomeTitle/HomeTitle";
import SongItem from "../../Components.Global/SongItem/SongItem";
import Topics from "../../Components.Global/Topics/Topics";
import Mvs from "../../Components.Global/Mvs/Mvs";
import Artists from "../../Components.Global/Artists/Artists";
import SearchNoInfo from "../SearchNoInfo/SearchNoInfo";

function SearchAll({ dataSearch, Keyword }) {
  const { idCurrentSong, playing, currentAlbum } = useSelector(
    (state) => state.song
  );

  const {
    top = {},
    artists = [],
    songs = [],
    videos = [],
    playlists = [],
  } = dataSearch;

  const dispatch = useDispatch();

  const handlePlayTopSong = () => {
    const { streamingStatus, encodeId } = top;
    if (encodeId === idCurrentSong) {
      dispatch(actions.setPlaying(!playing));
    } else {
      if (songs.length > 0 && top && streamingStatus === 1) {
        const song = songs.filter((item) => {
          const { encodeId } = item;
          return encodeId === top.encodeId;
        })[0];
        const {
          album: { encodeId: idAlbum },
        } = song;
        if (idAlbum === currentAlbum) {
          dispatch(actions.playSongSameAlbum(encodeId));
        } else {
          const setSong = async () => {
            dispatch(actions.setSongCurrentInfo(song));
          };
          const setListSong = async () => {
            try {
              const respon = await fetch(
                `https://music-player-pink.vercel.app/api/playlist?id=${idAlbum}`
              );
              const {
                data: {
                  song: { items },
                },
              } = await respon.json();
              dispatch(actions.setListSong(items));
            } catch (error) {
              toast.error("Bài hát này chưa được hỗ trợ!");
            }
          };
          Promise.all([setSong(), setListSong()]);
        }
      } else {
        toast.error("Bài hát này chưa được hỗ trợ!");
      }
    }
  };

  return (
    <div className={styles.searchAll}>
      {top.title ? (
        <div className={styles.searchAllWrap}>
          <div className={styles.top}>
            <h3>
              Top kết quả <span>"{Keyword}"</span>
            </h3>
            <div
              className={clsx(
                styles.topSong,
                top.encodeId === idCurrentSong && styles.topSongActive
              )}
            >
              <div className={styles.topSongImg} onClick={handlePlayTopSong}>
                <img src={top.thumbnail} alt="" />
                <div className={styles.layer}></div>
                <div className={styles.play}>
                  {(!playing || top.encodeId !== idCurrentSong) && (
                    <div className={styles.btn}>
                      <ButtonIcon circle={true} topic={true}>
                        <BsPlayCircle />
                      </ButtonIcon>
                    </div>
                  )}
                  {playing && top.encodeId === idCurrentSong && (
                    <div className={styles.playing}>
                      <PlayingIcon className={styles.playingIcon} />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.topSongInfo}>
                <h4>{top.title || ""}</h4>
                <span>{top.objectType === "song" ? "Bài hát" : ""}</span>
              </div>
            </div>
          </div>
          {songs.length !== 0 && (
            <div className={styles.content}>
              <HomeTitle msg="Bài hát" />
              {songs.map((song, index) => {
                const { status, worldWide } = song;
                return (
                  <SongItem
                    data={song}
                    status={status}
                    worldWide={worldWide}
                    index={index}
                    key={index}
                    search={true}
                  />
                );
              })}
            </div>
          )}
          {playlists.length !== 0 && (
            <Topics data={{ title: "Playlist/Album", items: playlists }} />
          )}
          {videos.length !== 0 && <Mvs data={{ title: "MV", items: videos }} />}
          {artists.length !== 0 && (
            <Artists data={artists} title="Nghệ Sĩ/OA" />
          )}
        </div>
      ) : (
        <SearchNoInfo msg="Không có kết quả được tìm thấy">
          <GiMusicSpell />
        </SearchNoInfo>
      )}
    </div>
  );
}

export default SearchAll;
