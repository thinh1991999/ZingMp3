import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Radio from "../../Components.Global/Radio/Radio";

export default function LiveStream({ data }) {
  const { items } = data;
  return (
    <div className="">
      <Swiper
        // slidesPerView={4}
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
            slidesPerView: `${6}`,
          },
          1440: {
            slidesPerView: `${7}`,
          },
        }}
        modules={[Navigation]}
        navigation={true}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Radio data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
