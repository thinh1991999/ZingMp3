import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { BsPlayCircle } from "react-icons/bs";

import styles from "./Mv.module.scss";

import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { actions } from "../../../store";
import { ultils } from "../../../Share";
import { toast } from "react-toastify";

function Mv({ data }) {
  const dispatch = useDispatch();

  const { idShow, showSmallScreen } = useSelector((state) => state.mv);

  const {
    thumbnailM: image,
    encodeId,
    title,
    duration,
    streamingStatus,
    artist = {},
    artists = [],
  } = data;
  const { thumbnail: artistImage, alias: artistAlias, name } = artist;
  const openMv = () => {
    if (streamingStatus === 2) {
      toast.error("Mv này chưa được hỗ trợ");
      return;
    }
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
    >
      <div className={styles.mvWrap}>
        <div className={styles.mvImg} onClick={openMv}>
          <img src={image} alt={title} />
          <div className={styles.mvLayer} />
          <div className={styles.mvTime}>
            <span>{ultils.getTime(duration)}</span>
          </div>
          <div className={styles.btn}>
            {idShow === encodeId ? (
              <span>Đang phát</span>
            ) : (
              <button>
                <ButtonIcon circle={true} topic={true} size={40} fontSize={40}>
                  <BsPlayCircle />
                </ButtonIcon>
              </button>
            )}
          </div>
          {streamingStatus === 2 && <div className={styles.vip}></div>}
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
                    <Link
                      to={`/Singer/${alias}`}
                      key={index}
                      className="text-link"
                    >
                      {name}
                    </Link>
                  );
                }
                return (
                  <Link
                    to={`/Singer/${alias}`}
                    key={index}
                    className="text-link"
                  >
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
