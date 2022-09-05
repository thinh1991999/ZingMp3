import React from "react";
import { HiOutlineMusicNote } from "react-icons/hi";
import styles from "./SearchSong.module.scss";
import HomeTitle from "../../Components.Global/HomeTitle/HomeTitle";
import SearchNoInfo from "../SearchNoInfo/SearchNoInfo";
import SongItem from "../../Components.Global/SongItem/SongItem";

function SearchSong({ data }) {
  return (
    <div className={styles.song}>
      <HomeTitle msg="Bài hát" />
      {data ? (
        data.map((item, index) => {
          const { status, worldWide } = item;
          return (
            <SongItem
              data={item}
              status={status}
              worldWide={worldWide}
              index={index}
              key={index}
              search={true}
            />
          );
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
