import React from "react";
import styles from "./Mvs.module.scss";
import { Row } from "react-bootstrap";
import HomeTitle from "../HomeTitle/HomeTitle";
import Mv from "../Mv/Mv";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function Mvs({ data }) {
  const { title, items = [] } = data;

  return (
    <div
      className={styles.mvs}
      style={{
        display: `${items.length === 0 ? "none" : "block"}`,
      }}
    >
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
              slidesPerView: `${3}`,
            },
            1440: {
              slidesPerView: `${4}`,
            },
          }}
          modules={[Navigation]}
          navigation={true}
        >
          {items?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Mv data={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Mvs;
