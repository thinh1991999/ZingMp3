import React, { useEffect } from "react";
import styles from "./Warning.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import clsx from "clsx";
import { MdOutlineClose } from "react-icons/md";

function Warning({ msg }) {
  const {
    warning: { show },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const closeWaring = () => {
    dispatch(actions.setWarning({ show: false, msg: "" }));
  };

  useEffect(() => {
    const clearWarning = setTimeout(() => {
      dispatch(actions.setWarning({ show: false, msg: "" }));
    }, 5000);
    return () => {
      clearTimeout(clearWarning);
    };
  }, [show, dispatch]);

  return (
    <div className={clsx(styles.content, show && styles.contentActive)}>
      <div className={styles.wrap}>
        <h3>{msg}</h3>
        <button onClick={closeWaring}>
          <MdOutlineClose />
        </button>
      </div>
    </div>
  );
}

export default Warning;
