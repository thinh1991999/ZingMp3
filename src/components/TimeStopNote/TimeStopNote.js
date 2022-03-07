import React, { useEffect, useState } from "react";
import styles from "./TimeStopNote.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { getTimeTextFull } from "../../funtions";
import { actions } from "../../store";

function TimeStopNote() {
  const { timeToStop } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [timeShow, setTimeShow] = useState(getTimeTextFull(timeToStop));

  const handleOpenWarning = () => {
    console.log("abc");
    dispatch(
      actions.setWarningModal({
        show: true,
        type: "TIME",
      })
    );
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      let newTime = timeToStop - 1;
      dispatch(actions.setTimeToStop(newTime));
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [timeToStop]);

  useEffect(() => {
    setTimeShow(getTimeTextFull(timeToStop));
  }, [timeToStop]);

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <p>
          Nhạc sẽ dừng sau: <span>{timeShow}</span>
        </p>
        <button onClick={handleOpenWarning}>
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
}

export default TimeStopNote;
