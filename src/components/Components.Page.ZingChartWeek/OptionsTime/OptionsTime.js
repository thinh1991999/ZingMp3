import React, { useRef, useState } from "react";
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

export default function OptionsTime({ optionsTime }) {
  const optionsRef = useRef(null);

  const [show, setShow] = useState(false);

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

  return (
    <div className={styles.container} id="optionsTime">
      <div className={styles.timeShow} onClick={() => setShow(!show)}>
        <span>Tuần 31 (01/08-02/09)</span>
        {show ? <AiOutlineUp /> : <AiOutlineDown />}
      </div>
      <div
        className={clsx(
          styles.optionsTimeWrap,
          show && styles.optionsTimeWrapActive
        )}
      >
        <Swiper slidesPerView={1} ref={optionsRef} allowTouchMove={false}>
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
                    const { weekCount, begin, end } = item;
                    return (
                      <div key={index} className={styles.itemTime}>
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
