import React, { useEffect, useMemo, useRef, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  AiOutlineDown,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineUp,
} from "react-icons/ai";
import clsx from "clsx";

import styles from "./OptionsTime.module.scss";
import "./OptionsTime.css";

export default function OptionsTime({
  optionsTime,
  limitTime,
  currentTime,
  setCurrentTime,
}) {
  const optionsRef = useRef(null);
  const containerRef = useRef(null);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const [idxSlide, setIdxSlide] = useState(0);

  const currentTimeInfo = useMemo(() => {
    let result;
    if (currentTime) {
      setActive(currentTime);
      const { week, year } = currentTime;
      optionsTime.forEach((option, index) => {
        const { items } = option;
        items.forEach((item) => {
          if (item.weekCount === week && item.year === year) {
            result = item;
            setIdxSlide(index);
            return;
          }
        });
      });
    } else {
      setActive(limitTime);
      const { week, year } = limitTime;
      optionsTime.forEach((option, index) => {
        const { items } = option;
        items.forEach((item) => {
          if (item.weekCount === week && item.year === year) {
            result = item;
            setIdxSlide(index);
            return;
          }
        });
      });
    }
    const { begin, end, weekCount } = result;
    return `Tuần ${weekCount} (${begin} - ${end})`;
  }, [optionsTime, limitTime, currentTime]);

  const handleClick = (info) => {
    const { weekCount, year } = info;
    setCurrentTime({ week: weekCount, year });
    setShow(false);
  };

  const handleBack = () => {
    optionsRef.current.swiper.slideTo(
      optionsRef.current.swiper.activeIndex - 1
    );
  };

  const handleNext = () => {
    optionsRef.current.swiper.slideTo(
      optionsRef.current.swiper.activeIndex + 1
    );
  };

  useEffect(() => {
    const eventClick = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setShow(false);
      }
    };
    window.addEventListener("click", eventClick);
    return () => {
      window.removeEventListener("click", eventClick);
    };
  }, [containerRef]);

  return (
    <div className={styles.container} id="optionsTime" ref={containerRef}>
      <div className={styles.timeShow} onClick={() => setShow(!show)}>
        <span>{currentTimeInfo}</span>
        <AiOutlineUp className={clsx(styles.icon, show && styles.iconActive)} />
        <AiOutlineDown
          className={clsx(styles.icon, !show && styles.iconActive)}
        />
      </div>
      <div
        className={clsx(
          styles.optionsTimeWrap,
          show && styles.optionsTimeWrapActive
        )}
      >
        <Swiper
          slidesPerView={1}
          ref={optionsRef}
          allowTouchMove={false}
          initialSlide={idxSlide}
        >
          {optionsTime?.map((item, index) => {
            const { monthKey, items } = item;
            return (
              <SwiperSlide key={index}>
                <div className={styles.itemWrap}>
                  <div className={styles.header}>
                    <button onClick={handleBack}>
                      <AiOutlineLeft />
                    </button>
                    <h6>{monthKey}</h6>
                    <button onClick={handleNext}>
                      <AiOutlineRight />
                    </button>
                  </div>
                  {items.map((item, index) => {
                    const { weekCount, begin, end, year: yearItem } = item;
                    const { week, year } = limitTime;
                    const checkValid =
                      yearItem === year
                        ? weekCount <= week
                          ? true
                          : false
                        : yearItem < year
                        ? true
                        : false;
                    const checkActive =
                      active.year === yearItem && active.week === weekCount;
                    return (
                      <div
                        key={index}
                        className={clsx(
                          styles.itemTime,
                          checkActive && styles.itemTimeActive,
                          checkValid && styles.itemTimeValid
                        )}
                        onClick={
                          checkValid && !checkActive
                            ? () => handleClick(item)
                            : null
                        }
                      >
                        <div className={styles.left}>{weekCount}</div>
                        <div className={styles.right}>
                          {begin} - {end}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
