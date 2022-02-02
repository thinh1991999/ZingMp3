import React from "react";
import styles from "./Choices.module.scss";
import { HomeTitle, Choice } from "..";
import { Row } from "react-bootstrap";
import clsx from "clsx";

function Choices({ data }) {
  const { items, title } = data;
  return (
    <div className={clsx(styles.choices, "pd-15-px")}>
      <HomeTitle msg={title} />
      <Row className={styles.choicesContainer}>
        {items.map((item, index) => {
          const { encodeId } = item;
          if (index > 2) return;
          return <Choice key={encodeId} data={item} />;
        })}
      </Row>
    </div>
  );
}

export default Choices;
