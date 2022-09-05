import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./ZingChartWeek.module.scss";
import { Loading, OptionsTime, SongItem } from "../../components";
import { actions } from "../../store";
import httpService from "../../Services/http.service";

function ZingChartWeek() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.song.playing);

  const options = useRef([
    {
      name: "việt nam",
      id: "IWZ9Z08I",
    },
    {
      name: "US-UK",
      id: "IWZ9Z0BW",
    },
    {
      name: "k-pop",
      id: "IWZ9Z0BO",
    },
  ]).current;

  const [optionsTime, setOptionsTime] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limitTime, setLimitTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    let isApiSubscribed = true;
    setLoading(true);
    if (currentTime) {
      const { week, year } = currentTime;
      httpService.getWeekChart(id, week, year).then((res) => {
        if (isApiSubscribed) {
          const {
            data: { items, playlistId },
          } = res.data;
          setAlbum(playlistId);
          setItems(items);
          setLoading(false);
        }
      });
    } else {
      httpService.getWeekChart(id).then((res) => {
        if (isApiSubscribed) {
          const {
            data: { items, week, year, playlistId },
          } = res.data;
          setAlbum(playlistId);
          setItems(items);
          setCurrentTime(null);
          setLimitTime({
            week,
            year,
          });
          setLoading(false);
        }
      });
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [id, currentTime]);

  useEffect(() => {
    dispatch(actions.setBGHeader(false));
  }, [dispatch]);
  useEffect(() => {
    if (!playing) {
      document.title = "#zingchart tuần, #zingchart Zing - Bài hát";
    }
  }, [playing]);
  useEffect(() => {
    const from = moment("01/01/2020");
    const feature = moment("01/01/2024");
    const ms = feature.diff(from);
    const totalDays = moment.duration(ms).asDays() / 7;
    const arr = [];
    let countWeek = 1;
    let beginYear = 2020;
    let optionKeys = [];
    for (let i = 0; i < totalDays; i++) {
      const timeBeginWeek = moment(from.startOf("week")).add(i, "weeks");
      const timeEndWeek = moment(from.endOf("week")).add(i, "weeks");
      const year = timeBeginWeek.year();
      if (year < 2020) continue;
      if (year !== beginYear) {
        countWeek = 1;
        beginYear = year;
      }
      const timeLocalBegin = timeBeginWeek.format("[Tháng] MM[-]YYYY");
      const timeLocalEnd = timeEndWeek.format("[Tháng] MM[-]YYYY");
      if (!optionKeys.includes(timeLocalBegin)) {
        optionKeys.push(timeLocalBegin);
      }
      arr.push({
        weekCount: countWeek,
        year: year,
        begin: timeBeginWeek.format("DD/MM"),
        end: timeEndWeek.format("DD/MM"),
        timeLocale:
          timeLocalBegin === timeLocalEnd
            ? [timeLocalBegin]
            : [timeLocalBegin, timeLocalEnd],
      });
      countWeek++;
    }
    const optionArr = optionKeys.map((option) => {
      const itemsFilter = arr.filter((item) => {
        return item.timeLocale.includes(option);
      });
      return {
        monthKey: option,
        items: itemsFilter,
      };
    });
    setOptionsTime(optionArr);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.blur}></div>
      <div className={styles.alpha1}></div>
      <div className={styles.alpha2}></div>
      <div className={styles.content}>
        <h3>Bảng Xếp Hạng Tuần</h3>
        <ul>
          {options.map((option, index) => {
            return (
              <li
                key={index}
                className={option.id === id ? styles.active : null}
                onClick={() => {
                  setCurrentTime(null);
                  navigate("/ZingChartWeek/" + option.id);
                }}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
        {limitTime && !loading && (
          <div className={styles.optionsTime}>
            <OptionsTime
              optionsTime={optionsTime}
              limitTime={limitTime}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
            />
          </div>
        )}
        {loading ? (
          <Loading size={30} mv={true} />
        ) : (
          <div className={clsx(styles.songWrap, "scroll-custom")}>
            {items.map((item, index) => {
              const { encodeId, streamingStatus, isWorldWide } = item;
              return (
                <SongItem
                  key={encodeId}
                  status={streamingStatus}
                  worldWide={isWorldWide}
                  data={item}
                  index={index}
                  chartWeek={true}
                  albumId={album}
                  listSong={items}
                  small={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ZingChartWeek);
