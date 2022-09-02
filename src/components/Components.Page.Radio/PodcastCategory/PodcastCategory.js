import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./PodcastCategory.module.scss";

export default function PodcastCategory({ data }) {
  const { items } = data;
  return (
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
          slidesPerView: `${4}`,
        },
        1440: {
          slidesPerView: `${5}`,
        },
      }}
      modules={[Navigation]}
      navigation={true}
    >
      {items.map((item, index) => {
        const { thumbnail } = item;
        return (
          <SwiperSlide key={index}>
            <div className={styles.container}>
              <div className={styles.wrap}>
                <img src={thumbnail} alt="" />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
