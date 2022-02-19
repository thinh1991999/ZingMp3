import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./Chart.module.scss";
import { Row, Col } from "react-bootstrap";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import clsx from "clsx";
import { ChartLine } from "..";
import { Link } from "react-router-dom";
function Chart({ data, home = false }) {
  const [pointPosition, setPointPosition] = useState("");
  const [indexShow, setIndexShow] = useState(0);
  const [position, setPosition] = useState({
    xTop: 0,
    xLeft: 0,
    indexPoint: 0,
  });
  const [change, setChange] = useState(true);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [didMount, setDidMount] = useState(false);
  const {
    items,
    chart: { totalScore },
  } = data;

  useEffect(() => {
    let changeIndex;
    if (change) {
      changeIndex = setInterval(() => {
        if (indexShow === 2) {
          setIndexShow(0);
        } else {
          setIndexShow((prev) => prev + 1);
        }
      }, 3000);
    }
    return () => {
      clearInterval(changeIndex);
    };
  }, [change, indexShow]);

  useEffect(() => {
    if (change && pointPosition) {
      const listPoint = JSON.parse(pointPosition);
      const { x, y } = listPoint[indexShow];
      if (indexShow === 0) {
        setPosition({
          xTop: top + y,
          xLeft: left + x,
          indexPoint: 1,
        });
      } else if (indexShow === 1) {
        setPosition({
          xTop: top + y,
          xLeft: left + x,
          indexPoint: 10,
        });
      } else {
        setPosition({
          xTop: top + y,
          xLeft: left + x,
          indexPoint: 20,
        });
      }
    }
  }, [indexShow, pointPosition]);

  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, []);

  if (!didMount) return null;
  // console.log(home);
  return (
    <div className={clsx(styles.content, home && styles.homeContent)}>
      <div className={styles.box}>
        <div className={styles.blur}></div>
        <div className={styles.alpha}></div>
        <h2>
          <Link to={"/ZingChartHome"}>#zingchart</Link>{" "}
          <button>
            <AiFillPlayCircle />
          </button>
        </h2>
        <Row className={styles.wrap}>
          <Col xl={4} lg={12} className={styles.left}>
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
                <div
                  onMouseEnter={() => {
                    setIndexShow(index);
                  }}
                  key={encodeId}
                  className={clsx(
                    styles.leftItem,
                    position,
                    index === indexShow && styles.leftItemActive
                  )}
                >
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
          <Col xl={home ? 12 : 8} lg={12} className={styles.right}>
            <ChartLine
              chart={Object.assign({}, data.chart)}
              indexShow={indexShow}
              setIndexShow={setIndexShow}
              songs={items}
              totalScore={totalScore}
              position={position}
              setPosition={setPosition}
              pointPosition={pointPosition}
              setPointPosition={setPointPosition}
              setChange={setChange}
              setLeft={setLeft}
              setTop={setTop}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

const areEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

export default memo(Chart, areEqual);
