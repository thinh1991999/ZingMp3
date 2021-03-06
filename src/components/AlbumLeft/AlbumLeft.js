import React, { useState } from "react";
import styles from "./AlbumLeft.module.scss";
import { ButtonIcon, PlayingIcon, PrimaryButton } from "../../components";
import { getDate, getNumberText } from "../../funtions";
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
import { actions } from "../../store";
import { toast } from "react-toastify";

function AlbumLeft({ data }) {
  // const [playing, setPlaying] = useState(false);

  const currentAlbum = useSelector((state) => state.currentAlbum);
  const playing = useSelector((state) => state.playing);
  const album = useSelector((state) => state.album);

  const dispatch = useDispatch();

  const {
    title,
    like,
    image,
    artists = [],
    update,
    albumId,
    song: { items },
  } = data;

  const newLike = getNumberText(like);

  const newUpdateDate = getDate(update);

  const handleAlbum = () => {
    if (album.encodeId === currentAlbum) {
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

  // styles.albumLeftImgActive
  const activeClass =
    albumId === currentAlbum && playing ? styles.albumLeftImgActive : "";
  const classAbum = clsx(styles.albumLeftImg, activeClass);

  return (
    <div className={styles.albumLeft}>
      <div className={styles.albumLeftImgWrap} onClick={handleAlbum}>
        <div className={classAbum}>
          <div className={styles.imgWrap}>
            <img src={image} alt="" />
          </div>
          <div className={styles.albumLeftImgLayer} />
          <div className={styles.albumLeftImgIcon}>
            <ButtonIcon circle={true} topic={true}>
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
          <p>C???p nh???t: {newUpdateDate}</p>
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
          <p>{newLike} ng?????i y??u th??ch</p>
        </div>
        <div className={styles.albumLeftBtnPlay}>
          <div onClick={handleAlbum}>
            {playing && albumId === currentAlbum ? (
              <PrimaryButton
                info={{
                  msg: "T???m d???ng",
                }}
              >
                <BsPauseFill />
              </PrimaryButton>
            ) : (
              <PrimaryButton
                info={{
                  msg: "Ti???p t???c ph??t",
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
            onClick={() => toast.error("Ch???c n??ng n??y ch??a ???????c h??? tr???")}
          >
            <ButtonIcon
              fill={true}
              popper={{
                show: true,
                msg: "Th??m v??o th?? vi???n",
                position: "CenterUp",
              }}
            >
              <AiOutlineHeart />
            </ButtonIcon>
          </button>
          <button
            className={styles.btn}
            onClick={() => toast.error("Ch???c n??ng n??y ch??a ???????c h??? tr???")}
          >
            <ButtonIcon
              fill={true}
              popper={{
                show: true,
                msg: "Xem th??m",
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
                msg: "B??nh lu???n",
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
