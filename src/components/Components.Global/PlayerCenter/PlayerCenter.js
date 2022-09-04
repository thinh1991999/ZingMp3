import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BiShuffle } from "react-icons/bi";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { MdOutlineRepeat, MdOutlineRepeatOne } from "react-icons/md";
import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import styles from "./PlayerCenter.module.scss";
import { actions } from "../../../store";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import PlayingIcon from "../PlayingIcon/PlayingIcon";
import { ultils } from "../../../Share";

function PlayerCenter({ volume = 50 }) {
  const {
    playing,
    randomSong,
    repeatSong,
    currentSong,
    songCurrentTime,
    songLoading,
    song,
    listSong,
    currentAlbum,
    currentSinger,
  } = useSelector((state) => state.song);

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
  const [current, setCurrent] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [infoRepeat, setInfoRepeat] = useState(baseInfoRepeatSong());

  const audioRef = useRef(null);

  const currentIdxSong = useMemo(() => {
    const idx = listSong.findIndex((item) => {
      return item.encodeId === currentSong.encodeId;
    });
    return idx;
  }, [currentSong, listSong]);

  const handlePlaySong = () => {
    dispatch(actions.setPlaying(!playing));
  };

  const handleSeekSong = useCallback(
    (e) => {
      const newTime = (currentSong?.duration / 100) * +e.target.value;
      dispatch(actions.setSongCurrentTime(newTime));
      setCurrent(+e.target.value);
      audioRef.current.currentTime = newTime;
    },
    [currentSong, dispatch]
  );

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

  const handlePause = useCallback(() => {
    dispatch(actions.setSongCurrentTime(currentTime));
  }, [currentTime, dispatch]);

  const handleBackSong = () => {
    setTimeout(() => {
      if (current > 5) {
        setCurrent(0);
        dispatch(actions.setSongCurrentTime(0));
      } else {
        if (currentIdxSong > 0) {
          dispatch(actions.playBackSong());
        }
      }
    }, 100);
  };

  const handleNextSong = () => {
    setTimeout(() => {
      dispatch(actions.playNextSong());
    }, 100);
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
    const percent = Math.ceil(
      (audioRef.current.currentTime / currentSong?.duration) * 100
    );
    const newCurrentTime = audioRef.current.currentTime;
    setCurrent(percent);
    setCurrentTime(newCurrentTime);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, currentSong, dispatch]);

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
    setTotalTime(ultils.getTime(currentSong?.duration));
  }, [currentSong]);

  useEffect(() => {
    const endEvent = () => {
      setTimeout(() => {
        dispatch(actions.playNextSongAuto());
      }, 100);
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", endEvent);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", endEvent);
      }
    };
  }, [currentTime, dispatch]);

  useEffect(() => {
    if (audioRef && song) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, song]);
  useEffect(() => {
    if (repeatSong === 1) {
      setInfoRepeat({ msg: "Tắt phát lại", active: true });
      dispatch(actions.setPopperMess("Tắt phát lại"));
    } else if (repeatSong === 0) {
      setInfoRepeat({ msg: "Bật phát lại tất cả", active: false });
      dispatch(actions.setPopperMess("Bật phát lại tất cả"));
    } else {
      setInfoRepeat({ msg: "Bật phát lại một bài", active: true });
      dispatch(actions.setPopperMess("Bật phát lại một bài"));
    }
  }, [repeatSong, dispatch]);

  useEffect(() => {
    setCurrentTime(songCurrentTime);
    audioRef.current.currentTime = songCurrentTime;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={clsx(styles.wrap)} onClick={handleToAlbum}>
      <div className={styles.playFeatures}>
        <div className={styles.playBtn} onClick={handleRandomSong}>
          <ButtonIcon
            active={randomSong}
            popper={{
              show: true,
              msg: randomSong
                ? "Tắt phát lại ngẫu nhiên"
                : "Bật phát ngẫu nhiên",
              position: "CenterUp",
            }}
            player={true}
          >
            <BiShuffle />
          </ButtonIcon>
        </div>

        <div className={styles.playBtn} onClick={handleBackSong}>
          <ButtonIcon noClick={currentIdxSong === 0 && current < 5}>
            <AiFillStepBackward />
          </ButtonIcon>
        </div>

        <div className={styles.playBtn} onClick={handlePlaySong}>
          {songLoading ? (
            <PlayingIcon loading={true} />
          ) : playing ? (
            <ButtonIcon circle={true} size={40} fontSize={40}>
              <BsPauseCircle />
            </ButtonIcon>
          ) : (
            <ButtonIcon circle={true} size={40} fontSize={40}>
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
        <span className={styles.playProgressCurrent}>
          {ultils.getTime(currentTime)}
        </span>
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
      <audio
        src={song}
        autoPlay={false}
        ref={audioRef}
        onPause={handlePause}
      ></audio>
    </div>
  );
}

export default memo(PlayerCenter);
