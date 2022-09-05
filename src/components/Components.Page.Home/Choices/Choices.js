import React from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import styles from "./Choices.module.scss";
import HomeTitle from "../../Components.Global/HomeTitle/HomeTitle";
import Choice from "../Choice/Choice";

function Choices({ data }) {
  const { items, title } = data;
  return (
    <div className={clsx(styles.choices)}>
      <HomeTitle msg={title} />
      <div className={styles.content}>
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
        >
          {items?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Choice data={item} />;
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Choices;
