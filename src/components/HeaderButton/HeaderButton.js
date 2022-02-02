import clsx from "clsx";
import React from "react";
import styles from "./HeaderButton.module.scss";

function HeaderButton({ children, disable = false, circle = false, white }) {
  const disableClass = disable ? styles.headerBtnDisable : "";
  const circleClass = circle ? styles.headerBtnCircle : "";
  const whiteClass = white ? styles.headerBtnWhite : "";

  return (
    <button
      className={clsx(styles.headerBtn, disableClass, circleClass, whiteClass)}
    >
      {children}
    </button>
  );
}

export default HeaderButton;
