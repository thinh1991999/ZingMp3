import React from "react";
import styles from "./LoadingSquare.module.scss";

export default function LoadingSquare({ height, width, circle, margin }) {
  return (
    <div
      className={styles.container}
      style={{
        height: height ? height : "100%",
        width: width ? width : "100%",
        borderRadius: circle ? "50%" : "",
        margin: margin ? margin : "",
      }}
    ></div>
  );
}
