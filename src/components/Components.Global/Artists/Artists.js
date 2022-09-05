import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import clsx from "clsx";

import styles from "./Artists.module.scss";
import Artist from "../Artist/Artist";

function Artists({ data }) {
  const { items, title } = data;
  const noArtists = items?.length === 0 ? styles.noArtists : "";
  const finalClass = clsx(styles.artists, noArtists ? styles.noArtists : null);
  return (
    <div className={finalClass}>
      <h4 className={styles.title}>{title}</h4>
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
          {items?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Artist data={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Artists;
