import React from "react";
import { GiOldMicrophone } from "react-icons/gi";
import Artist from "../../Components.Global/Artist/Artist";
import HomeTitle from "../../Components.Global/HomeTitle/HomeTitle";
import SearchNoInfo from "../SearchNoInfo/SearchNoInfo";
import styles from "./SearchArtist.module.scss";

function SearchArtist({ data }) {
  console.log(data);
  return (
    <div className={styles.searchArtist}>
      <HomeTitle msg="Artists" />
      <div className={styles.searchWrap}>
        {data &&
          data.map((item, index) => {
            return <Artist data={item} key={index} />;
          })}
      </div>
      {!data && (
        <SearchNoInfo msg="Không có Nghệ sĩ/OA được tìm thấy">
          <GiOldMicrophone />
        </SearchNoInfo>
      )}
    </div>
  );
}

export default SearchArtist;
