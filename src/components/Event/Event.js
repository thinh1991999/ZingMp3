import React from "react";
import styles from "./Event.module.scss";
import { PrimaryButton } from "..";
import { getFullDateTime } from "../../funtions";

function Event({ data }) {
  const {
    coverH: image,
    followers,
    title,
    startTime,
    totalFollow,
    label,
  } = data;

  const newTime = getFullDateTime(startTime);

  return (
    <div className={styles.event}>
      <div className={styles.eventWrap}>
        <a className={styles.eventLink}>
          <div className={styles.eventImg}>
            <img src={image} alt={title} />
            <div className={styles.eventInfo}>
              <div className={styles.eventHint}>
                <span>{label}</span>
              </div>
              <h3>{title}</h3>
              <p>{newTime}</p>
            </div>
          </div>
        </a>
        <div className={styles.eventBtn}>
          <div className={styles.eventFollow}>
            <h4>Lượt quan tâm</h4>
            <div className={styles.eventFollowImg}>
              {followers.map((follower, index) => {
                const { id, avatar } = follower;

                return <img src={avatar} key={id} />;
              })}
              <span>+{`${totalFollow - followers.length}`}</span>
            </div>
          </div>
          <PrimaryButton
            info={{
              msg: "quan tâm",
              mr: 10,
            }}
          ></PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default Event;
