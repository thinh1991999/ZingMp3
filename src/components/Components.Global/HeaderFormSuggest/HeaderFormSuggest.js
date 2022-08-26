import React, { memo } from "react";
import { GiTronArrow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./HeaderFormSuggest.module.scss";
import { actions } from "../../../store";
import { getNumberText } from "../../../funtions";

function HeaderFormSuggest({
  data,
  searchText,
  suggest,
  loading,
  setSearchText,
}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fowardToSinger = (alias) => {
    navigate(`/Singer/${alias}`);
    dispatch(actions.setActiveSearch(false));
  };

  const fowardToAlbum = (album) => {
    if (album) {
      navigate(`/Album/${album}`);
      dispatch(actions.setActiveSearch(false));
    }
  };

  const handleSearch = (item) => {
    navigate(`/Search/${item}`);
    setSearchText(item);
    dispatch(actions.setActiveSearch(false));
  };

  return (
    <div className={styles.searchSuggest}>
      <div className={styles.searchSuggestWrap}>
        <div className={styles.searchSuggestTop}>
          {searchText.length === 0 && (
            <div className={styles.searchBegin}>
              <h4>Đề xuất cho bạn</h4>
              <ul>
                {suggest.map((item, index) => {
                  return (
                    <li key={index} onClick={() => handleSearch(item)}>
                      <a>
                        <span>
                          <GiTronArrow />
                        </span>{" "}
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {loading ? (
            <div className={styles.loadingSearch}>Loading....</div>
          ) : (
            ""
          )}

          {data[0] && !loading && searchText.length > 0 ? (
            <div className={styles.searchMv}>
              <h4>Gợi ý kết quả</h4>
              <ul>
                {data.map((item, index) => {
                  const {
                    encodeId,
                    id,
                    alias,
                    name,
                    thumbnailM,
                    totalFollow,
                    title,
                    artists = [],
                    album,
                  } = item;

                  const newTotalFollow = getNumberText(totalFollow);
                  if (!encodeId) {
                    return (
                      <li
                        className={styles.searchMvSinger}
                        key={id}
                        onClick={() => fowardToSinger(alias)}
                      >
                        <div className={styles.searchMvWrap}>
                          <div className={styles.searchMvLeft}>
                            <img src={thumbnailM} alt="" />
                          </div>
                          <div className={styles.seachMvRight}>
                            <a>{name}</a>
                            <p>Nghệ sĩ • {newTotalFollow} quan tâm</p>
                          </div>
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className={styles.searchSong}
                        key={`${encodeId}${index}`}
                        onClick={() => fowardToAlbum(album.encodeId || "")}
                      >
                        <div className={styles.searchSongWrap}>
                          <div className={styles.searchSongLeft}>
                            <img src={thumbnailM} alt="" />
                          </div>
                          <div className={styles.searchSongRight}>
                            <a>{title}</a>
                            <p>
                              {artists.map((artist, index) => {
                                const { id, name } = artist;
                                if (index === 0) {
                                  return `${name}`;
                                }
                                return ` ,${name}`;
                              })}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          ) : (
            ""
          )}
          {!data[0] && !loading && searchText.length > 0 ? (
            <div className={styles.loadingSearch}>
              Không tìm thấy kết quả nào
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(HeaderFormSuggest);
