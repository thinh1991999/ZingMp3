import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Zingchart.module.scss";

function Zingchart({ data }) {
  const navigate = useNavigate();
  const { cover } = data;

  const handleClick = () => {
    navigate("/ZingChartWeek");
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
