import React from "react";
import { GiMusicalScore } from "react-icons/gi";
import { Row } from "react-bootstrap";
import styles from "./SearchPlaylist.module.scss";
import HomeTitle from "../../Components.Global/HomeTitle/HomeTitle";
import Topic from "../../Components.Global/Topic/Topic";
import SearchNoInfo from "../SearchNoInfo/SearchNoInfo";

function SearchPlaylist({ data }) {
  return (
    <div className={styles.playList}>
      <HomeTitle msg="Playlist/Album" />
      <Row className={styles.playWrap}>
        {data &&
          data.map((item, index) => {
            const { encodeId, sortDescription, title, thumbnail } = item;
            return (
              <Topic
                data={{
                  title,
                  sub: sortDescription,
                  image: thumbnail,
                  id: encodeId,
                }}
                key={encodeId}
              />
            );
          })}
      </Row>
      {!data && (
        <SearchNoInfo msg="Không có Playlist/Album được tìm thấy">
          <GiMusicalScore />
        </SearchNoInfo>
      )}
    </div>
  );
}

export default SearchPlaylist;
