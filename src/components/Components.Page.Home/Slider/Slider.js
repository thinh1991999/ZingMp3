import clsx from "clsx";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Slider.module.scss";
import WarningSliderSong from "./WarningSliderSong/WarningSliderSong";

function Slider({ data }) {
  const navigate = useNavigate();

  const { items } = data;
  const sliders = useRef(items).current;

  const [index, setIndex] = useState(1);
  const [prevIndex, setPrevIndex] = useState(index - 1);
  const [nextIndex, setNextIndex] = useState(index + 1);
  const [pause, setPause] = useState(false);
  const [showWarningSong, setShowWarningSong] = useState({
    show: false,
    info: null,
  });

  const handleClick = (slider) => {
    const { link, encodeId } = slider;
    if (link.includes("album") || link.includes("playlist")) {
      navigate(`/album/${encodeId}`);
      return;
    }
    if (link.includes("bai-hat")) {
      setShowWarningSong({
        show: true,
        info: slider,
      });
      return;
    }
    toast.error("Chưa được hỗ trợ");
  };

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
  }, [index, prevIndex, nextIndex, sliders]);

  useEffect(() => {
    let loopSlider;
    if (!pause) {
      loopSlider = setInterval(() => {
        setPrevIndex(index);
        setIndex(nextIndex);
        setNextIndex(nextIndex + 1);
      }, 3000);
    }
    return () => {
      clearInterval(loopSlider);
    };
  }, [index, prevIndex, nextIndex, pause]);

  return (
    <>
      <Row className={styles.slider}>
        <div
          className={styles.sliderContainer}
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
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
                <div
                  className={styles.sliderLink}
                  onClick={() => handleClick(slider)}
                >
                  <img className={styles.sliderImg} src={banner} alt="" />
                </div>
              </Col>
            );
          })}
        </div>
      </Row>
      {showWarningSong.show && (
        <WarningSliderSong
          info={showWarningSong.info}
          setShowWarningSong={setShowWarningSong}
        />
      )}
    </>
  );
}

export default Slider;
