import React from "react";
import { BiMoviePlay } from "react-icons/bi";
import HomeTitle from "../../Components.Global/HomeTitle/HomeTitle";
import Mv from "../../Components.Global/Mv/Mv";
import SearchNoInfo from "../SearchNoInfo/SearchNoInfo";
import styles from "./SearchMv.module.scss";

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
