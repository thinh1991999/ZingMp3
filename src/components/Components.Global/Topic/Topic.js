import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import clsx from "clsx";

import styles from "./Topic.module.scss";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import PlayingIcon from "../PlayingIcon/PlayingIcon";
import { actions } from "../../../store";

function Topic({ data, padding }) {
  const navigate = useNavigate();
  const { currentAlbum, playing } = useSelector((state) => state);

  const likeBtnRef = useRef(null);
  const commentRef = useRef(null);

  const dispatch = useDispatch();

  const { title, sortDescription, thumbnailM, encodeId } = data;
  const topicActive =
    encodeId === currentAlbum && playing ? styles.topicActive : "";

  const handlePlayAlbum = (e) => {
    if (
      likeBtnRef.current.contains(e.target) ||
      commentRef.current.contains(e.target)
    ) {
    } else {
      if (encodeId === currentAlbum) {
        dispatch(actions.setPlaying(!playing));
      } else {
        navigate(`/Album/${encodeId}`);
      }
    }
  };

  const handleShowComment = () => {
    dispatch(
      actions.setShowComment({
        show: true,
        encodeId,
      })
    );
  };

  return (
    <div
      className={clsx(styles.topic, topicActive)}
      style={{
        padding,
      }}
    >
      <div className={styles.topicWrap}>
        <div className={styles.topicImg}>
          <div className={styles.topicLink} onClick={handlePlayAlbum}>
            <img src={thumbnailM} alt="" />
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
                  {encodeId === currentAlbum && playing ? (
                    <PlayingIcon circle={true} topic={true} />
                  ) : (
                    <ButtonIcon
                      circle={true}
                      topic={true}
                      size={40}
                      fontSize={40}
                    >
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
          <Link to={`/Album/${encodeId}`}>{title}</Link>
          <p>{sortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default Topic;
