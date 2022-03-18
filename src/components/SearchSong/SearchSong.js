import React from "react";
import { AlbumItem, HomeTitle, SearchNoInfo } from "..";
import styles from "./SearchSong.module.scss";
import { HiOutlineMusicNote } from "react-icons/hi";

function SearchSong({ data }) {
  return (
    <div className={styles.song}>
      <HomeTitle msg="Bài hát" />
      {data ? (
        data.map((item, index) => {
          return <AlbumItem key={index} data={item} />;
        })
      ) : (
        <SearchNoInfo msg="Không có Bài Hát được tìm thấy">
          <HiOutlineMusicNote />
        </SearchNoInfo>
      )}
    </div>
  );
}

export default SearchSong;
