import React from "react";
import styles from "./Artists.module.scss";
import { Row } from "react-bootstrap";
import { Artist } from "..";
import clsx from "clsx";

function Artists({ data = [], title = "Nghệ sĩ tham gia" }) {
  const noArtists = data.length === 0 ? styles.noArtists : "";
  const finalClass = clsx(styles.artists, noArtists);

  return (
    <div className={finalClass}>
      <h4 className={styles.title}>{title}</h4>
      <Row className={styles.wrap}>
        {data.map((item, index) => {
          if (index > 4) return;
          return <Artist data={item} key={index} />;
        })}
      </Row>
    </div>
  );
}

export default Artists;
