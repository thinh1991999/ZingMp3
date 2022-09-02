import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { Row, Col } from "react-bootstrap";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

import styles from "./Topics.module.scss";
import HomeTitle from "../HomeTitle/HomeTitle";
import Topic from "../Topic/Topic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function Topics({ data, top = false }) {
  const [value, setValue] = useState(data);

  const { title, items = [] } = value;

  return (
    <div className={clsx(styles.topics, top && styles.topWrap)}>
      {title && (
        <div className={styles.topicsTitle}>
          <HomeTitle msg={title} />
          {items?.length > 5 ? <a href="#">Tất cả</a> : ""}
        </div>
      )}
      <div className={styles.content}>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            426: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: `${5}`,
            },
            1440: {
              slidesPerView: `${6}`,
            },
          }}
          modules={[Navigation]}
          navigation={true}
        >
          {items.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Topic data={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Topics;
