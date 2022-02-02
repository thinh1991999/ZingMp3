import React from "react";
import styles from "./Singers.module.scss";
import { Row } from "react-bootstrap";
import clsx from "clsx";
import { Singer } from "..";

function Singers({ data }) {
  const { items } = data;

  return (
    <div className={styles.singers}>
      <Row className={clsx(styles.singersContainer, "pd-15-px")}>
        {items.map((item, index) => {
          const { id } = item;
          return <Singer key={id} data={item} />;
        })}
      </Row>
    </div>
  );
}

export default Singers;
