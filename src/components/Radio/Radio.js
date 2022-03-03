import React from "react";
import styles from "./Radio.module.scss";
import { ButtonIcon } from "..";
import { BsPlayCircle } from "react-icons/bs";

function Radio({ data }) {
  const {
    activeUsers,
    host: { name, thumbnail: hostImage },
    program,
  } = data;
  let programImage = "";
  if (program) {
    programImage = program.thumbnail;
  }

  return (
    <div className={styles.radio}>
      <div className={styles.radioWrap}>
        <div className={styles.radioImg}>
          <img src={programImage} alt="" />
          <div className={styles.imgLayer}></div>
          <div className={styles.imgBtn}>
            <ButtonIcon circle={true} topic={true}>
              <BsPlayCircle />
            </ButtonIcon>
          </div>
        </div>
        <div className={styles.radioLive}>
          <img
            src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/icons/live-tag.svg"
            alt=""
          />
        </div>
        <div className={styles.radioHost}>
          <img src={hostImage} alt="" />
        </div>
      </div>
      <div className={styles.radioInfo}>
        <h3>{name}</h3>
        <span>{activeUsers} đang nghe</span>
      </div>
    </div>
  );
}

export default Radio;
