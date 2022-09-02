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
        x: (index * 4) % 12,
        y: Math.floor(index / 6) * type,
        // y,
        w: 4,
        h: height,
        i: index.toString(),
      };
    });
    setLayout(layout);
    // _.map(new Array(p.items), function (item, i) {
    //     var y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
    //     return { x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: y, i: i.toString() };
    //   });
  }, [items]);
  return (
    <>
      <GridLayout
        className={styles.layout}
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
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
              <p className={styles.mess}>{title}</p>
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
