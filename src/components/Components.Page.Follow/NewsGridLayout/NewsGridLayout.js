import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { BsPlayCircle } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

import styles from "./NewsGridLayout.module.scss";
import ButtonIcon from "../../Components.Global/ButtonIcon/ButtonIcon";
import NewFeedModal from "../NewFeedModal/NewFeedModal";

export default function NewsGridLayout({ items }) {
  const [layout, setLayout] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [xValue, setXValue] = useState(4);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const layout = items.map((item, index) => {
      const { type } = item;
      var height;
      switch (type) {
        case 1:
          height = 2;
          break;
        case 2:
          height = 20;
          break;
        case 3:
          height = 16;
          break;
        case 4:
          break;
        case 5:
          break;
        default:
          height = 10;
          break;
      }
      return {
        x: (index * xValue) % 12,
        y: Math.floor(index / 6) * type,
        // y,
        w: xValue,
        h: height,
        i: index.toString(),
      };
    });
    setLayout(layout);
  }, [items, xValue]);

  useEffect(() => {
    const setX = (width) => {
      let realWidth = width;
      if (realWidth >= 1200) {
        realWidth = (width * 10) / 12;
      } else if (realWidth >= 768) {
        realWidth = (width * 11) / 12;
      }
      setWidth(realWidth - 40);
      if (realWidth >= 1240) {
        setXValue(4);
        return;
      }
      if (realWidth >= 500) {
        setXValue(6);
        return;
      }
      setXValue(12);
    };
    setX(window.innerWidth);

    const resizeEvent = (e) => {
      const width = e.target.innerWidth;
      setX(width);
    };
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  return (
    <>
      <GridLayout
        className={styles.layout}
        layout={layout}
        cols={12}
        rowHeight={30}
        width={width}
        isDraggable={false}
      >
        {items.map((item, index) => {
          const {
            publisher: { name, thumbnail, alias },
            content: { photos, thumbnail: thumbnailVideo },
            title,
            publishTime,
            like,
            commend,
          } = item;
          moment.locale("vi");
          const time = moment.unix(publishTime).format("Do MMMM [lúc] h:mm");
          return (
            <div className={styles.box} key={index}>
              <div className={styles.author}>
                <img src={thumbnail} alt="" />
                <div className={styles.info}>
                  <Link to={`/Singer/${alias}`} className={"text-link"}>
                    {name}
                  </Link>
                  <span>{time}</span>
                </div>
              </div>
              <p className={styles.mess}>
                {title.length > 200 ? `${title.substring(0, 200)}...` : title}
              </p>
              {photos || thumbnailVideo ? (
                <div
                  className={styles.content}
                  style={{
                    backgroundImage: `url(${
                      photos ? photos[0].url : thumbnailVideo
                    })`,
                  }}
                  onClick={() => {
                    setShowModal(true);
                    setDataModal(item);
                  }}
                >
                  {thumbnailVideo ? (
                    <button>
                      <ButtonIcon
                        circle={true}
                        topic={true}
                        size={80}
                        fontSize={50}
                      >
                        <BsPlayCircle />
                      </ButtonIcon>
                    </button>
                  ) : null}
                </div>
              ) : (
                <></>
              )}

              <div className={styles.express}>
                <div className={styles.icon}>
                  <AiOutlineHeart />
                  <span>{like}</span>
                </div>
                <div className={styles.icon}>
                  <FaRegComment />
                  <span>{commend}</span>
                </div>
              </div>
            </div>
          );
        })}
      </GridLayout>
      {showModal && (
        <NewFeedModal data={dataModal} setShowModal={setShowModal} />
      )}
    </>
  );
}
