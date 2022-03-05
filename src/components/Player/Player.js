import React, { useEffect, useState } from "react";
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
    currentSinger,
    showPlayLists,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [volume, setVolume] = useState(50);

  const {
    encodeId,
    title,
    thumbnail,
    artists = [],
    duration,
    album,
  } = currentSong;

  const handleToAlbum = (e) => {
    const arr = Array.from([...e.target.classList]);
    if (
      arr.includes(styles.playLeft) ||
      arr.includes(styles.playInfo) ||
      arr.includes(styles.playRight)
    ) {
      if (currentAlbum) {
        console.log(currentAlbum);
        navigate(`/Album/${currentAlbum}`);
      }
      if (currentSinger) {
        console.log(currentSinger);
        navigate(`/Singer/${currentSinger}`);
      }
    }
  };
  const fetchDataSong = async () => {
    dispatch(actions.setSongLoading(true));
    try {
      console.log(encodeId);
      const respon = await fetch(`${SONG_API}${encodeId}`);
      const { err, data, url } = await respon.json();
      if (err === 0) {
        dispatch(actions.setSong(data[128]));
        dispatch(actions.setSongLoading(false));
        dispatch(actions.setSongCurrentTime(0));
        dispatch(actions.setFetchSong(false));
      } else if (err === -1110) {
        dispatch(
          actions.setSong(
            `http://api.mp3.zing.vn/api/streaming/audio/${encodeId}/320`
          )
        );
        dispatch(actions.setSongLoading(false));
        dispatch(actions.setSongCurrentTime(0));
        dispatch(actions.setFetchSong(false));
      } else {
        dispatch(actions.playNextSong());
      }
    } catch (error) {
      dispatch(actions.playNextSong());
    }
  };

  const openLyric = () => {
    dispatch(actions.setShowLyric(true));
  };

  const handleShowPlayLists = () => {
    dispatch(actions.setShowPlayLists(!showPlayLists));
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
        <Col className={styles.playLeft} xl={3} lg={3} md={3}>
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
                  position: "CenterUp",
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
                  position: "CenterUp",
                }}
              >
                <BsThreeDots />
              </ButtonIcon>
            </div>
          </div>
        </Col>
        <Col className={styles.playCenter} xl={6} lg={6} md={6}>
          <PlayerCenter
            data={song}
            songLoading={songLoading}
            duration={duration}
            volume={volume}
          />
        </Col>
        <Col className={styles.playRight} xl={3} lg={3} md={3}>
          <div className={styles.playRightWrap}>
            <div className={styles.btnWrap} onClick={openLyric}>
              <ButtonIcon
                popper={{
                  show: true,
                  msg: "Xem lời bài hát",
                  position: "CenterUp",
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
                  position: "CenterUp",
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
            <div
              className={clsx(
                styles.btnWrap,
                showPlayLists && styles.btnWrapActive
              )}
              onClick={handleShowPlayLists}
            >
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
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Player;
