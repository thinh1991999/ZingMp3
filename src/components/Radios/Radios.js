import React from "react";
import styles from "./Radios.module.scss";
import { Row } from "react-bootstrap";
import { Radio } from "..";
import clsx from "clsx";

function Radios({ data }) {
  const { title, items } = data;

  const newItems = items.filter((item) => {
    const { host, program } = item;
    return program !== undefined && host !== undefined;
  });

  return (
    <div className={clsx(styles.radios, "pd-15-px")}>
      <h2 className={styles.radiosTitle}>
        {title} {items.length > 7 ? <a href="#">Tất cả</a> : ""}
      </h2>
      <Row className={styles.radiosContainer}>
        {newItems.map((item, index) => {
          const {
            encodeId,
            activeUsers,
            host: { name, thumbnail: hostImage },
            program,
          } = item;
          if (index > 6) {
            return;
          }
          return <Radio key={encodeId} data={item} />;
        })}
      </Row>
    </div>
  );
}

export default Radios;
