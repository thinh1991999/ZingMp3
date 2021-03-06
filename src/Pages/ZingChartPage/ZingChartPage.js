import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { actions, ZING_CHART_API } from "../../store";
import styles from "./ZingChartPage.module.scss";
import { Chart, Loading, AlbumItem, PrimaryButton } from "../../components";
import { AiFillPlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function ZingChartPage() {
  const { idCurrentSong } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [dataZingChart, setDataZingChart] = useState({});
  const [loadMore, setLoadMore] = useState(false);

  const fetchZingChartData = async () => {
    try {
      const respon = await fetch(ZING_CHART_API);
      const { data } = await respon.json();
      setDataZingChart(data);
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

  const handleLoadMore = () => {
    setLoadMore(true);
  };

  useEffect(() => {
    fetchZingChartData();
    dispatch(actions.setBGHeader(false));
    dispatch(actions.setCurrentNav(2));
    dispatch(actions.setShowNavMobile(false));
    !idCurrentSong && dispatch(actions.setTitle(`ZingChartPage`));
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
          {!loadMore && (
            <div className={styles.centerBtn}>
              <button onClick={handleLoadMore}>
                <PrimaryButton
                  info={{
                    msg: "xem top 100",
                    bgGray: true,
                    chart: true,
                  }}
                ></PrimaryButton>
              </button>
            </div>
          )}
        </div>
        <Row className={styles.bottom}>
          <div className={styles.blur}></div>
          <div className={styles.alpha}></div>
          <a>B???ng x???p h???ng tu???n</a>
          {weekChartKeys.map((item, index) => {
            const { country, items } = weekChart[`${item}`];
            let theme = "Vi???t Nam";
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
                    <a
                      onClick={() =>
                        toast.error("Ch???c n??ng n??y ch??a ???????c h??? tr???")
                      }
                    >
                      <PrimaryButton
                        info={{
                          msg: "xem t???t c???",
                          bgGray: true,
                          chart: true,
                        }}
                      ></PrimaryButton>
                    </a>
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
