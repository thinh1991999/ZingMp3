import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Player.module.scss";
import { actions, SONG_API } from "../../store";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { PlayerCenter } from "..";
import { AiOutlineHeart } from "react-icons/ai";
import {
  BsThreeDots,
  BsVolumeMute,
  BsVolumeUp,
  BsMusicNoteList,
} from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import { BiWindows } from "react-icons/bi";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Player() {
  const {
    songLoading,
    currentSong,
    song,
    showLyric,
    invi,
    fetchSong,
    currentAlbum,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [volume, setVolume] = useState(50);

  const { encodeId, title, thumbnail, artists = [], duration } = currentSong;

  const handleToAlbum = (e) => {
    console.log(e.target.classList.value);
    if (
      e.target.classList.value === styles.playLeft ||
      e.target.classList.value === styles.playInfo
    ) {
      console.log(1);
      navigate(`/Album/${currentAlbum}`);
    }
  };

  const fetchDataSong = async () => {
    dispatch(actions.setSongLoading(true));
    try {
      const respon = await fetch(`${SONG_API}${encodeId}`);
      const { err, data } = await respon.json();
      if (err === 0) {
        dispatch(actions.setSong(data[128]));
        dispatch(actions.setSongLoading(false));
        dispatch(actions.setSongCurrentTime(0));
        dispatch(actions.setFetchSong(false));
      } else if (err < 0) {
        console.log("cant find");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const openLyric = () => {
    dispatch(actions.setShowLyric(true));
  };

  const handleVolume = (e) => {
    setVolume(+e.target.value);
  };

  const handleClickVolume = (e) => {
    if (volume === 0) {
      setVolume(100);
    } else {
      setVolume(0);
    }
  };

  useEffect(() => {
    if (fetchSong) {
      fetchDataSong();
    }
  }, [fetchSong]);

  useEffect(() => {
    dispatch(actions.setPlaying(!songLoading));
  }, [songLoading]);

  const inviClass = invi ? styles.inviClass : "";
  const lyricClass = showLyric ? styles.lyricClass : "";
  const finalClass = clsx(styles.play, lyricClass, inviClass);

  return (
    <div className={finalClass} onClick={handleToAlbum}>
      <Row className={styles.playWrap}>
        <Col className={styles.playLeft} lg={3}>
          <div className={styles.playImg}>
            <img src={thumbnail} alt={title} />
          </div>
          <div className={styles.playInfo}>
            <div className={styles.playTitleWrap}>
              <h3 className={styles.playTitle}>{title}</h3>
            </div>
            <p>
              {artists.map((artist, index) => {
                const { id, name, alias } = artist;
                if (index === 0) {
                  return (
                    <Link
                      to={`/Singer/${alias}`}
                      className={styles.playSub}
                      key={id}
                    >
                      {name}
                    </Link>
                  );
                }
                return (
                  <Link
                    to={`/Singer/${alias}`}
                    className={styles.playSub}
                    key={id}
                  >
                    ,{name}
                  </Link>
                );
              })}
            </p>
          </div>
          <div className={styles.playLeftIcon}>
            <div className={styles.leftBtn}>
              <ButtonIcon
                popper={{
                  show: true,
                  msg: "Thêm vào thư viện",
                }}
              >
                <AiOutlineHeart />
              </ButtonIcon>
            </div>
            <div className={styles.leftBtn}>
              <ButtonIcon
                popper={{
                  show: true,
                  msg: "Xem thêm",
                }}
              >
                <BsThreeDots />
              </ButtonIcon>
            </div>
          </div>
        </Col>
        <Col className={styles.playCenter} lg={6}>
          <PlayerCenter
            data={song}
            songLoading={songLoading}
            duration={duration}
            volume={volume}
          />
        </Col>
        <Col className={styles.playRight} lg={3}>
          <div className={styles.playRightWrap}>
            <div className={styles.btnWrap} onClick={openLyric}>
              <ButtonIcon
                popper={{
                  show: true,
                  msg: "Xem lời bài hát",
                }}
              >
                <GiMicrophone />
              </ButtonIcon>
            </div>
            <div className={styles.btnWrap}>
              <ButtonIcon
                popper={{
                  show: true,
                  msg: "Chế độ cửa sổ",
                }}
              >
                <BiWindows />
              </ButtonIcon>
            </div>
            <div className={styles.playRightAudio}>
              <label htmlFor="playSoundInput">
                <div
                  className={styles.playBtnSound}
                  onClick={handleClickVolume}
                >
                  {volume === 0 ? (
                    <ButtonIcon>
                      <BsVolumeMute />
                    </ButtonIcon>
                  ) : (
                    <ButtonIcon>
                      <BsVolumeUp />
                    </ButtonIcon>
                  )}
                </div>
              </label>
              <input
                type="range"
                id="playSoundInput"
                className={styles.playSoundInput}
                value={volume}
                min={0}
                max={100}
                onChange={handleVolume}
              />
            </div>
            <ButtonIcon
              popper={{
                show: true,
                msg: "Danh sách phát",
                position: "RightUp",
              }}
            >
              <BsMusicNoteList />
            </ButtonIcon>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Player;
