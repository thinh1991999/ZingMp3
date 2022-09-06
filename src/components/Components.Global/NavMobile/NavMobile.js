import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../store";
import Nav from "../Nav/Nav";

import styles from "./NavMobile.module.scss";

export default function NavMobile() {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div
          className={styles.layer}
          onClick={() => dispatch(actions.setShowNavMobile(false))}
        ></div>
        <div className={styles.content}>
          <Nav />
        </div>
      </div>
    </div>
  );
}
