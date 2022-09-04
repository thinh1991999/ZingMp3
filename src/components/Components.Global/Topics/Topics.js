import React from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import styles from "./Topics.module.scss";
import HomeTitle from "../HomeTitle/HomeTitle";
import Topic from "../Topic/Topic";

function Topics({ data, top = false }) {
  const { title, items = [] } = data;

  return (
    <div className={clsx(styles.topics, top && styles.topWrap)}>
      {title && (
        <div className={styles.topicsTitle}>
          <HomeTitle msg={title} />
          {/* {items?.length > 5 ? <a href="#">Tất cả</a> : ""} */}
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
          className="swiper-margin"
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
