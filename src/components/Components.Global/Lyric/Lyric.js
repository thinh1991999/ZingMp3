import React, { memo, useEffect, useRef, useState } from "react";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineDown,
  AiOutlineSetting,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import { Row, Col } from "react-bootstrap";
import styles from "./Lyric.module.scss";
import { actions } from "../../../store";

import ButtonIcon from "../ButtonIcon/ButtonIcon";
import LyricBody from "./LyricBody/LyricBody";
import LyricSetting from "./LyricSetting/LyricSetting";
import LyricKara from "./LyricKara/LyricKara";
import LyricList from "./LyricList/LyricList";
import httpService from "../../../Services/http.service";
import { useMemo } from "react";

function Lyric() {
  const listSong = useSelector((state) => state.song.listSong);
  const showLyric = useSelector((state) => state.song.showLyric);
  const invi = useSelector((state) => state.song.invi);
  const songCurrentTime = useSelector((state) => state.song.songCurrentTime);
  const currentSong = useSelector((state) => state.song.currentSong);

  const dispatch = useDispatch();

  const [lyrics, setLyrics] = useState([]);
  const [images, setImages] = useState([]);
  const [lyricsText, setLyricsText] = useState([]);
  const [textActiveIndex, setTextActiveIndex] = useState(0);
  const [image, setImage] = useState("");
  const [bg, setBg] = useState(false);
  const [sizes, setSizes] = useState([
    {
      name: "S",
      size: 0.8,
    },
    {
      name: "M",
      size: 0.9,
    },
    {
      name: "X",
      size: 1,
    },
  ]);
  const [textSize, setTextSize] = useState("S");
  const [bgShow, setBgShow] = useState(0);
  const [count, setCount] = useState(0);
  const [controll, setControll] = useState(2);
  const [showSetting, setShowSetting] = useState(false);
  const [fullscreen, setFullScreen] = useState(false);

  const features = useRef(["Danh sách phát", "Karaoke", "Lời bài hát"]).current;

  const lyricRef = useRef(null);
  const settingRef = useRef(null);
  const settingBtnRef = useRef(null);
  const currentIndexSong = useMemo(() => {
    return listSong.findIndex((item) => {
      return item.encodeId === currentSong.encodeId;
    });
  }, [currentSong, listSong]);

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
    const bodyEl = document.body;
    if (!document.fullscreenElement) {
      bodyEl.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
      setFullScreen(true);
    } else {
      setFullScreen(false);
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (currentSong?.thumbnailM) {
      setImage(currentSong.thumbnailM.replace("w240", "w480"));
    }
  }, [currentSong]);

  useEffect(() => {
    const fetchLyricData = () => {
      setLyrics([]);
      httpService.getLyric(currentSong?.encodeId).then((res) => {
        const {
          data: { sentences, defaultIBGUrls: images },
        } = res.data;
        setImages(images);
        setLyrics(sentences);
      });
    };
    if (showLyric) {
      fetchLyricData();
    }
  }, [showLyric, currentSong]);

  useEffect(() => {
    let newArr = [];
    if (typeof lyrics === "object") {
      newArr = lyrics.map((lyric) => {
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
    }

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

  var changeHandler = function () {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement
    ) {
    } else {
      setFullScreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", changeHandler, false);
    document.addEventListener("webkitfullscreenchange", changeHandler, false);
    document.addEventListener("mozfullscreenchange", changeHandler, false);
    return () => {
      document.removeEventListener("fullscreenchange", changeHandler, false);
      document.removeEventListener(
        "webkitfullscreenchange",
        changeHandler,
        false
      );
      document.removeEventListener("mozfullscreenchange", changeHandler, false);
    };
  }, []);

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
    if (currentSong) {
      const countBg = currentSong.duration / images.length;
      const hint = Math.floor(songCurrentTime / countBg);
      setBgShow(hint);
    }
  }, [songCurrentTime, currentSong, images]);
  useEffect(() => {
    // let timeout;
    // const eventMouseMove = () => {
    //   clearTimeout(timeout);
    //   dispatch(actions.setInvi(false));
    //   timeout = setTimeout(() => {
    //     dispatch(actions.setInvi(true));
    //   }, 6000);
    // };
    // if (lyricRef && showLyric) {
    //   lyricRef.current.addEventListener("mousemove", eventMouseMove);
    // }
    // return () => {
    //   if (lyricRef.current) {
    //     lyricRef.current.removeEventListener("mousemove", eventMouseMove);
    //     clearTimeout(timeout);
    //   }
    // };
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

            <div className={styles.imageBehind}>
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
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <Row className={clsx(styles.header, invi && styles.headerInvi)}>
            <Col xl={3} className={styles.headerLeft}></Col>
            <Col sm={9} xl={6} className={styles.headerCenter}>
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
            <Col sm={3} xl={3} className={styles.headerRight}>
              <button className={styles.btn} onClick={handleFullScreen}>
                {fullscreen ? (
                  <ButtonIcon
                    fill={true}
                    size={24}
                    popper={{
                      show: true,
                      msg: "Thoát toàn màn hình",
                      position: "CenterDown",
                    }}
                  >
                    <AiOutlineFullscreenExit />
                  </ButtonIcon>
                ) : (
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
                )}
              </button>
              <div className={styles.btn} ref={settingBtnRef}>
                <button className={styles.btnWrap} onClick={handleShowSetting}>
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
                </button>
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

              <button className={styles.btn} onClick={closeLyric}>
                {!fullscreen && (
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
                )}
              </button>
            </Col>
          </Row>
          <div className={styles.body}>
            {controll === 2 ? (
              <LyricBody
                setCount={setCount}
                data={{
                  image,
                  // title,
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
