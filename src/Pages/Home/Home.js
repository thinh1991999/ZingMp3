import React, { useRef, useEffect } from "react";
import {
  Slider,
  Topics,
  Loading,
  Radios,
  Zingcharts,
  Singers,
  Choices,
  HotSongs,
  Events,
} from "../../components";
import styles from "./Home.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { actions, HOME_API } from "../../store";

function Home() {
  const { data, page, scroll, nextPage, loadingHome, lastest } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  const homeRef = useRef(null);

  const fetchHomeDataNextPage = async () => {
    dispatch(actions.setLoadingHome(true));
    try {
      const respon = await fetch(`${HOME_API}${page}`);
      const dataRespon = await respon.json();
      const {
        data: { items },
      } = dataRespon;
      dispatch(actions.setData(items));
    } catch (error) {
      dispatch(actions.setScroll(false));
    }
    dispatch(actions.setLoadingHome(false));
    dispatch(actions.setNextPageHome(false));
  };
  const eventNextPage = () => {
    if (
      homeRef.current.scrollTop + window.innerHeight + 600 >=
        homeRef.current.scrollHeight &&
      scroll
    ) {
      dispatch(actions.setNextPageHome(true));
    }
  };

  useEffect(() => {
    if (scroll) {
      homeRef.current.addEventListener("scroll", eventNextPage);
      return () => {
        if (homeRef.current) {
          homeRef.current.removeEventListener("scroll", eventNextPage);
        }
      };
    }
  }, [scroll]);

  useEffect(() => {
    if (!nextPage) return;
    dispatch(actions.setPage(page + 1));
  }, [nextPage]);

  useEffect(() => {
    if (page > 1 && scroll) {
      fetchHomeDataNextPage();
    }
  }, [page, scroll]);

  useEffect(() => {
    dispatch(actions.setBGHeader(true));
  }, []);

  return (
    <div className={styles.home} ref={homeRef}>
      {data.map((item, index) => {
        const { sectionId, sectionType } = item;

        if (sectionType === "banner") {
          return <Slider data={{ ...item }} key={`${sectionId}${index}`} />;
        } else if (sectionType === "playlist") {
          return <Topics data={{ ...item }} key={`${sectionId}${index}`} />;
        } else if (sectionType === "livestream") {
          return <Radios data={{ ...item }} key={`${sectionId}${index}`} />;
        } else if (sectionType === "weekChart") {
          return <Zingcharts data={{ ...item }} key={`${sectionId}${index}`} />;
        } else if (sectionType === "artistSpotlight") {
          return <Singers data={{ ...item }} key={sectionId || index} />;
        } else if (sectionType === "mix") {
          return <Choices data={{ ...item }} key={`${sectionId}${index}`} />;
        } else if (sectionType === "event") {
          return <Events data={{ ...item }} key={`${sectionId}${index}`} />;
        }
      })}
      {loadingHome ? <Loading size={5} nextPage={true} /> : ""}
    </div>
  );
}

export default Home;
