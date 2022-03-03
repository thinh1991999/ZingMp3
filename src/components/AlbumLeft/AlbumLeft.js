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
import { AiOutlineHeart } from "react-icons/ai";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store";

function AlbumLeft({ data }) {
  // const [playing, setPlaying] = useState(false);

  const currentAlbum = useSelector((state) => state.currentAlbum);
  const playing = useSelector((state) => state.playing);
  const album = useSelector((state) => state.album);

  const dispatch = useDispatch();

  // const {
  //   setCurrentSong,
  //   setCurrentAlbum,
  //   currentAlbum,
  //   playing,
  //   setPlaying,
  //   setListSong,
  //   setCurrentIndexSong,
  //   getSong,
  // } = useGlobalAppContext();

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
            {playing && albumId === currentAlbum ? (
              <PrimaryButton
                info={{
                  msg: "Tạm dừng",
                }}
              >
                <BsPauseFill />
              </PrimaryButton>
            ) : (
              <PrimaryButton
                info={{
                  msg: "Tiếp tục phát",
                }}
              >
                <BsPlayFill />
              </PrimaryButton>
            )}
          </div>
        </div>
        <div className={styles.albumLeftBtnMore}>
          <div className={styles.btn}>
            <ButtonIcon
              fill={true}
              popper={{
                show: true,
                msg: "Thêm vào thư viện",
              }}
            >
              <AiOutlineHeart />
            </ButtonIcon>
          </div>
          <div className={styles.btn}>
            <ButtonIcon
              fill={true}
              popper={{
                show: true,
                msg: "Xem thêm",
              }}
            >
              <BsThreeDots />
            </ButtonIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumLeft;
