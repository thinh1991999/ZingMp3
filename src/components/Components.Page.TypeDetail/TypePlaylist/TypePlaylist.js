import React from "react";
import { Col, Row } from "react-bootstrap";

import styles from "./TypePlaylist.module.scss";
import Topic from "../../Components.Global/Topic/Topic";

export default function TypePlaylist({ data }) {
  const { items, title } = data;
  return (
    <div className={styles.container}>
      {title && <h5>{title}</h5>}
      <Row className={styles.content}>
        {items.map((item, index) => {
          return (
            <Col lg={2} md={5}>
              <Topic data={item} key={index} padding={"unset"} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
