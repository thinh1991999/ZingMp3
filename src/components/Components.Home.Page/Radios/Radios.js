import React from "react";
import { Row } from "react-bootstrap";
import clsx from "clsx";
import styles from "./Radios.module.scss";
import Radio from "../../Components.Global/Radio/Radio";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";

function Radios({ data }) {
  const { title, items } = data;

  return (
    <div className={clsx(styles.radios, "pd-15-px")}>
      <h2 className={styles.radiosTitle}>
        {title} {items.length > 7 ? <Link to={"/Radio"}>Tất cả</Link> : ""}
      </h2>
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
                <Radio data={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Radios;
