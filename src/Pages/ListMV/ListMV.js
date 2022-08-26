import React, { useCallback, useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import httpService from "../../Services/http.service";
import styles from "./ListMV.module.scss";
import { Loading, Mv } from "../../components";
import { actions } from "../../store";

function ListMV() {
  const { idCurrentSong } = useSelector((state) => state.song);

  const stateNav = useRef([
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
  ]).current;

  const [state, setState] = useState(0);
  const [page, setPage] = useState(1);
  const [listMV, setListMV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [mount, setMount] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  const fetchListMV = useCallback(() => {
    setLoading(true);
    httpService.getListMv(stateNav[state].id, 1, 15).then((res) => {
      const {
        data: { items },
      } = res.data;
      setListMV(items);
      setLoading(false);
    });
  }, [stateNav, state]);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleStateNav = (index) => {
    setState(index);
    setHasMore(false);
  };

  useEffect(() => {
    if (!mount) return;
    setPage(1);
    const fetchMVPage = async () => {
      setListMV([]);
      setPageLoading(true);
      setHasMore(false);
      httpService.getListMv(stateNav[state].id, 1, 15).then((res) => {
        const {
          data: { items },
        } = res.data;
        setListMV(items);
        setPageLoading(false);
        setHasMore(true);
      });
    };
    fetchMVPage();
  }, [state, mount, stateNav]);

  useEffect(() => {
    setMount(true);
    dispatch(actions.setBGHeader(true));
    dispatch(actions.setCurrentNav(8));
    fetchListMV();
    dispatch(actions.setShowNavMobile(false));
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (!idCurrentSong) {
      document.title = "List MV";
    }
  }, [idCurrentSong]);

  useEffect(() => {
    const fetchNextMV = () => {
      httpService.getListMv(stateNav[state].id, page, 15).then((res) => {
        const {
          data: { hasMore, items },
        } = res.data;
        setHasMore(hasMore);
        setListMV([...listMV, ...items]);
      });
    };
    page > 1 && fetchNextMV();
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
