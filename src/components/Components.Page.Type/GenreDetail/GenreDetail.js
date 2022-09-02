import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import Topic from "../../Components.Global/Topic/Topic";

import styles from "./GenreDetail.module.scss";

export default function GenreDetail({ data }) {
  const { title, playlists } = data;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h5>{title}</h5>
        <button className="text-link">
          Tất cả <AiOutlineRight />
        </button>
      </div>
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
          {playlists.map((playlist, index) => {
            return (
              <SwiperSlide key={index}>
                <div className={styles.playlist}>
                  <Topic data={playlist} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
