import React from "react";
import { Col } from "react-bootstrap";
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
            return (
              <Col lg={3} md={4} sm={6} xs={12}>
                <Mv data={item} key={index} />;
              </Col>
            );
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
