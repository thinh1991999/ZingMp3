import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Zingchart.module.scss";

function Zingchart({ data }) {
  const navigate = useNavigate();
  const { cover, link } = data;
  const handleClick = () => {
    const idx = link.lastIndexOf("/");
    const idxDot = link.lastIndexOf(".");
    const id = link.substring(idx, idxDot);
    navigate("/ZingChartWeek" + id);
  };

  return (
    <div className={styles.zingchart} onClick={handleClick}>
      <div className={styles.zingchartWrap}>
        <img src={cover} alt="" />
      </div>
    </div>
  );
}

export default Zingchart;
