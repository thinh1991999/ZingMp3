import React from "react";
import { GiMusicalScore } from "react-icons/gi";
import { Col, Row } from "react-bootstrap";
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
            return (
              <Col lg={2} md={3} xs={6} sm={4}>
                <Topic data={item} key={index} padding={0} />
              </Col>
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
