import React from "react";
import { Col } from "react-bootstrap";
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
            return (
              <Col lg={2} md={3} sm={4} xs={6}>
                <Artist data={item} key={index} />;
              </Col>
            );
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
