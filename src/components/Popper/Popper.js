import clsx from "clsx";
import React from "react";
import styles from "./Popper.module.scss";

function Popper({ properties }) {
  const { msg, popperDisplay, position } = properties;
  let className = styles.popper;
  switch (position) {
    case "CenterUp":
      className = styles.popper;
      break;
    case "RightUp":
      className = clsx(styles.popper, styles.popperRightUp);
      break;
    case "CenterDown":
      className = clsx(styles.popper, styles.popperCenterDown);

    default:
      break;
  }
  return (
    <div
      className={className}
      style={{
        width: `${msg.length * 8}px`,
        display: `${popperDisplay ? "block" : "none"}`,
      }}
    >
      <p>{msg}</p>
    </div>
  );
}

export default Popper;
