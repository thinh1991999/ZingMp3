import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Singer.module.scss";
import {
  HotSongs,
  SingerInfo,
  Loading,
  Topics,
  Artists,
  Mvs,
} from "../../components";
import { actions } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import httpService from "../../Services/http.service";

function Singer() {
  const { idCurrentSong } = useSelector((state) => state.song);
  const { blackHeader } = useSelector((state) => state.root);

  const [loading, setLoading] = useState(true);
  const [dataSinger, setDataSinger] = useState([]);

  const dispatch = useDispatch();

  const { SingerName } = useParams();

  const handleScroll = useCallback(
    (e) => {
      if (e.target.scrollTop > 0) {
        !blackHeader && dispatch(actions.setBGHeader(true));
      } else {
        blackHeader && dispatch(actions.setBGHeader(false));
      }
    },
    [blackHeader, dispatch]
  );

  useEffect(() => {
    const fetchSingerData = () => {
      setLoading(true);
      httpService.getSinger(SingerName).then((res) => {
        const { data } = res.data;
        dispatch(actions.setSinger(data));
        setDataSinger(data);
        setLoading(false);
      });
    };
    fetchSingerData();
  }, [SingerName, dispatch]);

  useEffect(() => {
    // dispatch(actions.setShowNavMobile(false));
    !idCurrentSong && dispatch(actions.setTitle(`Singer:${SingerName}`));
  }, [SingerName, idCurrentSong, dispatch]);

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
        {sections?.map((item, index) => {
          const { sectionType } = item;
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
