import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import ButtonIcon from "../../Components.Global/ButtonIcon/ButtonIcon";
import styles from "./Choice.module.scss";

function Choice({ data }) {
  const {
    encodeId,
    artistsNames: name,
    title,
    thumbnailM: image,
    song: { items },
  } = data;
  return (
    <div className={styles.container}>
      <Link to={`/Album/${encodeId}`} className={styles.choice}>
        <div className={styles.choiceWrap}>
          <img src={image} alt={title} />
          <div className={styles.choiceLayer} />
          <div className={styles.choiceBtn}>
            <ButtonIcon circle={true} topic={true} size={40} fontSize={40}>
              <BsPlayCircle />
            </ButtonIcon>
          </div>
          <div className={styles.choiceContent}>
            <p>{title}</p>
            <h4>{name}</h4>
            <div className={styles.choiceSong}>
              {items.map((item, index) => {
                const { title, thumbnail } = item;
                return (
                  <div className={styles.choiceOuter} key={index}>
                    <img src={thumbnail} alt={title} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Choice;
