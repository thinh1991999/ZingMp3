import clsx from "clsx";
import React, { memo, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { Loading, NewsGridLayout } from "../../components";
import httpService from "../../Services/http.service";
import { actions } from "../../store";
import styles from "./Follow.module.scss";

function Follow() {
  const dispatch = useDispatch();
  const navTitles = useRef([
    {
      title: "Việt nam",
      id: "IWZ9Z08I",
    },
    {
      title: "us-uk",
      id: "IWZ9Z08O",
    },
    {
      title: "k-pop",
      id: "IWZ9Z08W",
    },
    {
      title: "hoa ngữ",
      id: "IWZ9Z08U",
    },
  ]).current;

  const [current, setCurrent] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (page < 2) return;
    httpService.getNewFeeds(navTitles[current].id, page).then((res) => {
      const {
        total,
        data: { items },
      } = res.data;
      const newArr = [...data, ...items];
      if (newArr.length === total) setHasMore(false);
      setData([...data, ...items]);
    });
    // eslint-disable-next-line
  }, [page, current, navTitles]);

  useEffect(() => {
    if (!mounted) return;
    setData([]);
    setHasMore(false);
    setPageLoading(true);
    setPage(1);
    httpService.getNewFeeds(navTitles[current].id, 1).then((res) => {
      const {
        data: { items },
      } = res.data;
      setData(items);
      setPageLoading(false);
      setHasMore(true);
    });
    // eslint-disable-next-line
  }, [current, navTitles]);

  useEffect(() => {
    const fetchFirstTime = () => {
      setLoading(true);
      httpService.getNewFeeds(navTitles[current].id, 1).then((res) => {
        const {
          data: { items },
        } = res.data;
        setData(items);
        setLoading(false);
      });
    };
    fetchFirstTime();
    dispatch(actions.setBGHeader(true));
    setMounted(true);
    // eslint-disable-next-line
  }, [dispatch]);

  if (loading) {
    return <Loading size={50} />;
  }
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={handleNext}
      style={{}}
      hasMore={hasMore}
      height={"100vh"}
      loader={<Loading size={5} nextPage={true} />}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.navList}>
            {navTitles.map((nav, index) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    styles.navItem,
                    index === current && styles.navItemActive
                  )}
                  onClick={() => setCurrent(index)}
                >
                  {nav.title}
                </div>
              );
            })}
          </div>
        </div>
        {pageLoading ? (
          <Loading size={30} mv={true} />
        ) : (
          <div className={styles.main}>
            <NewsGridLayout items={data} />
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
}

export default memo(Follow);
