import React, { useEffect, useRef, useState } from "react";
import styles from "./Playlists.module.scss";
import { GiAlarmClock } from "react-icons/gi";
import { BsThreeDots } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { ButtonIcon, AlbumItem } from "..";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { actions } from "../../store";

function Playlists() {
  const { listSong, randomSong, idCurrentSong, showPlayLists, timeToStop } =
    useSelector((state) => state);
  const [listCurrent, setListCurrent] = useState([]);
  const [listNext, setListNext] = useState([]);
  const [options, setOptions] = useState([
    {
      msg: "Xóa danh sách phát",
      icon: <IoTrashOutline />,
    },
  ]);
  const [showOption, setShowOption] = useState(false);
  const [mess, setMess] = useState("");

  const location = useLocation();

  const playListRef = useRef(null);

  const dispatch = useDispatch();

  const handleShowOption = () => {
    setShowOption(!showOption);
  };

  const handleRunOption = (index) => {
    switch (index) {
      case 0:
        dispatch(actions.clearPlayList());
        break;
      default:
        break;
    }
  };

  const handleShowTimeStop = () => {
    if (timeToStop > 0) {
      dispatch(
        actions.setWarningModal({
          show: true,
          type: "TIME",
        })
      );
    } else {
      dispatch(actions.setShowTimeStop(true));
    }
  };

  useEffect(() => {
    if (randomSong) {
      const currentSong = listSong.filter((item) => {
        const { encodeId } = item;
        return encodeId === idCurrentSong;
      })[0];
      setListCurrent([currentSong]);
      const newListNext = listSong.filter((item) => {
        const { encodeId } = item;
        return encodeId !== idCurrentSong;
      });
      setListNext(newListNext);
    } else {
      const newArrCurrent = [];
      const newArrNext = [];
      const currentIndex = listSong.findIndex((item) => {
        const { encodeId } = item;
        return encodeId === idCurrentSong;
      });

      listSong.forEach((item, index) => {
        if (index <= currentIndex) {
          newArrCurrent.push(item);
        } else {
          newArrNext.push(item);
        }
      });
      setListCurrent(newArrCurrent);
      setListNext(newArrNext);
    }
  }, [listSong, randomSong, idCurrentSong]);

  useEffect(() => {
    dispatch(actions.setShowPlayLists(false));
  }, [location]);

  const eventClick = (e) => {
    if (!playListRef.current.contains(e.target)) {
      dispatch(actions.setShowPlayLists(false));
    }
  };

  useEffect(() => {
    const app_container = document.querySelector(".app__container");
    app_container.addEventListener("click", eventClick);
    return () => {
      app_container.removeEventListener("click", eventClick);
    };
  }, []);

  useEffect(() => {
    if (timeToStop > 0) {
      setMess("Xóa hẹn giờ");
    } else {
      setMess("Hẹn giờ phát nhạc");
    }
  }, [timeToStop]);

  return (
    <div
      ref={playListRef}
      className={clsx(styles.playlist, showPlayLists && styles.playlistShow)}
    >
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <h2>Danh sách phát</h2>
            <button
              onClick={handleShowTimeStop}
              className={clsx(styles.btn, timeToStop > 0 ? styles.active : "")}
            >
              <ButtonIcon
                fill={true}
                popper={{
                  show: true,
                  msg: mess,
                  position: "CenterDownRight",
                }}
                player={true}
              >
                <GiAlarmClock />
              </ButtonIcon>
            </button>
            <button className={styles.btn} onClick={handleShowOption}>
              <ButtonIcon
                fill={true}
                popper={{
                  show: true,
                  msg: "Khác",
                  position: "CenterDown",
                }}
              >
                <BsThreeDots />
              </ButtonIcon>
              {showOption && (
                <div className={styles.options}>
                  <ul>
                    {options.map((option, index) => {
                      const { msg, icon } = option;
                      return (
                        <li key={index} onClick={() => handleRunOption(index)}>
                          {icon} {msg}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </button>
          </div>
          <div className={styles.body}>
            <div className={styles.past}>
              {listCurrent.map((item, index) => {
                const { encodeId, streamingStatus, isWorldWide } = item;
                if (encodeId !== idCurrentSong) {
                  return (
                    <AlbumItem
                      key={encodeId}
                      status={streamingStatus}
                      worldWide={isWorldWide}
                      data={item}
                      index={index}
                      playLists={true}
                      blur={true}
                      albumSong={true}
                    />
                  );
                }

                return (
                  <AlbumItem
                    key={encodeId}
                    status={streamingStatus}
                    worldWide={isWorldWide}
                    data={item}
                    index={index}
                    playLists={true}
                    albumSong={true}
                  />
                );
              })}
            </div>
            <div className={styles.next}>
              <h3>Tiếp theo</h3>
              <span></span>
              {listNext.map((item, index) => {
                const { encodeId, streamingStatus, isWorldWide } = item;
                return (
                  <AlbumItem
                    key={encodeId}
                    status={streamingStatus}
                    worldWide={isWorldWide}
                    data={item}
                    index={index}
                    playLists={true}
                    albumSong={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playlists;
