import React from "react";
import styles from "./Artists.module.scss";
import { Row } from "react-bootstrap";
import clsx from "clsx";
import Artist from "../Artist/Artist";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function Artists({ data }) {
  // const noArtists = data.length === 0 ? styles.noArtists : "";
  const finalClass = clsx(styles.artists);
  const { items, title } = data;
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
