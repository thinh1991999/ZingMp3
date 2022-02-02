import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./Lyric.module.scss";
import { actions, LYRIC_API } from "../../store";
import { Row, Col } from "react-bootstrap";
import { ButtonIcon, LyricBody, LyricSetting, LyricKara, LyricList } from "..";
import {
  AiOutlineFullscreen,
  AiOutlineDown,
  AiOutlineSetting,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

function Lyric() {
  const { showLyric, currentSong, currentIndexSong, songCurrentTime, invi } =
    useSelector((state) => state);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [lyrics, setLyrics] = useState([]);
  const [images, setImages] = useState([]);
  const [lyricsText, setLyricsText] = useState([]);
  const [textActiveIndex, setTextActiveIndex] = useState(0);
  const [image, setImage] = useState("");
  const [bg, setBg] = useState(false);
  const [sizes, setSizes] = useState([
    {
      name: "S",
      size: 34,
    },
    {
      name: "M",
      size: 38,
    },
    {
      name: "X",
      size: 42,
    },
  ]);
  const [textSize, setTextSize] = useState("S");
  const [bgShow, setBgShow] = useState(0);
  const [count, setCount] = useState(0);
  const [controll, setControll] = useState(2);
  const [features, setFeatures] = useState([
    "Danh sách phát",
    "Karaoke",
    "Lời bài hát",
  ]);
  const [showSetting, setShowSetting] = useState(false);

  const lyricRef = useRef(null);
  const settingRef = useRef(null);
  const settingBtnRef = useRef(null);

  const { encodeId, title, thumbnailM, artists = [], duration } = currentSong;

  const fetchLyricData = async () => {
    setLyrics([]);
    try {
      const respon = await fetch(`${LYRIC_API}${encodeId}`);
      const {
        data: { sentences, defaultIBGUrls: images },
      } = await respon.json();
      setImages(images);
      setLyrics(sentences);
    } catch (error) {}
  };

  const closeLyric = () => {
    dispatch(actions.setShowLyric(false));
    setShowSetting(false);
    dispatch(actions.setInvi(false));
  };

  const handleChangeHeader = (index) => {
    setControll(index);
  };

  const handleShowSetting = () => {
    setShowSetting(!showSetting);
  };

  const handleFullScreen = () => {
    // if (elem.requestFullscreen) {
    //   elem.requestFullscreen();
    // } else if (elem.mozRequestFullScreen) {
    //   elem.mozRequestFullScreen();
    // } else if (elem.webkitRequestFullscreen) {
    //   elem.webkitRequestFullscreen();
    // } else if (elem.msRequestFullscreen) {
    //   elem = window.top.document.body;
    //   elem.msRequestFullscreen();
    // }
  };

  useEffect(() => {
    if (thumbnailM) {
      setImage(thumbnailM.replace("w240", "w480"));
    }
  }, [currentSong]);

  useEffect(() => {
    if (showLyric) {
      fetchLyricData();
    }
  }, [showLyric, currentSong, currentIndexSong]);

  useEffect(() => {
    const newArr = lyrics.map((lyric) => {
      const { words } = lyric;
      let start, end;
      const text = words
        .map((word, wordIndex) => {
          const { startTime, endTime, data } = word;
          if (wordIndex === 0) {
            start = startTime;
          } else if (wordIndex === words.length - 1) {
            end = endTime;
          }
          return data;
        })
        .join(" ");
      return {
        text,
        start,
        end,
      };
    });
    setLyricsText(newArr);
    setTextActiveIndex(0);
  }, [lyrics, currentIndexSong, currentSong]);

  useEffect(() => {
    const acticeText = lyricsText.filter((lyricText, index) => {
      const { start, end } = lyricText;
      const current = songCurrentTime * 1000;
      return start < current && end > current;
    });
    const newIndex = lyricsText.findIndex((lyricText) => {
      return lyricText === acticeText[0];
    });
    if (newIndex !== -1) {
      setTextActiveIndex(newIndex);
    }
  }, [songCurrentTime]);

  useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, [songCurrentTime]);

  const settingClick = (e) => {
    let valid = false;
    if (!settingRef) {
      setShowSetting(false);
    } else {
      valid = settingBtnRef.current.contains(e.target);
    }
    if (!valid) {
      setShowSetting(false);
    }
  };

  useEffect(() => {
    if (showSetting) {
      window.addEventListener("click", settingClick);
    }
    return () => {
      if (showSetting) {
        window.removeEventListener("click", settingClick);
      }
    };
  }, [showSetting]);

  useEffect(() => {
    const countBg = duration / images.length;
    const hint = Math.floor(songCurrentTime / countBg);
    setBgShow(hint);
  }, [songCurrentTime]);

  useEffect(() => {
    let timeout;
    const eventMouseMove = () => {
      clearTimeout(timeout);
      dispatch(actions.setInvi(false));
      timeout = setTimeout(() => {
        dispatch(actions.setInvi(true));
      }, 6000);
    };
    if (lyricRef && showLyric) {
      lyricRef.current.addEventListener("mousemove", eventMouseMove);
    }
    return () => {
      if (lyricRef.current) {
        lyricRef.current.removeEventListener("mousemove", eventMouseMove);
        clearTimeout(timeout);
      }
    };
  }, [showLyric]);

  useEffect(() => {
    if (invi) {
      setShowSetting(false);
    }
  }, [invi]);

  const showClass = showLyric ? styles.showLyric : "";

  return (
    <div className={clsx(styles.lyric, showClass)} ref={lyricRef}>
      <div className={styles.lyricWrap}>
        <div className={styles.bg}>
          <div
            className={styles.blur}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
          <div className={styles.layer}></div>
          <div
            className={styles.image}
            style={{
              display: `${bg ? "" : "none"}`,
            }}
          >
            <div className={styles.imageWrap}>
              {images.map((item, index) => {
                let baseClass = styles.imageHide;
                if (index === bgShow) {
                  baseClass = styles.imageShow;
                }
                return (
                  <div className={baseClass} key={index}>
                    <img src={item} alt="" />
                  </div>
                );
              })}
            </div>

            {/* <div className={styles.imageBehind}>
              <img
                src="https://photo-resize-zmp3.zadn.vn/w1920_r3x2_jpeg/cover/e/1/3/e/e13eba8bece6dee40b09d08e33f50129.jpg"
                alt=""
              />
            </div>
            <div className={styles.imageShow}>
              <img
                src="https://photo-resize-zmp3.zadn.vn/w1920_r3x2_jpeg/cover/8/d/2/6/8d264b2ba5ede2840f812a0434f7e81a.jpg"
                alt=""
              />
            </div> */}
          </div>
        </div>
        <div className={styles.info}>
          <Row className={clsx(styles.header, invi && styles.headerInvi)}>
            <Col lg={3} className={styles.headerLeft}></Col>
            <Col lg={6} className={styles.headerCenter}>
              <div className={styles.wrap}>
                <ul>
                  {features.map((feature, index) => {
                    if (index === controll) {
                      return (
                        <li key={index} className={styles.active}>
                          {feature}
                        </li>
                      );
                    }
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          handleChangeHeader(index);
                        }}
                      >
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
            <Col lg={3} className={styles.headerRight}>
              <div className={styles.btn} onClick={handleFullScreen}>
                <ButtonIcon
                  fill={true}
                  size={24}
                  popper={{
                    show: true,
                    msg: "Toàn màn hình",
                    position: "CenterDown",
                  }}
                >
                  <AiOutlineFullscreen />
                </ButtonIcon>
              </div>
              <div className={styles.btn} ref={settingBtnRef}>
                <div className={styles.btnWrap} onClick={handleShowSetting}>
                  <ButtonIcon
                    fill={true}
                    size={24}
                    popper={{
                      show: true,
                      msg: "Cài đặt",
                      position: "CenterDown",
                    }}
                  >
                    <AiOutlineSetting />
                  </ButtonIcon>
                </div>
                {showSetting ? (
                  <div className={styles.btnDrop} ref={settingRef}>
                    <LyricSetting
                      data={{
                        bg,
                        setBg,
                        sizes,
                        setSizes,
                        textSize,
                        setTextSize,
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className={styles.btn} onClick={closeLyric}>
                <ButtonIcon
                  fill={true}
                  size={24}
                  popper={{
                    show: true,
                    msg: "Đóng",
                    position: "CenterDown",
                  }}
                >
                  <AiOutlineDown />
                </ButtonIcon>
              </div>
            </Col>
          </Row>
          <div className={styles.body}>
            {controll === 2 ? (
              <LyricBody
                setCount={setCount}
                data={{
                  image,
                  title,
                  lyricsText,
                  textActiveIndex,
                  count,
                  sizes,
                  textSize,
                }}
              />
            ) : (
              ""
            )}
            {controll === 1 ? (
              <LyricKara
                data={{
                  lyrics,
                  textActiveIndex,
                }}
              />
            ) : (
              ""
            )}
            {controll === 0 ? <LyricList /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Lyric);
