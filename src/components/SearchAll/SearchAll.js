import React from "react";
import styles from "./SearchAll.module.scss";
import { BsPlayCircle } from "react-icons/bs";
import {
  AlbumItem,
  Artists,
  ButtonIcon,
  HomeTitle,
  Mv,
  Mvs,
  Topics,
  SearchNoInfo,
} from "..";
import { GiMusicSpell } from "react-icons/gi";

function SearchAll({ dataSearch, Keyword }) {
  const {
    top = {},
    artists = [],
    songs = [],
    videos = [],
    playlists = [],
  } = dataSearch;
  console.log(top);

  return (
    <div className={styles.searchAll}>
      {top.title ? (
        <div className={styles.searchAllWrap}>
          <div className={styles.top}>
            <h3>
              Top kết quả <span>"{Keyword}"</span>
            </h3>
            <div className={styles.topSong}>
              <div className={styles.topSongImg}>
                <img src={top.thumbnail} alt="" />
                <div className={styles.layer}></div>
                <div className={styles.btn}>
                  <ButtonIcon circle={true} topic={true}>
                    <BsPlayCircle />
                  </ButtonIcon>
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
                  <AlbumItem
                    data={song}
                    status={status}
                    worldWide={worldWide}
                    index={index}
                    key={index}
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
