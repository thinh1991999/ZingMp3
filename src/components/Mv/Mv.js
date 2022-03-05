import React from "react";
import styles from "./Mv.module.scss";
import { ButtonIcon } from "..";
import { BsPlayCircle } from "react-icons/bs";
import { getTime } from "../../funtions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Mv({ data }) {
  const {
    thumbnailM: image,
    title,
    duration,
    artist = {},
    artists = [],
  } = data;
  const { thumbnail: artistImage, alias: artistAlias, name } = artist;

  const newDuraton = getTime(duration);

  const openMv = () => {
    toast.error("Mv chưa được hỗ trợ!");
  };

  return (
    <div className={styles.mv} onClick={openMv}>
      <div className={styles.mvWrap}>
        <div className={styles.mvImg}>
          <img src={image} alt={title} />
          <div className={styles.mvLayer} />

          <div className={styles.mvTime}>
            <span>{newDuraton}</span>
          </div>
          <div className={styles.btn}>
            <ButtonIcon circle={true} topic={true}>
              <BsPlayCircle />
            </ButtonIcon>
          </div>
        </div>
        <div className={styles.mvInfo}>
          <div className={styles.mvInfoLeft}>
            <Link to={`/Singer/${artistAlias}`}>
              {artistImage && <img src={artistImage} alt={name} />}
            </Link>
          </div>
          <div className={styles.mvInfoRight}>
            <a className={styles.mvInfoTitle}>{title}</a>
            <p className={styles.mvInfoSingers}>
              {artists.map((item, index) => {
                const { name, alias } = item;
                if (index === 0) {
                  return (
                    <Link to={`/Singer/${alias}`} key={index}>
                      {name}
                    </Link>
                  );
                }
                return (
                  <Link to={`/Singer/${alias}`} key={index}>
                    ,{name}
                  </Link>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mv;
