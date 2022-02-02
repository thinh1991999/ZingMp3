import React from "react";
import styles from "./Radios.module.scss";
import { Row } from "react-bootstrap";
import { Radio } from "..";
import clsx from "clsx";

function Radios({ data }) {
  const { title, items } = data;
  return (
    <div className={clsx(styles.radios, "pd-15-px")}>
      <h2 className={styles.radiosTitle}>
        {title} {items.length > 7 ? <a href="#">Tất cả</a> : ""}
      </h2>
      <Row className="radiosContainer row">
        {items.map((item, index) => {
          const { encodeId } = item;
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
