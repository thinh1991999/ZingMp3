import React from "react";
import { useDispatch } from "react-redux";
import { ultils } from "../../../Share";
import { actions } from "../../../store";
import PrimaryButton from "../../Components.Global/PrimaryButton/PrimaryButton";
import styles from "./Event.module.scss";

function Event({ data }) {
  const dispatch = useDispatch();
  const {
    encodeId,
    coverH: image,
    followers,
    title,
    startTime,
    totalFollow,
    label,
  } = data;
  const handleOpenEvent = () => {
    dispatch(actions.setIDShowEvent(encodeId));
    dispatch(actions.setShowEvent(true));
  };

  const newTime = ultils.getFullDateTime(startTime);

  return (
    <div className={styles.event}>
      <div className={styles.eventWrap}>
        <div className={styles.eventLink} onClick={handleOpenEvent}>
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
        </div>
        <div className={styles.eventBtn}>
          <div className={styles.eventFollow}>
            <h4>Lượt quan tâm</h4>
            <div className={styles.eventFollowImg}>
              {followers.map((follower, index) => {
                const { id, avatar } = follower;

                return <img src={avatar} key={id} alt="" />;
              })}
              <span>+{`${totalFollow - followers.length}`}</span>
            </div>
          </div>
          <button>
            <PrimaryButton
              info={{
                msg: "quan tâm",
              }}
            ></PrimaryButton>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Event;
