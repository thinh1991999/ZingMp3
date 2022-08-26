import React from "react";
import styles from "./Zingchart.module.scss";

function Zingchart({ data }) {
  const { cover } = data;

  return (
    <div className={styles.zingchart}>
      <div className={styles.zingchartWrap}>
        <img src={cover} alt="" />
      </div>
    </div>
  );
}

export default Zingchart;
