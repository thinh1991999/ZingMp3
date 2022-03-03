import React, { useEffect, useRef, useState } from "react";
import styles from "./Singer.module.scss";
import {
  HotSongs,
  SingerInfo,
  Loading,
  Topics,
  Artists,
  Mvs,
} from "../../components";
import { SINGER_API, actions } from "../../store";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Singer() {
  const [loading, setLoading] = useState(true);
  const [dataSinger, setDataSinger] = useState([]);

  const dispatch = useDispatch();

  const { SingerName } = useParams();

  const fetchSingerData = async () => {
    setLoading(true);
    try {
      const respon = await fetch(`${SINGER_API}${SingerName}`);
      const values = await respon.json();
      const { data } = values;
      dispatch(actions.setSinger(data));
      setDataSinger(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop > 0) {
      dispatch(actions.setBGHeader(true));
    } else {
      dispatch(actions.setBGHeader(false));
    }
  };

  useEffect(() => {
    fetchSingerData();
    dispatch(actions.setCurrentNav(""));
  }, [SingerName]);

  useEffect(() => {
    dispatch(actions.setShowNavMobile(false));
  }, []);

  if (loading) {
    return <Loading size={50} />;
  }

  const {
    name,
    sortBiography: sortDesc,
    biography: desc,
    follow,
    thumbnailM: image,
    topAlbum,
    sections,
  } = dataSinger;
  return (
    <div className={styles.singer} onScroll={handleScroll}>
      <SingerInfo data={{ name, sortDesc, desc, follow, image, topAlbum }} />
      <div className={styles.singerWrap}>
        {sections.map((item, index) => {
          const { sectionType, items } = item;
          if (sectionType === "song") {
            return <HotSongs data={{ ...item }} key={index} />;
          } else if (sectionType === "playlist") {
            return <Topics data={{ ...item }} key={index} />;
          } else if (sectionType === "artist") {
            const { items: artists } = item;
            return <Artists data={artists} key={index} />;
          } else if (sectionType === "video") {
            return <Mvs data={item} key={index} />;
          }
        })}
      </div>
    </div>
  );
}

export default Singer;
