import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import styles from "./TypeBanners.module.scss";

export default function TypeBanners({ banners }) {
  return (
    <Swiper
      slidesPerView={1}
      modules={[Navigation]}
      navigation={true}
      className="swiper-margin"
    >
      {banners.map((banner, index) => {
        return (
          <SwiperSlide key={index}>
            <div className={styles.banner}>
              <img src={banner.cover} alt="" />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
