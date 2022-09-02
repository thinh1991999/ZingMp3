import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PrimaryButton from "../../Components.Global/PrimaryButton/PrimaryButton";

import styles from "./TypeTopic.module.scss";

export default function TypeTopic({ data }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className={styles.container}>
      <h5>Tâm trạng và hoạt động</h5>
      <Row className={styles.content}>
        {data.map((item, index) => {
          const { encodeId, playlists, thumbnail, title } = item;
          if (!showAll && index > 7) return null;
          return (
            <Col lg={3} md={4} key={encodeId} className={styles.item}>
              <Link to={`/TypeDetail/${encodeId}`} className={styles.itemWrap}>
                <img src={thumbnail} alt="" />
                <div className={styles.layer}></div>
                <div className={styles.itemContent}>
                  <h6>{title}</h6>
                  <div className={styles.playlists}>
                    {playlists.map((playlist) => {
                      const { encodeId, thumbnailM } = playlist;
                      return (
                        <div className={styles.playlist} key={encodeId}>
                          <img src={thumbnailM} alt="" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
      {!showAll && (
        <div className={styles.btnWrap}>
          <button onClick={() => setShowAll(true)}>
            <PrimaryButton
              info={{
                msg: "tất cả",
                border: true,
              }}
            ></PrimaryButton>
          </button>
        </div>
      )}
    </div>
  );
}
