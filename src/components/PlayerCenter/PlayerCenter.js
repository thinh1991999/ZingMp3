import React, { memo, useEffect, useRef, useState } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { PlayingIcon } from "..";
import styles from "./PlayerCenter.module.scss";
import { BiShuffle } from "react-icons/bi";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { MdOutlineRepeat, MdOutlineRepeatOne } from "react-icons/md";
import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import { getTime } from "../../funtions";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { actions } from "../../store";
import { useNavigate } from "react-router-dom";

function PlayerCenter({ data, songLoading, duration = 0, volume = 50, lyric }) {
  const {
    playing,
    randomSong,
    repeatSong,
    currentIndexSong,
    currentSong,
    songCurrentTime,
    indexValidSongs,
    currentAlbum,
    currentSinger,
  } = useSelector((state) => state);

  const baseInfoRepeatSong = () => {
    if (repeatSong === 1) {
      return { msg: "Tắt phát lại", active: true };
    } else if (repeatSong === 0) {
      return { msg: "Bật phát lại tất cả", active: false };
    } else {
      return { msg: "Bật phát lại một bài", active: true };
    }
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { title, artists = [] } = currentSong;
  const [songDuration, setSongDuration] = useState(duration);
  const [current, setCurrent] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [infoRepeat, setInfoRepeat] = useState(baseInfoRepeatSong());

  const audioRef = useRef(null);

  const handlePlaySong = () => {
    dispatch(actions.setPlaying(!playing));
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleSeekSong = (e) => {
    const newTime = (duration / 100) * +e.target.value;
    dispatch(actions.setSongCurrentTime(newTime));
    setCurrent(+e.target.value);
    audioRef.current.currentTime = newTime;
  };

  const handleRandomSong = () => {
    dispatch(actions.setRandomSong(!randomSong));
  };

  const handleRepeatSong = () => {
    if (repeatSong === 0) {
      dispatch(actions.setRepeatSong(2));
    } else if (repeatSong === 2) {
      dispatch(actions.setRepeatSong(1));
    } else dispatch(actions.setRepeatSong(0));
  };

  const handleBackSong = () => {
    const validIndex = indexValidSongs.findIndex(
      (item) => item === currentIndexSong
    );
    if (current > 5) {
      setCurrent(0);
      dispatch(actions.setSongCurrentTime(0));
    } else {
      if (validIndex !== 0) {
        dispatch(actions.playBackSong());
      }
    }
  };

  const handleNextSong = () => {
    dispatch(actions.playNextSong());
  };

  const handleToAlbum = (e) => {
    const arr = Array.from([...e.target.classList]);

    if (arr.includes(styles.playFeatures) || arr.includes(styles.wrap)) {
      if (currentAlbum) {
        navigate(`/Album/${currentAlbum}`);
      }
      if (currentSinger) {
        navigate(`/Singer/${currentSinger}`);
      }
    }
  };

  const eventUpdate = () => {
    const percent = Math.ceil((audioRef.current.currentTime / duration) * 100);
    const newCurrentTime = audioRef.current.currentTime;
    setCurrent(percent);
    dispatch(actions.setSongCurrentTime(newCurrentTime));
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", eventUpdate);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", eventUpdate);
      }
    };
  }, [current]);

  useEffect(() => {
    if (current === 0) {
      audioRef.current.currentTime = 0;
    }
  }, [current]);

  useEffect(() => {
    const realVolume = volume / 100;
    audioRef.current.volume = realVolume;
  }, [volume]);

  useEffect(() => {
    setTotalTime(getTime(duration));
    setSongDuration(duration);
  }, [duration]);

  const endEvent = () => {
    dispatch(actions.playNextSongAuto());
  };

  useEffect(() => {
    audioRef.current.addEventListener("ended", endEvent);
    return () => {
      audioRef.current.removeEventListener("ended", endEvent);
    };
  }, [currentTime]);

  useEffect(() => {
    if (playing && audioRef) {
      const playPromise = audioRef.current.play();
      if (!playPromise) {
        console.log(playPromise);
      }
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (repeatSong === 1) {
      setInfoRepeat({ msg: "Tắt phát lại", active: true });
    } else if (repeatSong === 0) {
      setInfoRepeat({ msg: "Bật phát lại tất cả", active: false });
    } else {
      setInfoRepeat({ msg: "Bật phát lại một bài", active: true });
    }
  }, [repeatSong]);

  useEffect(() => {
    setCurrentTime(getTime(songCurrentTime));
  }, [songCurrentTime]);

  const lyricClass = lyric ? styles.lyricClass : "";
  const mess = randomSong ? "Tắt phát lại ngẫu nhiên" : "Bật phát ngẫu nhiên";
  return (
    <div className={clsx(styles.wrap, lyricClass)} onClick={handleToAlbum}>
      <div className={styles.playFeatures}>
        <div className={styles.playBtn} onClick={handleRandomSong}>
          <ButtonIcon
            active={randomSong}
            popper={{
              show: true,
              msg: mess,
              position: "CenterUp",
            }}
            player={true}
          >
            <BiShuffle />
          </ButtonIcon>
        </div>

        <div className={styles.playBtn} onClick={handleBackSong}>
          <ButtonIcon noClick={currentIndexSong === 0 && current < 5}>
            <AiFillStepBackward />
          </ButtonIcon>
        </div>

        <div className={styles.playBtn} onClick={handlePlaySong}>
          {songLoading ? (
            <PlayingIcon loading={true} />
          ) : playing ? (
            <ButtonIcon circle={true}>
              <BsPauseCircle />
            </ButtonIcon>
          ) : (
            <ButtonIcon circle={true}>
              <BsPlayCircle />
            </ButtonIcon>
          )}
        </div>
        <div className={styles.playBtn} onClick={handleNextSong}>
          <ButtonIcon>
            <AiFillStepForward />
          </ButtonIcon>
        </div>
        <div className={styles.playBtn} onClick={handleRepeatSong}>
          <ButtonIcon
            active={infoRepeat.active}
            popper={{
              show: true,
              msg: `${infoRepeat.msg}`,
              position: "CenterUp",
            }}
            player={true}
          >
            {repeatSong === 1 ? <MdOutlineRepeatOne /> : <MdOutlineRepeat />}
          </ButtonIcon>
        </div>
      </div>
      <div className={styles.playProgress}>
        <span className={styles.playProgressCurrent}>{currentTime}</span>
        <input
          type="range"
          className={styles.playProgressInput}
          value={`${current}`}
          min={0}
          max={100}
          onChange={handleSeekSong}
        />
        <span className={styles.playProgressTime}>{totalTime}</span>
      </div>
      <div className={styles.name}>
        <p>
          {title} -{" "}
          {artists.map((artist, index) => {
            const { name } = artist;
            if (index === 0) return <span key={index}>{name}</span>;
            return <span key={index}>,{name}</span>;
          })}
        </p>
      </div>
      <audio src={data} autoPlay ref={audioRef}></audio>
    </div>
  );
}

export default memo(PlayerCenter);
