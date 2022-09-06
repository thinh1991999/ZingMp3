import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Popper.module.scss";
import { useSelector } from "react-redux";

function Popper() {
  const { top, left, right, width, height, position } = useSelector(
    (state) => state.root.popperInfo
  );
  const popperMess = useSelector((state) => state.root.popperMess);
  const [leftPosition, setLeftPosition] = useState(left);
  const [topPosition, setTopPosition] = useState(top);
  const [rightPosition, setRightPosition] = useState(right);
  const [className, setClassName] = useState(styles.popper);

  const wrapRef = useRef(null);

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
      case "CenterDownRight":
        const { width: wrapWidth } = wrapRef.current.getBoundingClientRect();
        setLeftPosition(`unset`);
        setTopPosition(`${top + height + 10}px`);
        setRightPosition(`${-wrapWidth + width * 2.3}px`);
        setClassName(clsx(styles.popper, styles.popperCenterDown));
        break;
      case "CenterUpRight": {
        const { width: wrapWidth } = wrapRef.current.getBoundingClientRect();
        setLeftPosition(`unset`);
        setTopPosition(`${top - height}px`);
        setRightPosition(`${-wrapWidth / 2 + width + width / 3}px`);
        setClassName(clsx(styles.popper));
        break;
      }
      default:
        break;
    }
  }, [position, top, left, right, width, height, popperMess]);
  return (
    <div
      className={className}
      style={{
        left: `${leftPosition}`,
        top: `${topPosition}`,
        right: `${rightPosition}`,
      }}
      ref={wrapRef}
    >
      <p>{popperMess}</p>
    </div>
  );
}

export default Popper;
