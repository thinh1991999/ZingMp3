import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import {
  Slider,
  Topics,
  Loading,
  Radios,
  Zingcharts,
  Singers,
  Choices,
  Events,
  Chart,
} from "../../components";
import styles from "./Home.module.scss";
import httpService from "../../Services/http.service";
import { actions } from "../../store";

function Home() {
  const dispatch = useDispatch();
  const { idCurrentSong } = useSelector((state) => state);

  const [page, setPage] = useState(1);
  const [homeData, setHomeData] = useState([]);
  const [hasMore, setHasmore] = useState(true);

  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchHomeDataNextPage = () => {
      httpService
        .getHomeData(page)
        .then((res) => {
          const {
            data: { items },
          } = res.data;
          setHomeData([...homeData, ...items]);
        })
        .catch(() => {
          setHasmore(false);
        });
    };
    fetchHomeDataNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    dispatch(actions.setBGHeader(true));
    // dispatch(actions.setCurrentNav(1));
    // dispatch(actions.setShowNavMobile(false));
    !idCurrentSong && dispatch(actions.setTitle("Home"));
  }, [dispatch, idCurrentSong]);
  console.log(homeData);
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
            return <Singers data={{ ...item }} key={sectionId || index} />;
          } else if (sectionType === "mix") {
            return <Choices data={{ ...item }} key={`${sectionId}${index}`} />;
          } else if (sectionType === "event") {
            return <Events data={{ ...item }} key={`${sectionId}${index}`} />;
          }
        })}
      </div>
    </InfiniteScroll>
  );
}

export default Home;
