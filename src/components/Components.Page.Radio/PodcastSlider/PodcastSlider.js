import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Podcast from "../Podcast/Podcast";

import styles from "./PodcastSlider.module.scss";

export default function PodcastSlider({ data }) {
  const { title, items } = data;
  return (
    <div className={styles.container}>
      <h5>{title}</h5>
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
              <Podcast data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
