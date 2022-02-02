import clsx from "clsx";
import React from "react";
import styles from "./PrimaryButton.module.scss";

function PrimaryButton({ children, info }) {
  const { msg, bgGray, mr = 0 } = info;

  const grayClass = bgGray ? styles.wrapGray : "";

  const finalClass = clsx(styles.wrap, grayClass);

  return (
    <button className={finalClass} style={{ marginRight: `${mr}px` }}>
      {children}
      <span>{msg}</span>
    </button>
  );
}

export default PrimaryButton;
