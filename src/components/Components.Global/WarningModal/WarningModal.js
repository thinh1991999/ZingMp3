import React, { useEffect, useState, useRef } from "react";
import styles from "./WarningModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../store";

function WarningModal() {
  const { warningModal } = useSelector((state) => state.root);

  const dispatch = useDispatch();

  const containerRef = useRef(null);
  const wrapRef = useRef(null);

  const [header, setHeader] = useState("");
  const [mess, setMess] = useState("");

  const handleClose = () => {
    dispatch(
      actions.setWarningModal({
        show: false,
        type: "",
      })
    );
  };

  const handleAccept = () => {
    dispatch(actions.setTimeToStop(0));
    dispatch(
      actions.setWarningModal({
        show: false,
        type: "",
      })
    );
  };

  useEffect(() => {
    if (warningModal.type === "TIME") {
      setHeader("Xóa Hẹn Giờ");
      setMess("Bạn có chắc chắn muốn xóa hẹn giờ?");
    }
  }, [warningModal]);

  const eventClickCloseModal = (e) => {
    if (!wrapRef.current.contains(e.target)) {
      dispatch(
        actions.setWarningModal({
          show: false,
          type: "",
        })
      );
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
        <h2>{header}</h2>
        <p>{mess}</p>
        <div className={styles.btnWrap}>
          <button onClick={handleClose}>không</button>
          <button onClick={handleAccept}>có</button>
        </div>
      </div>
    </div>
  );
}

export default WarningModal;
