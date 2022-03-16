import React, { useEffect, useState } from "react";
import styles from "./ListMV.module.scss";
import { Loading, Mv } from "../../components";
import { actions, LIST_MV_API } from "../../store";
import { Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

function ListMV() {
  const { currentSong } = useSelector((state) => state);

  const [loading, setLoading] = useState(true);
  const [stateNav, setStateNav] = useState([
    {
      name: "việt nam",
      id: "IWZ9Z08I",
    },
    {
      name: "us-uk",
      id: "IWZ9Z08O",
    },
    {
      name: "kpop",
      id: "IWZ9Z08W",
    },
    {
      name: "hòa tấu",
      id: "IWZ9Z086",
    },
  ]);

  const [state, setState] = useState(0);
  const [page, setPage] = useState(1);
  const [listMV, setListMV] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [mount, setMount] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  const fetchListMV = async () => {
    try {
      const respon = await fetch(
        `${LIST_MV_API}${stateNav[state].id}&page=1&count=15`
      );
      const {
        data: { items },
      } = await respon.json();
      setListMV([...items]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchNextMV = async () => {
    try {
      const respon = await fetch(
        `${LIST_MV_API}${stateNav[state].id}&page=${page}&count=15`
      );
      const {
        data: { items, hasMore },
      } = await respon.json();
      setListMV([...listMV, ...items]);
      setHasMore(hasMore);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchMVPage = async () => {
    setListMV([]);
    setPageLoading(true);
    setHasMore(false);
    try {
      const respon = await fetch(
        `${LIST_MV_API}${stateNav[state].id}&page=1&count=15`
      );
      const {
        data: { items },
      } = await respon.json();
      setListMV([...items]);
      setPageLoading(false);
      if (state === 3) {
        setHasMore(false);
        return;
      }
      setHasMore(true);
    } catch (error) {
      setPageLoading(false);
      setHasMore(true);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleStateNav = (index) => {
    setState(index);
  };

  useEffect(() => {
    if (!mount) return;
    setPage(1);
    fetchMVPage();
  }, [state]);

  useEffect(() => {
    setMount(true);
    dispatch(actions.setBGHeader(true));
    dispatch(actions.setCurrentNav(8));
    fetchListMV();
    dispatch(actions.setShowNavMobile(false));
    !currentSong && dispatch(actions.setTitle("List MV"));
  }, []);

  useEffect(() => {
    if (!mount) return;
    if (state === 3) {
      setHasMore(false);
      return;
    }
    fetchNextMV();
  }, [page]);

  if (loading) {
    return <Loading size={50} />;
  }

  return (
    <InfiniteScroll
      dataLength={listMV.length}
      next={handleNext}
      style={{}}
      hasMore={hasMore}
      height={"100vh"}
      loader={<Loading size={5} nextPage={true} />}
    >
      <div className={styles.listMV}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h4>MV</h4>
            <ul>
              {stateNav.map((item, index) => {
                const { name } = item;
                if (index === state) {
                  return (
                    <li className={styles.active} key={index}>
                      {name}
                    </li>
                  );
                }
                return (
                  <li onClick={() => handleStateNav(index)} key={index}>
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.content}>
            {pageLoading ? (
              <Loading size={30} mv={true} />
            ) : (
              <Row>
                {listMV.map((mv, index) => {
                  const { encodeId } = mv;
                  return <Mv key={`${encodeId}${index}`} data={mv} />;
                })}
              </Row>
            )}
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default ListMV;
