import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ChartToolTip.module.scss";

function ChartToolTip({ songs, indexShow, position, totalScore }) {
  const wrapRef = useRef(null);
  const [positionShow, setPositionShow] = useState("center");
  const { title, artists, thumbnailM, score } = songs[indexShow];

  const { xTop, xLeft, indexPoint } = position;
  const currentTop = xTop - 80;

  useEffect(() => {
    if (indexPoint < 2) {
      setPositionShow("left1");
    } else if (indexPoint < 5) {
      setPositionShow("left2");
    } else if (indexPoint > 22 && indexPoint <= 24) {
      setPositionShow("right1");
    } else if (indexPoint > 20 && indexPoint <= 22) {
      setPositionShow("right2");
    } else {
      setPositionShow("center");
    }
  }, [indexPoint]);

  const percent = Math.round((score / totalScore) * 100);
  const classFist = indexShow === 0 ? styles.first : "";
  const classSecond = indexShow === 1 ? styles.second : "";
  const classThird = indexShow === 2 ? styles.third : "";

  return (
    <div
      className={clsx(
        styles.container,
        classFist,
        classSecond,
        classThird,
        positionShow === "left1" && styles.left1,
        positionShow === "left2" && styles.left2,
        positionShow === "right1" && styles.right1,
        positionShow === "right2" && styles.right2
      )}
      style={{
        top: currentTop,
        left: xLeft,
      }}
      ref={wrapRef}
    >
      <div className={styles.wrap}>
        <div className={styles.img}>
          <img src={thumbnailM} alt={title} />
        </div>
        <div className={styles.info}>
          <h4>{title}</h4>
          <span>
            {artists.map((artist, index) => {
              const { name } = artist;
              if (index === 0) {
                return name;
              }
              return `,${name}`;
            })}
          </span>
        </div>
        <div className={styles.percent}>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
}

export default ChartToolTip;
