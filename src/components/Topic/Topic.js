import React from "react";
import styles from "./Topic.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { PlayingIcon } from "..";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { AiOutlineHeart } from "react-icons/ai";
import { BsPlayCircle, BsThreeDots } from "react-icons/bs";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store";

function Topic({ data }) {
  const navigate = useNavigate();

  const { currentAlbum, playing } = useSelector((state) => state);

  const dispatch = useDispatch();

  const { title, sub, image, id } = data;
  const topicActive = id === currentAlbum && playing ? styles.topicActive : "";

  const handlePlayAlbum = () => {
    if (id === currentAlbum) {
      dispatch(actions.setPlaying(!playing));
    } else {
      navigate(`/Album/${id}`);
    }
  };

  return (
    <div className={clsx(styles.topic, topicActive)}>
      <div className={styles.topicWrap}>
        <div className={styles.topicImg}>
          <div className={styles.topicLink} onClick={handlePlayAlbum}>
            <img src={image} alt="" />
            <div className={styles.topicLayer}></div>
            <div className={styles.topicBtn}>
              <div className={styles.topicBtnWrap}>
                <div className={styles.playBtn}>
                  <ButtonIcon
                    popper={{
                      show: true,
                      msg: "Thêm vào thư viện",
                    }}
                  >
                    <AiOutlineHeart />
                  </ButtonIcon>
                </div>
                <div className={styles.playBtnWrap}>
                  {id === currentAlbum && playing ? (
                    <PlayingIcon circle={true} topic={true} />
                  ) : (
                    <ButtonIcon circle={true} topic={true}>
                      <BsPlayCircle />
                    </ButtonIcon>
                  )}
                </div>

                <div className={styles.playBtn}>
                  <ButtonIcon
                    popper={{
                      show: true,
                      msg: "Khác",
                    }}
                  >
                    <BsThreeDots />
                  </ButtonIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.topicInfo}>
          <Link to={`/Album/${id}`}>{title}</Link>
          <p>{sub}</p>
        </div>
      </div>
    </div>
  );
}

export default Topic;
