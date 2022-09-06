import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import clsx from "clsx";

import styles from "./SetTimeModal.module.scss";
import { actions } from "../../../store";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function SetTimeModal() {
  const dispatch = useDispatch();

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const containerRef = useRef(null);
  const wrapRef = useRef(null);

  const [hourList, setHourList] = useState([]);
  const [minuteList, setMinuteList] = useState([]);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hourActive, setHourActive] = useState(false);
  const [minuteActive, setMinuteActive] = useState(false);
  const [timeStop, setTimeStop] = useState("");

  const handleHourFocus = () => {
    setHourActive(true);
  };

  const handleMinuteFocus = () => {
    setMinuteActive(true);
  };

  const handleChangeHour = (e) => {
    var reg = new RegExp("^[0-9]$");
    if (
      reg.test(e.nativeEvent.data) &&
      e.nativeEvent.inputType === "insertText"
    ) {
      if (hour.length >= 2) {
        setHour(e.nativeEvent.data);
      } else {
        setHour(e.target.value);
      }
    }
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setHour(e.target.value);
    }
  };

  const handleChangeHourClick = (index) => {
    if (index < 10) {
      setHour(`0${index}`);
    } else {
      setHour(index);
    }
  };

  const handleChangeMinute = (e) => {
    var reg = new RegExp("^[0-9]$");
    if (
      reg.test(e.nativeEvent.data) &&
      e.nativeEvent.inputType === "insertText"
    ) {
      if (minute.length >= 2) {
        setMinute(e.nativeEvent.data);
      } else {
        setMinute(e.target.value);
      }
    }
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setMinute(e.target.value);
    }
  };

  const handleChangeMinuteClick = (index) => {
    if (index * 5 < 10) {
      setMinute(`0${index * 5}`);
    } else {
      setMinute(index * 5);
    }
  };

  const closeModal = () => {
    dispatch(actions.setShowTimeStop(false));
  };

  const saveTimeStop = () => {
    const timeDuration = hour * 1 * 60 * 60 + minute * 1 * 60;
    if (timeDuration > 0) {
      dispatch(actions.setTimeToStop(timeDuration));
      dispatch(actions.setShowTimeStop(false));
      dispatch(actions.setShowPlayLists(false));
      toast.success("Hẹn giờ dừng phát nhạt thành công");
    }
  };

  useEffect(() => {
    const eventClick = (e) => {
      let date = new Date(Date.now());
      if (e.target !== hourRef.current) {
        setHourActive(false);
        if (hour.length === 1) {
          setHour(`0${hour}`);
        }
        date.setHours(date.getHours() + hour * 1);
        setTimeStop(
          `${date.getHours()}:${minute} ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        );
      }
      if (e.target !== minuteRef.current) {
        setMinuteActive(false);
        if (minute.length === 1) {
          setMinute(`0${minute}`);
        }
        date.setMinutes(date.getMinutes() + minute * 1);
        setTimeStop(
          `${hour}:${date.getMinutes()} ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        );
      }
    };
    window.addEventListener("click", eventClick);
    return () => {
      window.removeEventListener("click", eventClick);
    };
  }, [hour, minute]);

  useEffect(() => {
    const hourArr = [];
    let time;
    const minuteArr = [];
    let minute = 0;
    let minuteText;
    for (let i = 0; i <= 12; i++) {
      if (i < 10) {
        time = `0${i} giờ`;
      } else {
        time = `${i} giờ`;
      }
      hourArr.push(time);
      if (minute < 10) {
        minuteText = `0${minute} phút`;
      } else {
        minuteText = `${minute} phút`;
      }
      minuteArr.push(minuteText);
      minute += 5;
    }
    minuteArr.pop();
    setHourList(hourArr);
    setMinuteList(minuteArr);
  }, []);

  useEffect(() => {
    if (minute * 1 >= 60) {
      setMinute("59");
    }
  }, [minute]);

  const eventClickCloseModal = (e) => {
    if (!wrapRef.current.contains(e.target)) {
      dispatch(actions.setShowTimeStop(false));
    }
  };

  useEffect(() => {
    containerRef.current.addEventListener("click", eventClickCloseModal);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("click", eventClickCloseModal);
      }
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.wrap} ref={wrapRef}>
        <div className={styles.body}>
          <h2>Hẹn giờ phát nhạc</h2>
          <form>
            <div className={styles.timeWrap}>
              <div
                className={clsx(
                  styles.timeBox,
                  hourActive && styles.timeBoxActive
                )}
              >
                <input
                  ref={hourRef}
                  type="text"
                  className={styles.hour}
                  value={hour}
                  onFocus={handleHourFocus}
                  onChange={handleChangeHour}
                />
                <span>giờ</span>
                <div className={styles.drop}>
                  <ul>
                    {hourList.map((item, index) => {
                      return (
                        <li
                          className={clsx(hour * 1 === index && styles.active)}
                          key={index}
                          onClick={() => handleChangeHourClick(index)}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className={styles.dot}>
                <p>:</p>
              </div>
              <div
                className={clsx(
                  styles.timeBox,
                  minuteActive && styles.timeBoxActive
                )}
              >
                <input
                  ref={minuteRef}
                  type="text"
                  className={styles.minute}
                  value={minute}
                  onFocus={handleMinuteFocus}
                  onChange={handleChangeMinute}
                />
                <span>phút</span>
                <div className={styles.drop}>
                  <ul>
                    {minuteList.map((item, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => handleChangeMinuteClick(index)}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </form>
          {hour * 1 === 0 && minute * 1 === 0 ? (
            <p>Chọn thời gian để dừng phát nhạc</p>
          ) : (
            <p>
              Dự tính dừng phát nhạc lúc : <span>{timeStop}</span>
            </p>
          )}
          <button
            className={hour * 1 === 0 && minute * 1 === 0 ? styles.disable : ""}
            onClick={saveTimeStop}
          >
            <PrimaryButton
              info={{
                msg: "Lưu lại",
              }}
            />
          </button>
          <button onClick={closeModal}>
            <span>Hủy</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetTimeModal;
