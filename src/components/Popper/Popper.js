import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./Popper.module.scss";
import { useSelector } from "react-redux";

function Popper() {
  const {
    popperInfo: { top, left, bottom, right, width, height, msg, position },
  } = useSelector((state) => state);

  const [leftPosition, setLeftPosition] = useState(left);
  const [topPosition, setTopPosition] = useState(top);
  const [rightPosition, setRightPosition] = useState(right);
  const [className, setClassName] = useState(styles.popper);

  useEffect(() => {
    switch (position) {
      case "CenterUp":
        setLeftPosition(`${left + width / 2}px`);
        setTopPosition(`${top - height}px`);
        setRightPosition("unset");
        setClassName(styles.popper);
        break;
      case "RightUp":
        setLeftPosition("unset");
        setTopPosition(`${top - height}px`);
        setRightPosition(`-${width / 1.5}px`);
        setClassName(clsx(styles.popper, styles.popperRightUp));
        break;
      case "CenterDown":
        setLeftPosition(`${left + width / 2}px`);
        setTopPosition(`${top + height + 10}px`);
        setRightPosition("unset");
        setClassName(clsx(styles.popper, styles.popperCenterDown));
        break;
      default:
        break;
    }
  }, [position, top, left, right, width, height]);
  return (
    <div
      className={className}
      style={{
        left: `${leftPosition}`,
        top: `${topPosition}`,
        right: `${rightPosition}`,
      }}
    >
      <p>{msg}</p>
    </div>
  );
}

export default Popper;
