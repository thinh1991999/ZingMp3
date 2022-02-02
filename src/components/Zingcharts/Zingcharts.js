import React from "react";
import styles from "./Zingcharts.module.scss";
import { Row } from "react-bootstrap";
import { Zingchart } from "..";
import clsx from "clsx";

function Zingcharts({ data }) {
  const { items } = data;
  return (
    <div className={clsx(styles.zingcharts, "pd-15-px")}>
      <Row className="zingchartsContainer">
        {items.map((item, index) => {
          return <Zingchart key={index} data={item} />;
        })}
      </Row>
    </div>
  );
}

export default Zingcharts;
