import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import clsx from "clsx";

import styles from "./RadioSchedule.module.scss";
import ButtonIcon from "../../Components.Global/ButtonIcon/ButtonIcon";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export default function RadioSchedule({ data }) {
  const [currentTime, setCurrentTime] = useState(moment().unix());
  const [endTime, setEndTime] = useState(null);
  const [arrTimes, setArrTimes] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(null);

  const rightRef = useRef(null);

  const handleScrollRight = () => {
    const { scrollLeft, offsetWidth } = rightRef.current;
    rightRef.current.scrollLeft = scrollLeft + offsetWidth;
    if (scrollLeft >= maxScroll) {
      rightRef.current.scrollLeft = maxScroll;
      setScroll(maxScroll);
    } else {
      rightRef.current.scrollLeft = scrollLeft + offsetWidth;
      setScroll(scrollLeft + offsetWidth);
    }
    setScroll(scrollLeft + offsetWidth);
  };

  const handleScrollLeft = () => {
    const { scrollLeft, offsetWidth } = rightRef.current;
    if (scrollLeft >= offsetWidth) {
      rightRef.current.scrollLeft = scrollLeft - offsetWidth;
      setScroll(scrollLeft - offsetWidth);
    } else {
      rightRef.current.scrollLeft = 0;
      setScroll(0);
    }
  };

  useEffect(() => {
    const { items } = data;
    let end = 0;
    items.forEach((item) => {
      const { programs } = item;
      programs.forEach((program) => {
        const { endTime } = program;
        if (endTime > end) {
          end = endTime;
        }
      });
    });
    setEndTime(end);
  }, [data]);

  useEffect(() => {
    let now = moment.unix(currentTime).format("DD/MM/YYYY HH:mm:ss");
    let then = moment.unix(endTime).format("DD/MM/YYYY HH:mm:ss");
    let nowMM = moment(now, "DD/MM/YYYY HH:mm:ss");
    let thenMM = moment(then, "DD/MM/YYYY HH:mm:ss");
    let ms = thenMM.diff(nowMM);
    let hours = moment.duration(ms).asHours();
    let array = [];
    for (let i = 0; hours > i; i++) {
      const timeC = moment(nowMM.startOf("hour")).add(i, "hours");
      let result = timeC.format("HH:mm");
      if (result === "00:00") {
        array.push({
          nextDay: timeC.format("DD/MM/YYYY"),
          time: timeC,
        });
      } else {
        array.push({
          result,
          time: timeC,
        });
      }
    }
    setArrTimes(array);
    setMaxScroll(array.length * 300 - rightRef.current.offsetWidth);
  }, [currentTime, endTime, rightRef]);

  useEffect(() => {
    rightRef.current.scrollLeft = scroll;
  }, [scroll]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().unix());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const { items } = data;
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <h5>Kênh</h5>
          <div className={styles.content}>
            {items.map((item) => {
              const {
                item: { thumbnailM },
              } = item;
              return (
                <div className={styles.img}>
                  <img src={thumbnailM} alt="" />;
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightContent} ref={rightRef}>
            <div
              className={styles.rightWrap}
              style={{
                width: `${arrTimes.length * 300}px`,
              }}
            >
              <div className={styles.time}>
                {arrTimes.map((time, index) => {
                  const { nextDay, result } = time;
                  return (
                    <div
                      className={clsx(
                        styles.timeText,
                        nextDay && styles.timeTextNextDay
                      )}
                    >
                      {index > 0 ? nextDay || result : ""}
                    </div>
                  );
                })}
              </div>
              <div className={styles.content}>
                {items.map((item, index) => {
                  const { programs } = item;
                  return (
                    <div className={styles.itemsRow}>
                      <div className={styles.itemsRowWrap}>
                        {programs.map((program, index) => {
                          const { startTime, endTime, thumbnail, title } =
                            program;
                          const beginTime = arrTimes[0]?.time.unix();
                          if (endTime <= beginTime) return null;
                          const startText = moment
                            .unix(startTime)
                            .format("HH:mm");
                          const endText = moment.unix(endTime).format("HH:mm");
                          let now = moment
                            .unix(startTime < beginTime ? beginTime : startTime)
                            .format("DD/MM/YYYY HH:mm:ss");
                          let then = moment
                            .unix(endTime)
                            .format("DD/MM/YYYY HH:mm:ss");

                          let nowMM = moment(now, "DD/MM/YYYY HH:mm:ss");
                          let thenMM = moment(then, "DD/MM/YYYY HH:mm:ss");
                          let ms = thenMM.diff(nowMM);
                          let hours = moment.duration(ms).asHours();
                          if (index === programs.length - 1) hours--;
                          return (
                            <div
                              className={styles.item}
                              style={{
                                width: `${hours * 300}px`,
                              }}
                              key={index}
                            >
                              <div className={styles.itemWrap}>
                                <img src={thumbnail} alt="" />
                                <div className={styles.info}>
                                  <span>{title}</span>
                                  <p>
                                    {startText} - {endText}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className={styles.currentTime}
              style={{
                left: `${(moment.unix(currentTime).minute() / 60) * 300}px`,
              }}
            >
              <span>{moment.unix(currentTime).format("hh:mm")}</span>
              <div className={styles.bar}>
                <div className={styles.last}></div>
              </div>
            </div>
          </div>
          <div className={styles.btnWrap}>
            {scroll > 0 && (
              <button className={styles.btnLeft} onClick={handleScrollLeft}>
                <ButtonIcon fill={true} size={50}>
                  <MdOutlineArrowBackIosNew />
                </ButtonIcon>
              </button>
            )}
            {scroll < maxScroll && (
              <button className={styles.btnRight} onClick={handleScrollRight}>
                <ButtonIcon fill={true} size={50} fontSize={24}>
                  <MdOutlineArrowForwardIos />
                </ButtonIcon>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
