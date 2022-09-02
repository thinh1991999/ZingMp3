import moment from "moment";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";

import styles from "./NewFeedModal.module.scss";

import ButtonIcon from "../../Components.Global/ButtonIcon/ButtonIcon";

export default function NewFeedModal({ data, setShowModal }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (data) {
      const {
        content: { source },
      } = data;
      if (source) {
        const keys = Object.keys(source);
        const newSrc = [];
        keys.forEach((key) => {
          if (key === "ratio" || key === "thumbnail") return;
          newSrc.push({
            quality: key,
            url: source[key],
          });
        });
        setSrc(newSrc);
      }
    }
  }, [data]);

  const {
    publisher: { name, thumbnail, alias },
    content: { photos, thumbnail: thumbnailVideo },
    title,
    publishTime,
    like,
    commend,
  } = data;
  moment.locale("vi");
  const time = moment.unix(publishTime).format("Do MMMM [lúc] h:mm");
  return (
    <div className={styles.container}>
      <div className={styles.layer} onClick={() => setShowModal(false)}></div>
      <Row className={styles.content}>
        <Col lg={7} className={styles.left}>
          {photos && <img src={photos[0].url} alt="" />}
          {src && (
            <Player
              src={src}
              poster={thumbnailVideo}
              dimensions={{ width: "100%", height: "100%" }}
            >
              {(ref, props) => (
                <>
                  <video
                    ref={ref}
                    {...props}
                    autoPlay={true}
                    style={{ backgroundColor: "black" }}
                    className={styles.video}
                  />
                </>
              )}
            </Player>
          )}
        </Col>
        <Col lg={5} className={styles.right}>
          <div className={styles.rightContent}>
            <div className={styles.author}>
              <img src={thumbnail} alt="" />
              <div className={styles.info}>
                <Link to={`/Singer/${alias}`} className={"text-link"}>
                  {name}
                </Link>
                <span>{time}</span>
              </div>
            </div>
            <p className={styles.mess}>{title}</p>
          </div>
        </Col>
      </Row>
      <button className={styles.close} onClick={() => setShowModal(false)}>
        <ButtonIcon size={40} fontSize={30} bg="gray">
          <AiOutlineClose />
        </ButtonIcon>
      </button>
    </div>
  );
}
