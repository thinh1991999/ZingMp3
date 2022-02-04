import React, { useEffect, useState } from "react";
import styles from "./Chart.module.scss";
import { Row, Col } from "react-bootstrap";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import clsx from "clsx";
import { ChartLine } from "..";
function Chart({ data }) {
  const [idState, setIdState] = useState([]);

  const {
    items,
    chart: { totalScore },
  } = data;

  useEffect(() => {}, []);

  return (
    <div className={styles.content}>
      <div className={styles.box}>
        <div className={styles.blur}></div>
        <div className={styles.alpha}></div>
        <h2>
          <a href="">#zingchart</a>{" "}
          <button>
            <AiFillPlayCircle />
          </button>
        </h2>
        <Row className={styles.wrap}>
          <Col lg={4} className={styles.left}>
            {items.map((item, index) => {
              const { encodeId, thumbnailM, title, score, artists } = item;

              const percent = Math.round((score / totalScore) * 100);

              let position = styles.topFirst;
              if (index === 1) {
                position = styles.topSecond;
              } else if (index === 2) {
                position = styles.topThree;
              }
              if (index > 2) return;
              return (
                <div key={encodeId} className={clsx(styles.leftItem, position)}>
                  <span>{index + 1}</span>
                  <div className={styles.img}>
                    <img src={thumbnailM} alt={title} />
                    <div className={styles.imgLayer}></div>
                    <div className={styles.imgBtn}>
                      <BsFillPlayFill />
                    </div>
                  </div>
                  <div className={styles.info}>
                    <h4>{title}</h4>
                    <span>
                      {artists.map((artist, index) => {
                        const { id, alias, name } = artist;
                        if (index === 0) {
                          return (
                            <a key={id} href="">
                              {name}
                            </a>
                          );
                        }
                        return (
                          <a key={id} href="">
                            , {name}
                          </a>
                        );
                      })}
                    </span>
                  </div>
                  <h4 className={styles.percent}>{percent}%</h4>
                </div>
              );
            })}
            <div className={styles.leftBtnWrap}>
              <button className={styles.leftBtn}>Xem thêm</button>
            </div>
          </Col>
          <Col lg={8} className={styles.right}>
            <ChartLine chart={data.chart} idState={idState} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Chart;
