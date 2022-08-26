import React from "react";
import styles from "./HomeTitle.module.scss";

function HomeTitle({ msg = " " }) {
  return <h2 className={styles.title}>{msg}</h2>;
}

export default HomeTitle;
