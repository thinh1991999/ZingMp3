import React, { useEffect, useRef, useState } from "react";
import styles from "./Events.module.scss";
import { HomeTitle, Event } from "..";
import { Row } from "react-bootstrap";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

function Events({ data }) {
  const { title, items } = data;

  const [countSlide, setCountSlide] = useState(
    Math.floor(items.length / 3) - 1
  );

  const [redundancy, setRedundancy] = useState(
    items.length - (countSlide + 1) * 3
  );
  const [current, setCurrent] = useState(0);
  const [back, setBack] = useState(true);

  const containerRef = useRef(null);

  const handleNextSlide = (e) => {
    if (current >= countSlide) {
      setCurrent(countSlide + 1);
    } else {
      setCurrent(current + 1);
    }
    setBack(false);
  };

  const handleBackSlide = () => {
    if (current === 0) {
      setCurrent(0);
    } else {
      setCurrent(current - 1);
    }
    setBack(true);
  };

  useEffect(() => {
    if (back) {
      if (current === 0) {
        containerRef.current.style.transform = `translateX(-${0}%)`;
      } else {
        const position = current * 100;
        containerRef.current.style.transform = `translateX(calc(-${position}% + (100%/3)*${
          redundancy * 2
        }))`;
      }
    } else {
      if (current === countSlide + 1) {
        const position = countSlide * 100;
        containerRef.current.style.transform = `translateX(calc(-${position}% + (-100%/3)*${redundancy}))`;
      } else {
        const position = current * 100;
        containerRef.current.style.transform = `translateX(-${position}%)`;
      }
    }
  }, [current, back]);

  return (
    <div className={styles.events}>
      <div className={styles.eventsTitle}>
        <HomeTitle msg={title} />
        <div className={styles.btn}>
          <div
            className={current === 0 ? "" : styles.btnChildActive}
            onClick={handleBackSlide}
          >
            <AiOutlineLeft />
          </div>
          <div
            className={current <= countSlide ? styles.btnChildActive : ""}
            onClick={handleNextSlide}
          >
            <AiOutlineRight />
          </div>
        </div>
      </div>
      <div className={styles.eventsWrap}>
        <Row className={styles.eventsContainer} ref={containerRef}>
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
