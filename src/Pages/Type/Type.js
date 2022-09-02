import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GenreDetail,
  Loading,
  TypeBanners,
  TypeNations,
  TypeTopic,
} from "../../components";
import httpService from "../../Services/http.service";
import { actions } from "../../store";

import styles from "./Type.module.scss";

export default function Type() {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(actions.setBGHeader(true));
    httpService.getTypeHome().then((res) => {
      const { data } = res.data;
      setData(data);
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return <Loading size={50} />;
  }
  const { banners, genre, nations, topic } = data;
  return (
    <div className={clsx(styles.container, "scroll-custom")}>
      {banners && <TypeBanners banners={banners} />}
      {topic && <TypeTopic data={topic} />}
      {nations && <TypeNations data={nations} />}
      {genre?.map((item) => {
        return <GenreDetail data={item} />;
      })}
    </div>
  );
}
