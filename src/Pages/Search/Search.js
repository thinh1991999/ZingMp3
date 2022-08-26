import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SearchAll,
  Loading,
  SearchSong,
  SearchMv,
  SearchPlaylist,
  SearchArtist,
} from "../../components";
import styles from "./Search.module.scss";
import { actions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import httpService from "../../Services/http.service";

function Search() {
  const { Keyword } = useParams();

  const { idCurrentSong } = useSelector((state) => state.song);

  const dispatch = useDispatch();

  const header = useRef([
    "tất cả",
    "bài hát",
    "playlist/album",
    "nghệ sĩ/oa",
    "mv",
  ]).current;
  const [loading, setLoading] = useState(true);
  const [dataSearch, setDataSearch] = useState(null);
  const [controll, setControll] = useState(0);

  const handleControll = (index) => {
    setControll(index);
  };

  useEffect(() => {
    const fetchSearch = () => {
      setLoading(true);
      httpService.getSearch(Keyword).then((res) => {
        const { data } = res.data;
        setDataSearch(data);
        setLoading(false);
      });
    };
    fetchSearch();
  }, [Keyword]);

  useEffect(() => {
    dispatch(actions.setBGHeader(true));
    dispatch(actions.setCurrentNav(""));
    dispatch(actions.setShowNavMobile(false));
  }, [dispatch]);

  useEffect(() => {
    !idCurrentSong && dispatch(actions.setTitle(`Tìm kiếm: ${Keyword}`));
  }, [idCurrentSong, dispatch, Keyword]);

  if (loading) {
    return <Loading size={50} />;
  }

  const { songs, videos, playlists, artists } = dataSearch;

  return (
    <div className={styles.search}>
      <div className={styles.searchWrap}>
        <div className={styles.searchHeader}>
          <h3>Kết quả tìm kiếm</h3>
          <span>|</span>
          <ul>
            {header.map((item, index) => {
              if (index === controll) {
                return (
                  <li className={styles.active} key={index}>
                    {item}
                  </li>
                );
              }
              return (
                <li key={index} onClick={() => handleControll(index)}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.searchContent}>
          {controll === 0 && (
            <SearchAll dataSearch={dataSearch} Keyword={Keyword} />
          )}
          {controll === 1 && <SearchSong data={songs} />}
          {controll === 2 && <SearchPlaylist data={playlists} />}
          {controll === 3 && <SearchArtist data={artists} />}
          {controll === 4 && <SearchMv data={videos} />}
        </div>
      </div>
    </div>
  );
}

export default Search;
