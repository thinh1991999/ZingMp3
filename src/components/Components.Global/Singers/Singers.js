import React from "react";
import { Row } from "react-bootstrap";
import clsx from "clsx";
import styles from "./Singers.module.scss";
import Artist from "../Artist/Artist";

function Singers({ data }) {
  const { items } = data;
  return (
    <div className={styles.singers}>
      <Row className={clsx(styles.singersContainer, "pd-15-px")}>
        {items.map((item, index) => {
          if (index > 4) return null;
          const { id } = item;
          return <Artist key={id} data={item} />;
        })}
      </Row>
    </div>
  );
}

export default Singers;
