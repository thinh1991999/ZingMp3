import React from "react";
import { HomeTitle, Artist, SearchNoInfo } from "..";
import styles from "./SearchArtist.module.scss";
import { GiOldMicrophone } from "react-icons/gi";

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
