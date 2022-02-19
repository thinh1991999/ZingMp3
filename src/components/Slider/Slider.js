import clsx from "clsx";
import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import styles from "./Slider.module.scss";

function Slider({ data }) {
  const { items } = data;
  const [sliders, setSliders] = useState(items);

  const [index, setIndex] = useState(1);
  const [prevIndex, setPrevIndex] = useState(index - 1);
  const [nextIndex, setNextIndex] = useState(index + 1);
  const handleBackSlider = () => {
    setPrevIndex(prevIndex - 1);
    setIndex(prevIndex);
    setNextIndex(index);
  };

  const handleNextSlider = () => {
    setPrevIndex(index);
    setIndex(nextIndex);
    setNextIndex(nextIndex + 1);
  };

  useEffect(() => {
    if (nextIndex === sliders.length) {
      setNextIndex(0);
    }
    if (prevIndex < 0) {
      setPrevIndex(sliders.length - 1);
    }
  }, [index, prevIndex, nextIndex]);

  useEffect(() => {
    const loopSlider = setInterval(() => {
      setPrevIndex(index);
      setIndex(nextIndex);
      setNextIndex(nextIndex + 1);
    }, 3000);
    return () => {
      clearInterval(loopSlider);
    };
  });

  return (
    <Row className={styles.slider}>
      <div className={styles.sliderContainer}>
        <button className={styles.sliderBtnBack} onClick={handleBackSlider}>
          <MdOutlineArrowBackIosNew />
        </button>
        <button className={styles.sliderBtnNext} onClick={handleNextSlider}>
          <MdOutlineArrowForwardIos />
        </button>
        {sliders.map((slider, indexSlider) => {
          const { banner, encodeId } = slider;
          let position = styles.sliderItemNotShow;
          if (indexSlider === index) {
            position = styles.sliderItemCenter;
          } else if (indexSlider === prevIndex) {
            position = styles.sliderItemLeft;
          } else if (indexSlider === nextIndex) {
            position = styles.sliderItemRight;
          }
          const classNameSlider = clsx(styles.sliderItem, position);

          return (
            <Col
              lg={4}
              xl={4}
              md={6}
              key={`${encodeId}${indexSlider}`}
              className={classNameSlider}
            >
              <a className={styles.sliderLink}>
                <img className={styles.sliderImg} src={banner} alt="" />
              </a>
            </Col>
          );
        })}
      </div>
    </Row>
  );
}

export default Slider;
