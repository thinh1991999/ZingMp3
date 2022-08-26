import React from "react";
import styles from "./SearchNoInfo.module.scss";

function SearchNoInfo({ children, msg }) {
  return (
    <div className={styles.content}>
      {children}
      <h3>{msg}</h3>
    </div>
  );
}

export default SearchNoInfo;
