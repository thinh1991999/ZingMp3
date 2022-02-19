import React, { useState, useRef, useEffect } from "react";
import styles from "./Topics.module.scss";
import { Row, Col } from "react-bootstrap";
import { Topic, HomeTitle } from "..";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

function Topics({ data, top = false }) {
  const [value, setValue] = useState(data);

  const { title, items = [] } = value;

  const [currentSize, setCurrentSize] = useState(0);
  const [fullSize, setFullSize] = useState(0);
  const [countSlide, setCountSlide] = useState(0);

  const [current, setCurrent] = useState(1);

  const containerRef = useRef(null);

  const handleNextSlide = () => {
    // containerRef.current.scrollLeft = current * currentSize;

    if (current < countSlide) {
      if (current !== countSlide - 1) {
        containerRef.current.scrollLeft = current * currentSize;
      } else {
        containerRef.current.scrollLeft = fullSize;
      }
      // setCurrent(current + 1);
    }
  };

  // console.log(current);

  const handleBackSlide = () => {
    // containerRef.current.scrollLeft = 0;
    if (current > 1) {
      if (current === 2) {
        containerRef.current.scrollLeft = 0;
      } else {
        // containerRef.current.scrollLeft = 0;
        containerRef.current.scrollLeft =
          fullSize - (current - 1) * currentSize;
      }
      // setCurrent((prev) => prev - 1);
    }
  };

  const handleScroll = (e) => {
    console.log(e.target.scrollLeft);
    console.log(currentSize);
    if (e.target.scrollLeft > 0) {
      setCurrent(Math.ceil(e.target.scrollLeft / currentSize));
      // console.log(Math.ceil(e.target.scrollLeft / currentSize) + 1);
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
  // console.log(items);
  return (
    <div className={styles.topics}>
      <div className={styles.topicsTitle}>
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
      <Row
        className={styles.topicContainer}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {items.map((item, index) => {
          const { encodeId, sortDescription, title, thumbnail } = item;
          // if (index >= 5 && !top) {
          //   return;
          // }
          return (
            <Topic
              key={encodeId}
              data={{
                title,
                sub: sortDescription,
                image: thumbnail,
                id: encodeId,
              }}
            />
          );
        })}
      </Row>
    </div>
  );
}

export default Topics;
