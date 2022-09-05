import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { actions } from "../../../../store";
import ButtonIcon from "../../ButtonIcon/ButtonIcon";
import styles from "./PlayerMV.module.scss";

export default function PlayerMV({ info, thumbnailMv, handleEndPlayer }) {
  const dispatch = useDispatch();

  const showSmallScreen = useSelector((state) => state.mv.showSmallScreen);

  const [src, setSrc] = useState([{ quality: "", url: "" }]);
  const [layerShow, setLayerShow] = useState(false);

  const handleEnd = () => {
    handleEndPlayer();
  };

  const handleCloseModal = () => {
    dispatch(actions.setIdMvModal(null));
    dispatch(actions.setShowMvModal(false));
    dispatch(actions.setShowSmallScreen(false));
  };

  const handleSizeModal = () => {
    dispatch(actions.setShowSmallScreen(!showSmallScreen));
  };

  useEffect(() => {
    if (info) {
      const { mp4 } = info;
      if (mp4) {
        const keys = Object.keys(mp4);
        const newSrc = [];
        keys.forEach((key) => {
          newSrc.push({
            quality: key,
            url: mp4[key],
          });
        });
        setSrc(newSrc);
      }
    }
  }, [info]);

  useEffect(() => {
    const overEvent = () => {
      setLayerShow(true);
    };
    const outEvent = () => {
      setLayerShow(false);
    };
    if (showSmallScreen) {
      const tuby = document.querySelector(".tuby");
      tuby.addEventListener("mouseover", overEvent);
      tuby.addEventListener("mouseout", outEvent);
      return () => {
        tuby.removeEventListener("mouseover", overEvent);
        tuby.removeEventListener("mouseout", outEvent);
      };
    }
  }, [showSmallScreen]);

  return (
    <Player
      src={src}
      poster={thumbnailMv}
      dimensions={{ width: "100%", height: "100%" }}
    >
      {(ref, props) => (
        <>
          <video
            ref={ref}
            {...props}
            onEnded={handleEnd}
            style={{ backgroundColor: "black" }}
            className={styles.video}
          />

          {showSmallScreen && (
            <>
              <div
                className={clsx(
                  styles.layer,
                  layerShow ? styles.layerShow : null
                )}
              ></div>
              <div className={styles.smallBtnWrap}>
                <button onClick={handleSizeModal}>
                  <ButtonIcon
                    fill={true}
                    size={24}
                    popper={{
                      show: true,
                      msg: showSmallScreen ? "Mở rộng" : "Thu nhỏ",
                      position: "CenterUp",
                    }}
                  >
                    {showSmallScreen ? (
                      <AiOutlineFullscreen />
                    ) : (
                      <AiOutlineFullscreenExit />
                    )}
                  </ButtonIcon>
                </button>
                <button onClick={handleCloseModal}>
                  <ButtonIcon
                    fill={true}
                    size={24}
                    popper={{
                      show: true,
                      msg: "Đóng",
                      position: "CenterUp",
                    }}
                  >
                    <AiOutlineClose />
                  </ButtonIcon>
                </button>
              </div>
            </>
          )}
        </>
      )}
    </Player>
  );
}
