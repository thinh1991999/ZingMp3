import React, { useState } from "react";
import styles from "./Topics.module.scss";
import { Row, Col } from "react-bootstrap";
import { Topic } from "..";

function Topics({ data }) {
  const [value, setValue] = useState(data);

  const { title, items = [] } = value;

  return (
    <div className={styles.topics}>
      <h2 className={styles.topicsTitle}>{title}</h2>
      <Row className={styles.topicContainer}>
        {items.map((item, index) => {
          const { encodeId, sortDescription, title, thumbnail } = item;
          if (index >= 5) {
            return;
          }
          return (
            <Topic
              key={encodeId}
              data={{
                title,
                sub: sortDescription,
                image: thumbnail,
                id: encodeId,
              }}
            />
          );
        })}
      </Row>
    </div>
  );
}

export default Topics;
