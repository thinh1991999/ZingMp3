import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import styles from "./TypeDetail.module.scss";
import httpService from "../../Services/http.service";
import { Artists, Loading, Mvs, Topics, TypePlaylist } from "../../components";
import { actions } from "../../store";

export default function TypeDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    httpService.getTypeDetail(id).then((res) => {
      const { data } = res.data;
      setData(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    dispatch(actions.setBGHeader(true));
  }, [dispatch]);

  if (loading) {
    return <Loading size={50} />;
  }

  const { cover, sections } = data;
  return (
    <div className={clsx(styles.container, "scroll-custom")}>
      <div className={styles.cover}>
        <div
          className={styles.coverImg}
          style={{
            backgroundImage: `url(${cover})`,
          }}
        ></div>
        <div className={styles.coverShadow}></div>
      </div>
      <div className={styles.content}>
        {sections?.map((section, index) => {
          const { sectionType, title } = section;
          if (sectionType === "playlist") {
            return title ? (
              <Topics data={section} key={index} />
            ) : (
              <TypePlaylist data={section} key={index} />
            );
          }
          if (sectionType === "artist") {
            return <Artists data={section} />;
          }
          if (sectionType === "video") {
            return <Mvs data={section} />;
          }
        })}
      </div>
    </div>
  );
}
