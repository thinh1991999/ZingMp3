import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./ZingChartWeek.module.scss";
import { Loading, OptionsTime, SongItem } from "../../components";
import { actions } from "../../store";
import httpService from "../../Services/http.service";
import clsx from "clsx";
import moment from "moment";

export default function ZingChartWeek() {
  const dispatch = useDispatch();

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
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isApiSubscribed = true;
    setLoading(true);
    httpService.getWeekChart(options[current].id).then((res) => {
      if (isApiSubscribed) {
        const { data } = res.data;
        setData(data);
        setLoading(false);
      }
    });
    return () => {
      isApiSubscribed = false;
    };
  }, [current, options]);

  useEffect(() => {
    dispatch(actions.setBGHeader(false));
  }, [dispatch]);

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
                className={current === index && styles.active}
                onClick={() => setCurrent(index)}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
        <div className={styles.optionsTime}>
          <OptionsTime optionsTime={optionsTime} />
        </div>
        {loading ? (
          <Loading size={30} mv={true} />
        ) : (
          <div className={clsx(styles.songWrap, "scroll-custom")}>
            {data?.items.map((item, index) => {
              const { encodeId, streamingStatus, isWorldWide } = item;
              return (
                <SongItem
                  key={encodeId}
                  status={streamingStatus}
                  worldWide={isWorldWide}
                  data={item}
                  index={index}
                  chartHome={true}
                  // chartWeekIdx={indexWeek}
                  listSong={data?.items}
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
