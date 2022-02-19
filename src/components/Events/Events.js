import React, { useEffect, useRef, useState } from "react";
import styles from "./Events.module.scss";
import { HomeTitle, Event } from "..";
import { Row } from "react-bootstrap";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

function Events({ data }) {
  const { title, items } = data;

  const [currentSize, setCurrentSize] = useState(0);
  const [fullSize, setFullSize] = useState(0);
  const [countSlide, setCountSlide] = useState(0);

  const [current, setCurrent] = useState(1);

  const containerRef = useRef(null);

  const handleNextSlide = (e) => {
    if (current < countSlide) {
      if (current !== countSlide - 1) {
        containerRef.current.scrollLeft = (current + 1) * currentSize;
      } else {
        containerRef.current.scrollLeft = fullSize;
      }
      setCurrent((prev) => prev + 1);
    }
  };

  const handleBackSlide = () => {
    if (current > 1) {
      if (current === 2) {
        containerRef.current.scrollLeft = 0;
      } else {
        containerRef.current.scrollLeft = (current - 1) * currentSize;
      }
      setCurrent((prev) => prev - 1);
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollLeft > 0) {
      setCurrent(Math.ceil(e.target.scrollLeft / currentSize) + 1);
    } else {
      setCurrent(1);
    }
  };

  useEffect(() => {
    setCurrentSize(containerRef.current.getBoundingClientRect().width);
    setFullSize(containerRef.current.scrollWidth);
    const nb = Math.ceil(
      containerRef.current.scrollWidth /
        containerRef.current.getBoundingClientRect().width
    );
    setCountSlide(nb);
  }, []);

  return (
    <div className={styles.events}>
      <div className={styles.eventsTitle}>
        <HomeTitle msg={title} />
        <div className={styles.btn}>
          <div
            className={current === 1 ? "" : styles.btnChildActive}
            onClick={handleBackSlide}
          >
            <AiOutlineLeft />
          </div>
          <div
            className={current < countSlide ? styles.btnChildActive : ""}
            onClick={handleNextSlide}
          >
            <AiOutlineRight />
          </div>
        </div>
      </div>
      <div className={styles.eventsWrap}>
        <Row
          className={styles.eventsContainer}
          ref={containerRef}
          onScroll={handleScroll}
        >
          {items.map((item, index) => {
            const { encodeId } = item;
            return <Event data={item} key={encodeId} />;
          })}
        </Row>
      </div>
    </div>
  );
}

export default Events;
