import React from "react";
import { HomeTitle, Mv, SearchNoInfo } from "..";
import styles from "./SearchMv.module.scss";
import { BiMoviePlay } from "react-icons/bi";

function SearchMv({ data }) {
  return (
    <div className={styles.searchMv}>
      <HomeTitle msg="MV" />
      <div className={styles.searchWrap}>
        {data &&
          data.map((item, index) => {
            return <Mv data={item} key={index} />;
          })}
      </div>
      {!data && (
        <SearchNoInfo msg="Không có MV được tìm thấy">
          <BiMoviePlay />
        </SearchNoInfo>
      )}
    </div>
  );
}

export default SearchMv;
