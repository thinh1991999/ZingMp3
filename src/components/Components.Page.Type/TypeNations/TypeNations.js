import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import styles from "./TypeNations.module.scss";
import { Link } from "react-router-dom";

export default function TypeNations({ data }) {
  return (
    <div className={styles.container}>
      <h5>Quốc gia</h5>
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
              slidesPerView: `${4}`,
            },
            1440: {
              slidesPerView: `${4}`,
            },
          }}
          modules={[Navigation]}
          navigation={true}
        >
          {data.map((item) => {
            const { thumbnailHasText, encodeId } = item;
            return (
              <SwiperSlide key={encodeId}>
                <Link to={`/typeDetail/${encodeId}`} className={styles.nation}>
                  <div className={styles.nationWrap}>
                    <img src={thumbnailHasText} alt="" />
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
