import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import HomeTitle from "../../Components.Global/HomeTitle/HomeTitle";
import Event from "../Event/Event";
import styles from "./Events.module.scss";

function Events({ data }) {
  const { title, items } = data;

  return (
    <div className={styles.events}>
      <div className={styles.eventsTitle}>
        <HomeTitle msg={title} />
      </div>
      <div className={styles.eventsWrap}>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            426: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          navigation={true}
          className="swiper-margin"
        >
          {items?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Event data={item} />;
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Events;
