import React, { useEffect, useState } from "react";
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
import { actions, SEARCH_API } from "../../store";
import { useDispatch } from "react-redux";

function Search() {
  const { Keyword } = useParams();
  const dispatch = useDispatch();

  const [header, setHeader] = useState([
    "tất cả",
    "bài hát",
    "playlist/album",
    "nghệ sĩ/oa",
    "mv",
  ]);
  const [loading, setLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [controll, setControll] = useState(0);

  const fetchSearch = async () => {
    setLoading(true);
    try {
      const respon = await fetch(`${SEARCH_API}${Keyword}`);
      const { data } = await respon.json();
      setDataSearch(data);
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleControll = (index) => {
    setControll(index);
  };

  useEffect(() => {
    fetchSearch();
  }, [Keyword]);

  useEffect(() => {
    dispatch(actions.setBGHeader(true));
    dispatch(actions.setCurrentNav(""));
    dispatch(actions.setShowNavMobile(false));
  }, []);

  if (loading) {
    return <Loading size={50} />;
  }

  const { top, songs, videos, playlists, artists } = dataSearch;
  console.log(videos);
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
