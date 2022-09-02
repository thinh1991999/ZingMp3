import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./EventModal.module.scss";
import "./EventModal.css";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store";
import Loading from "../Loading/Loading";
import httpService from "../../../Services/http.service";
import { Swiper, SwiperSlide } from "swiper/react";
import EventItem from "./EventItem/EventItem";

export default function EventModal() {
  const dispatch = useDispatch();

  const idEventShow = useSelector((state) => state.event.idEventShow);

  const swiperRef = useRef(null);
  const options = useRef(["Tất cả", "Tháng"]).current;
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    swiperRef.current.swiper.slideTo(activeIndex + 1);
  }, [activeIndex]);

  const handleBack = useCallback(() => {
    swiperRef.current.swiper.slideTo(activeIndex - 1);
  }, [activeIndex]);

  const setIdx = useCallback((idx) => {
    swiperRef.current.swiper.slideTo(idx);
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    setLoading(true);
    httpService.getEvent().then((res) => {
      const { data } = res.data;
      const findIdx = data.findIndex((item) => {
        return item.encodeId === idEventShow;
      });
      data.unshift(data[findIdx]);
      data.splice(findIdx + 1, 1);
      setData(data);
      setLoading(false);
    });
  }, [idEventShow]);
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.layer}></div>
        <div className={styles.content}>
          {loading ? (
            <Loading size={30} />
          ) : (
            <div className={styles.contentWrap}>
              <Swiper
                breakpoints={{
                  0: {
                    slidesPerView: 1.5,
                  },
                  426: {
                    slidesPerView: 2.5,
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
                centeredSlides={true}
                initialSlide={activeIndex}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.activeIndex);
                }}
                ref={swiperRef}
              >
                {data.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      {({ isActive }) => (
                        <EventItem
                          data={item}
                          active={isActive}
                          activeIndex={activeIndex}
                          index={index}
                          handleBack={handleBack}
                          handleNext={handleNext}
                          setIdx={setIdx}
                          size={data.length}
                        />
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}
        </div>
        <div className={styles.btnWrap}>
          {!loading && (
            <ul className={styles.options}>
              {options.map((option, index) => {
                return (
                  <li
                    className={current === index && styles.active}
                    key={index}
                    onClick={() => setCurrent(index)}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
          )}
          <button
            onClick={() => {
              dispatch(actions.setShowEvent(false));
              dispatch(actions.setIDShowEvent(null));
            }}
          >
            <ButtonIcon size={40} fontSize={30} bg="gray">
              <AiOutlineClose />
            </ButtonIcon>
          </button>
        </div>
      </div>
    </div>
  );
}
