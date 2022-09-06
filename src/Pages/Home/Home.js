import React, { memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Slider,
  Topics,
  Loading,
  Radios,
  Zingcharts,
  Choices,
  Events,
  Chart,
  Artists,
} from "../../components";
import styles from "./Home.module.scss";
import httpService from "../../Services/http.service";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

function Home() {
  const dispatch = useDispatch();

  const playing = useSelector((state) => state.song.playing);

  const [page, setPage] = useState(2);
  const [homeData, setHomeData] = useState([]);
  const [hasMore, setHasmore] = useState(true);

  const handleNext = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    const callApi1 = httpService.getHomeData(1).then((res) => {
      const {
        data: { items },
      } = res.data;
      return items;
    });
    const callApi2 = httpService.getHomeData(2).then((res) => {
      const {
        data: { items },
      } = res.data;
      return items;
    });
    Promise.all([callApi1, callApi2]).then((res) => {
      setHomeData([...res[0], ...res[1]]);
    });
  }, []);
  useEffect(() => {
    let isApiSubcribed = true;
    if (page <= 2) return;
    httpService
      .getHomeData(page)
      .then((res) => {
        if (isApiSubcribed) {
          const {
            data: { items },
          } = res.data;
          setHomeData([...homeData, ...items]);
        }
      })
      .catch(() => {
        if (isApiSubcribed) {
          setHasmore(false);
        }
      });
    return () => {
      isApiSubcribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  useEffect(() => {
    dispatch(actions.setBGHeader(true));
  }, [dispatch]);

  useEffect(() => {
    if (!playing) {
      document.title = "ZingMp3-Nghe nhạc hay,chất lượng";
    }
  }, [playing]);

  return (
    <InfiniteScroll
      dataLength={homeData.length}
      next={handleNext}
      hasMore={hasMore}
      loader={<Loading size={5} nextPage={true} />}
      height="100vh"
    >
      <div className={styles.home}>
        {homeData?.map((item, index) => {
          const { sectionId, sectionType } = item;
          if (sectionType === "banner") {
            return <Slider data={{ ...item }} key={`${sectionId}${index}`} />;
          } else if (
            sectionType === "playlist" ||
            sectionType === "recentPlaylist"
          ) {
            const { items = [] } = item;
            if (items?.length === 0 || !items) return null;
            return <Topics data={{ ...item }} key={`${sectionId}${index}`} />;
          } else if (sectionType === "RTChart") {
            return <Chart data={{ ...item }} key={`${sectionId}${index}`} />;
          } else if (sectionType === "livestream") {
            return <Radios data={{ ...item }} key={`${sectionId}${index}`} />;
          } else if (sectionType === "weekChart") {
            return (
              <Zingcharts data={{ ...item }} key={`${sectionId}${index}`} />
            );
          } else if (sectionType === "artistSpotlight") {
            return <Artists data={{ ...item }} key={sectionId || index} />;
          } else if (sectionType === "mix") {
            return <Choices data={{ ...item }} key={`${sectionId}${index}`} />;
          } else if (sectionType === "event") {
            return <Events data={{ ...item }} key={`${sectionId}${index}`} />;
          }
          return <></>;
        })}
      </div>
    </InfiniteScroll>
  );
}

export default memo(Home);
