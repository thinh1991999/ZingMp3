import React, { useRef } from "react";
import styles from "./Topic.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { PlayingIcon } from "..";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store";
import { toast } from "react-toastify";

function Topic({ data }) {
  const navigate = useNavigate();

  const { currentAlbum, playing } = useSelector((state) => state);

  const likeBtnRef = useRef(null);
  const commentRef = useRef(null);

  const dispatch = useDispatch();

  const { title, sub, image, id } = data;
  const topicActive = id === currentAlbum && playing ? styles.topicActive : "";

  const handlePlayAlbum = (e) => {
    if (
      likeBtnRef.current.contains(e.target) ||
      commentRef.current.contains(e.target)
    ) {
    } else {
      if (id === currentAlbum) {
        dispatch(actions.setPlaying(!playing));
      } else {
        navigate(`/Album/${id}`);
      }
    }
  };

  const handleShowComment = () => {
    dispatch(
      actions.setShowComment({
        show: true,
        id,
      })
    );
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
                <button
                  className={styles.playBtn}
                  ref={likeBtnRef}
                  onClick={() => toast.error("Chức năng này chưa được hỗ trợ")}
                >
                  <ButtonIcon
                    popper={{
                      show: true,
                      msg: "Thêm vào thư viện",
                      position: "CenterUp",
                    }}
                  >
                    <AiOutlineHeart />
                  </ButtonIcon>
                </button>
                <div className={styles.playBtnWrap}>
                  {id === currentAlbum && playing ? (
                    <PlayingIcon circle={true} topic={true} />
                  ) : (
                    <ButtonIcon circle={true} topic={true}>
                      <BsPlayCircle />
                    </ButtonIcon>
                  )}
                </div>

                <button
                  className={styles.playBtn}
                  ref={commentRef}
                  onClick={handleShowComment}
                >
                  <ButtonIcon
                    popper={{
                      show: true,
                      msg: "Bình luận",
                      position: "CenterUp",
                    }}
                  >
                    <AiOutlineComment />
                  </ButtonIcon>
                </button>
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
