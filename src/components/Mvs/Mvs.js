import React from "react";
import styles from "./Mvs.module.scss";
import { Row } from "react-bootstrap";
import { HomeTitle, Mv } from "..";

function Mvs({ data }) {
  const { title, items = [] } = data;

  return (
    <div
      className={styles.mvs}
      style={{
        display: `${items.length === 0 ? "none" : "block"}`,
      }}
    >
      <HomeTitle msg={title} />
      <Row className="mvsContainer ">
        {items.map((item, index) => {
          const { encodeId } = item;
          if (index > 2) return;
          return <Mv key={encodeId || index} data={item} />;
        })}
      </Row>
    </div>
  );
}

export default Mvs;
