import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import { GiMusicSpell } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
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
import httpService from "../../../Services/http.service";

function SearchAll({ dataSearch, Keyword }) {
  const currentSong = useSelector((state) => state.song.currentSong);
  const playing = useSelector((state) => state.song.playing);
  const currentAlbum = useSelector((state) => state.song.currentAlbum);

  const {
    top = {},
    artists = [],
    songs = [],
    videos = [],
    playlists = [],
  } = dataSearch;

  const dispatch = useDispatch();

  const handlePlayTopSong = () => {
    const { encodeId, album = {} } = top;
    if (encodeId === currentSong.encodeId) {
      dispatch(actions.setPlaying(!playing));
    } else {
      if (currentAlbum === album.encodeId) {
        dispatch(actions.playSongSameAlbum(top));
      } else {
        dispatch(actions.setSongCurrentInfo(top));
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
                top.encodeId === currentSong.encodeId && styles.topSongActive
              )}
            >
              <div className={styles.topSongImg} onClick={handlePlayTopSong}>
                <img src={top.thumbnail} alt="" />
                <div className={styles.layer}></div>
                <div className={styles.play}>
                  {(!playing || top.encodeId !== currentSong.encodeId) && (
                    <div className={styles.btn}>
                      <ButtonIcon circle={true} topic={true}>
                        <BsPlayCircle />
                      </ButtonIcon>
                    </div>
                  )}
                  {playing && top.encodeId === currentSong.encodeId && (
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
