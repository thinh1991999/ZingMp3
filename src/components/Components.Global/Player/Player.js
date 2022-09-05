import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import {
  BsThreeDots,
  BsVolumeMute,
  BsVolumeUp,
  BsMusicNoteList,
} from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Player.module.scss";
import { actions } from "../../../store";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import PlayerCenter from "../PlayerCenter/PlayerCenter";
import HttpService from "../../../Services/http.service";
import { ultils } from "../../../Share";

function Player() {
  const {
    currentSong,
    showLyric,
    invi,
    fetchSong,
    currentAlbum,
    showPlayLists,
    timeToStop,
  } = useSelector((state) => state.song);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [volume, setVolume] = useState(50);

  const handleToAlbum = (e) => {
    const arr = Array.from([...e.target.classList]);
    if (
      arr.includes(styles.playLeft) ||
      arr.includes(styles.playInfo) ||
      arr.includes(styles.playRight)
    ) {
      if (currentAlbum) {
        navigate(`/Album/${currentAlbum}`);
      } else {
        toast.error("Bài hát này không hỗ trợ Album");
      }
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
    const fetchDataSong = () => {
      dispatch(actions.setSongLoading(true));
      HttpService.getSongPlayer(currentSong?.encodeId).then((res) => {
        const { err, data } = res.data;
        if (err === 0) {
          dispatch(actions.playSongAfterFetch(data[128]));
        } else if (err === -1110) {
          dispatch(
            actions.playSongAfterFetch(
              ultils.getHighLvSong(currentSong?.encodeId)
            )
          );
        } else {
          dispatch(actions.playNextSong());
        }
      });
    };
    if (fetchSong) {
      fetchDataSong();
    }
  }, [fetchSong, currentSong, dispatch]);

  useEffect(() => {
    if (currentSong) {
      document.title = currentSong.title;
    }
  }, [currentSong]);

  useEffect(() => {
    if (timeToStop === 1) {
      dispatch(actions.setPlaying(false));
    }
  }, [timeToStop, dispatch]);

  return (
    <div
      className={clsx(
        styles.play,
        showLyric ? styles.lyricClass : null,
        invi ? styles.inviClass : null
      )}
      onClick={handleToAlbum}
    >
      <Row className={styles.playWrap}>
        <Col className={styles.playLeft} xl={3} lg={3} md={3}>
          <div className={styles.playImg}>
            <img src={currentSong?.thumbnail} alt={currentSong?.title} />
          </div>
          <div className={styles.playInfo}>
            <div className={styles.playTitleWrap}>
              <h3 className={styles.playTitle}>{currentSong?.title}</h3>
            </div>
            <p>
              {currentSong?.artists?.map((artist, index) => {
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
            <button
              className={styles.leftBtn}
              onClick={() => toast.error("Chức năng này chưa được hỗ trợ")}
            >
              <ButtonIcon
                popper={{
                  show: true,
                  msg: "Thêm vào thư viện",
                  position: "CenterUp",
                }}
              >
                <AiOutlineHeart />
              </ButtonIcon>
            </button>
            <button
              className={styles.leftBtn}
              onClick={() => toast.error("Chức năng này chưa được hỗ trợ")}
            >
              <ButtonIcon
                popper={{
                  show: true,
                  msg: "Xem thêm",
                  position: "CenterUp",
                }}
              >
                <BsThreeDots />
              </ButtonIcon>
            </button>
          </div>
        </Col>
        <Col className={styles.playCenter} xl={6} lg={6} md={6}>
          <PlayerCenter volume={volume} />
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
