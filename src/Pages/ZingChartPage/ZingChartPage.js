import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { actions } from "../../store";
import styles from "./ZingChartPage.module.scss";
import { Chart, Loading, AlbumItem, PrimaryButton } from "../../components";
import { AiFillPlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import httpService from "../../Services/http.service";

function ZingChartPage() {
  const { idCurrentSong, blackHeader } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [dataZingChart, setDataZingChart] = useState({});
  const [loadMore, setLoadMore] = useState(false);

  const fetchZingChartData = () => {
    setLoading(true);
    httpService.getZingChart().then((res) => {
      const { data } = res.data;
      setDataZingChart(data);
      setLoading(false);
    });
  };

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

  const handleLoadMore = () => {
    setLoadMore(!loadMore);
  };

  useEffect(() => {
    if (!idCurrentSong) {
      document.title = "ZingChartPage";
    }
  }, [idCurrentSong]);

  useEffect(() => {
    fetchZingChartData();
    dispatch(actions.setBGHeader(false));
    // dispatch(actions.setCurrentNav(2));
    // dispatch(actions.setShowNavMobile(false));
  }, []);

  if (loading) {
    return <Loading size={50} />;
  }

  const { RTChart, weekChart } = dataZingChart;
  const { items } = RTChart;
  const weekChartKeys = Object.keys(weekChart);

  return (
    <div className={styles.zingchart} onScroll={handleScroll}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.blur}></div>
          <div className={styles.alpha}></div>
          <div className={styles.alpha1}></div>
          <div className={styles.header}>
            <h4>
              #zingchart{" "}
              <button>
                <AiFillPlayCircle />
              </button>
            </h4>
          </div>
          <div className={styles.content}>
            <Chart data={{ ...RTChart }} home={true} />
          </div>
        </div>
        <div className={styles.center}>
          {items.map((item, index) => {
            const { encodeId, streamingStatus, isWorldWide } = item;
            if (index > 9 && !loadMore) return;
            return (
              <AlbumItem
                key={encodeId}
                status={streamingStatus}
                worldWide={isWorldWide}
                data={item}
                index={index}
                chartHome={true}
                listSong={items}
              />
            );
          })}
          <div className={styles.centerBtn}>
            <button onClick={handleLoadMore}>
              <PrimaryButton
                info={{
                  msg: !loadMore ? "Xem top 100" : "Xem top 10",
                  bgGray: true,
                  chart: true,
                }}
              ></PrimaryButton>
            </button>
          </div>
        </div>
        <Row className={styles.bottom}>
          <div className={styles.blur}></div>
          <div className={styles.alpha}></div>
          <a>Bảng xếp hạng tuần</a>
          {weekChartKeys.map((item, index) => {
            const { country, items } = weekChart[`${item}`];
            let theme = "Việt Nam";
            if (country === "us") {
              theme = "US-UK";
            }
            if (country === "korea") {
              theme = "K-Pop";
            }
            return (
              <Col lg={4} className={styles.chartWeek} key={index}>
                <div className={styles.chartWrap}>
                  <div className={styles.chartTop}>
                    <div className={styles.chartHeader}>
                      <a>{theme} </a>
                      <button>
                        <AiFillPlayCircle />
                      </button>
                    </div>
                  </div>
                  <div className={styles.chartContent}>
                    {items.map((item, index) => {
                      const { encodeId, streamingStatus, isWorldWide } = item;
                      if (index > 4 && !loadMore) return;
                      return (
                        <AlbumItem
                          key={encodeId}
                          status={streamingStatus}
                          worldWide={isWorldWide}
                          data={item}
                          index={index}
                          chartHome={true}
                          small={true}
                        />
                      );
                    })}
                  </div>
                  <div className={styles.bottomBtn}>
                    <button
                      onClick={() =>
                        toast.error("Chức năng này chưa được hỗ trợ")
                      }
                    >
                      <PrimaryButton
                        info={{
                          msg: "xem tất cả",
                          bgGray: true,
                          chart: true,
                        }}
                      ></PrimaryButton>
                    </button>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default ZingChartPage;
