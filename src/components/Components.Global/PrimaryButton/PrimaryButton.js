import clsx from "clsx";
import React from "react";
import styles from "./PrimaryButton.module.scss";

function PrimaryButton({ children, info }) {
  const { msg, bgGray, mr = 0, chart, border } = info;

  const grayClass = bgGray ? styles.wrapGray : "";

  const finalClass = clsx(
    styles.wrap,
    grayClass,
    chart && styles.wrapChart,
    border && styles.wrapBorder
  );

  return (
    <div className={finalClass} style={{ marginRight: `${mr}px` }}>
      {children}
      <span>{msg}</span>
    </div>
  );
}

export default PrimaryButton;
