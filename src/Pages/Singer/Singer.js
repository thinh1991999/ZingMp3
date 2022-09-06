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
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import httpService from "../../Services/http.service";
import { memo } from "react";

function Singer() {
  const currentSong = useSelector((state) => state.song.currentSong);
  const playing = useSelector((state) => state.song.playing);
  const blackHeader = useSelector((state) => state.root.blackHeader);

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
    if (!playing) {
      document.title = SingerName;
    }
  }, [playing, currentSong, SingerName]);

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

export default memo(Singer);
