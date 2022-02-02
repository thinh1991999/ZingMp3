import React from "react";
import styles from "./Singer.module.scss";

function Singer({ data }) {
  const { thumbnail: image, name } = data;
  return (
    <div className={styles.singer}>
      <div className={styles.singerWrap}>
        <div className={styles.singerImg}>
          <img src={image} alt={name} />
        </div>
      </div>
    </div>
  );
}

export default Singer;
