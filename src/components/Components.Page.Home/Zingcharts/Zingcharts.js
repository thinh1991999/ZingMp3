import React from "react";
import { Row } from "react-bootstrap";
import clsx from "clsx";
import styles from "./Zingcharts.module.scss";
import Zingchart from "../Zingchart/Zingchart";

function Zingcharts({ data }) {
  const { items } = data;

  return (
    <div className={styles.zingcharts}>
      <Row className="zingchartsContainer">
        {items.map((item, index) => {
          return <Zingchart key={index} data={item} />;
        })}
      </Row>
    </div>
  );
}

export default Zingcharts;
