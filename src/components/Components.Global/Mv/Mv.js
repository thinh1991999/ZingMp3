import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { BsPlayCircle } from "react-icons/bs";

import styles from "./Mv.module.scss";

import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { actions } from "../../../store";
import { ultils } from "../../../Share";

function Mv({ data }) {
  const dispatch = useDispatch();

  const { idShow, showSmallScreen } = useSelector((state) => state.mv);

  const {
    thumbnailM: image,
    encodeId,
    title,
    duration,
    artist = {},
    artists = [],
  } = data;
  const { thumbnail: artistImage, alias: artistAlias, name } = artist;

  const openMv = () => {
    if (idShow === encodeId && showSmallScreen) {
      dispatch(actions.setShowSmallScreen(!showSmallScreen));
    } else {
      dispatch(actions.setIdMvModal(encodeId));
      dispatch(actions.setShowMvModal(true));
    }
  };

  return (
    <div
      className={clsx(styles.mv, idShow === encodeId ? styles.mvActive : null)}
      onClick={openMv}
    >
      <div className={styles.mvWrap}>
        <div className={styles.mvImg}>
          <img src={image} alt={title} />
          <div className={styles.mvLayer} />

          <div className={styles.mvTime}>
            <span>{ultils.getTime(duration)}</span>
          </div>
          <div className={styles.btn}>
            {idShow === encodeId ? (
              <span>Đang phát</span>
            ) : (
              <ButtonIcon circle={true} topic={true}>
                <BsPlayCircle />
              </ButtonIcon>
            )}
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
