import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  BsPlayCircle,
  BsPlayFill,
  BsPauseFill,
  BsThreeDots,
} from "react-icons/bs";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import styles from "./AlbumLeft.module.scss";
import { getDate, getNumberText } from "../../../funtions";
import { actions } from "../../../store";
import PlayingIcon from "../../Components.Global/PlayingIcon/PlayingIcon";
import ButtonIcon from "../../Components.Global/ButtonIcon/ButtonIcon";
import PrimaryButton from "../../Components.Global/PrimaryButton/PrimaryButton";

function AlbumLeft({ data }) {
  const { playing, currentAlbum } = useSelector((state) => state.song);

  const dispatch = useDispatch();

  const { title, like, image, artists = [], update, albumId } = data;

  const newLike = getNumberText(like);

  const newUpdateDate = getDate(update);

  const handleAlbum = () => {
    if (albumId === currentAlbum) {
      dispatch(actions.setPlaying(!playing));
    } else {
      dispatch(actions.playAlbum());
    }
  };

  const handleShowComment = () => {
    dispatch(
      actions.setShowComment({
        show: true,
        id: albumId,
      })
    );
  };

  return (
    <div className={styles.albumLeft}>
      <div className={styles.albumLeftImgWrap} onClick={handleAlbum}>
        <div
          className={clsx(
            styles.albumLeftImg,
            albumId === currentAlbum
              ? playing
                ? styles.albumLeftImgActive
                : styles.albumLeftImgNotActive
              : null
          )}
        >
          <div className={styles.imgWrap}>
            <img src={image} alt="" />
          </div>
          <div className={styles.albumLeftImgLayer} />
          <div className={styles.albumLeftImgIcon}>
            <ButtonIcon circle={true} topic={true} size={40} fontSize={40}>
              <BsPlayCircle />
            </ButtonIcon>
          </div>
          <div className={styles.albumLeftImgWrapIcon}>
            <PlayingIcon circle={true} />
          </div>
        </div>
      </div>
      <div className={styles.albumLeftInfoWrap}>
        <div className={styles.albumLeftInfo}>
          <h3>{title}</h3>
          <p>Cập nhật: {newUpdateDate}</p>
          <p className={styles.artistsName}>
            {artists.map((artist, index) => {
              const { id, name, alias } = artist;
              if (index === artists.length - 1) {
                return (
                  <Link to={`/Singer/${alias}`} key={id}>
                    {name}
                  </Link>
                );
              }
              return (
                <Link to={`/Singer/${alias}`} key={id}>
                  {name} ,
                </Link>
              );
            })}
          </p>
          <p>{newLike} người yêu thích</p>
        </div>
        <div className={styles.albumLeftBtnPlay}>
          <div onClick={handleAlbum}>
            {playing && albumId === currentAlbum && (
              <PrimaryButton
                info={{
                  msg: "Tạm dừng",
                }}
              >
                <BsPauseFill />
              </PrimaryButton>
            )}
            {!playing && albumId === currentAlbum && (
              <PrimaryButton
                info={{
                  msg: "Tiếp tục phát",
                }}
              >
                <BsPlayFill />
              </PrimaryButton>
            )}
            {albumId !== currentAlbum && (
              <PrimaryButton
                info={{
                  msg: "Phát ngẫu nhiên",
                }}
              >
                <BsPlayFill />
              </PrimaryButton>
            )}
          </div>
        </div>
        <div className={styles.albumLeftBtnMore}>
          <button
            className={styles.btn}
            onClick={() => toast.error("Chức năng này chưa được hỗ trợ")}
          >
            <ButtonIcon
              fill={true}
              popper={{
                show: true,
                msg: "Thêm vào thư viện",
                position: "CenterUp",
              }}
            >
              <AiOutlineHeart />
            </ButtonIcon>
          </button>
          <button
            className={styles.btn}
            onClick={() => toast.error("Chức năng này chưa được hỗ trợ")}
          >
            <ButtonIcon
              fill={true}
              popper={{
                show: true,
                msg: "Xem thêm",
                position: "CenterUp",
              }}
            >
              <BsThreeDots />
            </ButtonIcon>
          </button>
          <button className={styles.btn} onClick={handleShowComment}>
            <ButtonIcon
              fill={true}
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
  );
}

export default AlbumLeft;
