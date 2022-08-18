import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  AiOutlineClose,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import httpService from "../../Services/http.service";
import { actions } from "../../store";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import LoadingSquare from "../LoadingSquare/LoadingSquare";
import LoadingMvModal from "./LoadingMvModal/LoadingMvModal";
import styles from "./MvModal.module.scss";
import PlayerList from "./PlayerList/PlayerList";
import PlayerMV from "./PlayerMV/PlayerMV";

export default function MvModal() {
  const dispatch = useDispatch();
  const { showMvModal, idShow, showSmallScreen } = useSelector(
    (state) => state.mv
  );
  const [mvData, setMvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMv, setLoadingMv] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [playList, setPlayList] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [mount, setMount] = useState(false);

  const handleCloseModal = () => {
    dispatch(actions.setIdMvModal(null));
    dispatch(actions.setShowMvModal(false));
    dispatch(actions.setShowSmallScreen(false));
  };

  const handleSizeModal = () => {
    dispatch(actions.setShowSmallScreen(!showSmallScreen));
  };

  const handleEndPlayer = useCallback(() => {
    if (autoPlay) {
      const idx = playList.findIndex((item) => {
        return item.encodeId === currentId;
      });
      const newId = playList[idx + 1].encodeId;
      setCurrentId(newId);
    }
  }, [playList, currentId, autoPlay]);

  useEffect(() => {
    if (idShow) {
      setLoading(true);
      setLoadingMv(true);
      httpService.getVideoMV(idShow).then((res) => {
        const { data } = res.data;
        const { encodeId, recommends, title, thumbnailM, artists } = data;
        const newPlayList = [
          { encodeId, title, thumbnailM, artists },
          ...recommends,
        ];
        setCurrentId(encodeId);
        setMount(true);
        setPlayList(newPlayList);
        setMvData(data);
        setLoading(false);
        setLoadingMv(false);
      });
    }
  }, [idShow]);

  useEffect(() => {
    if (!mount) {
      return;
    }
    setLoadingMv(true);
    httpService.getVideoMV(currentId).then((res) => {
      const { data } = res.data;
      setMvData(data);
      setLoadingMv(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);
  if (loading) {
    return <LoadingMvModal />;
  }

  const {
    title,
    artist: { thumbnail },
    artists,
    streaming,
    thumbnailM: thumbnailMv,
  } = mvData;

  return (
    <div
      className={clsx(
        styles.MvModal,
        showMvModal ? styles.MvModalShow : null,
        showSmallScreen ? styles.MvModalSmall : null
      )}
    >
      <div className={styles.container}>
        <div
          className={styles.blur}
          style={{
            backgroundImage: `url(${thumbnailMv})`,
          }}
        ></div>
        <div className={styles.alpha}></div>
        <div className={styles.alpha1}></div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.left}>
              {loadingMv ? (
                <>
                  <LoadingSquare circle={true} height={"50px"} width={"50px"} />
                  <div className={styles.info}>
                    <LoadingSquare
                      height={"10px"}
                      width={"50px"}
                      margin="0 0 10px"
                    />
                    <LoadingSquare height={"10px"} width={"120px"} />
                  </div>
                </>
              ) : (
                <>
                  <img src={thumbnail} alt="" />
                  <div className={styles.info}>
                    <h5>{title}</h5>
                    <p>
                      {artists.map((artist, index) => {
                        const { id, alias, name } = artist;
                        return (
                          <Link key={id} to={"/singer/" + alias}>
                            {name}
                            {index === artists.length - 1 ? "" : ","}
                          </Link>
                        );
                      })}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className={styles.right}>
              <button onClick={handleSizeModal}>
                <ButtonIcon
                  fill={true}
                  size={24}
                  popper={{
                    show: true,
                    msg: "Đóng",
                    position: "CenterDown",
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
                    position: "CenterDown",
                  }}
                >
                  <AiOutlineClose />
                </ButtonIcon>
              </button>
            </div>
          </div>
          <div className={styles.mvShow}>
            <Row className={styles.mvShowMain}>
              <Col lg={showSmallScreen ? 12 : 9} className={styles.left}>
                {loadingMv ? (
                  <LoadingSquare />
                ) : (
                  <>
                    <PlayerMV
                      info={streaming}
                      thumbnailMv={thumbnailMv}
                      handleEndPlayer={handleEndPlayer}
                    />
                  </>
                )}
              </Col>
              <Col lg={3} className={styles.right}>
                <PlayerList
                  playList={playList}
                  autoPlay={autoPlay}
                  setAutoPlay={setAutoPlay}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
