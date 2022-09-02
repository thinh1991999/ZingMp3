import React, { useEffect, useState } from "react";

import styles from "./Radio.module.scss";
import {
  LiveStream,
  Loading,
  PodcastCategory,
  PodcastSlider,
  RadioSchedule,
} from "../../components";
import httpService from "../../Services/http.service";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { actions } from "../../store";

export default function Radio() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    httpService.getRadio().then((res) => {
      const { data } = res.data;
      setData(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    dispatch(actions.setBGHeader(true));
  }, [dispatch]);

  if (loading) {
    return <Loading size={50} />;
  }
  const { items } = data;
  return (
    <div className={clsx("scroll-custom", styles.Radio)}>
      {items.map((item, index) => {
        const { sectionType } = item;
        if (sectionType === "livestream") {
          return <LiveStream data={item} key={index} />;
        }
        if (sectionType === "Radio_Schedule") {
          return <RadioSchedule data={item} key={index} />;
        }
        if (sectionType === "podcast") {
          return <PodcastSlider data={item} key={index} />;
        }
        if (sectionType === "podcast_category") {
          return <PodcastCategory data={item} key={index} />;
        }
      })}
    </div>
  );
}
