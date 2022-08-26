import React from "react";
import { Row } from "react-bootstrap";
import clsx from "clsx";
import styles from "./Choices.module.scss";
import HomeTitle from "../../Components.Global/HomeTitle/HomeTitle";
import Choice from "../Choice/Choice";

function Choices({ data }) {
  const { items, title } = data;
  return (
    <div className={clsx(styles.choices, "pd-15-px")}>
      <HomeTitle msg={title} />
      <Row className={styles.choicesContainer}>
        {items.map((item, index) => {
          const { encodeId } = item;
          if (index > 3) return null;
          return <Choice key={encodeId} data={item} />;
        })}
      </Row>
    </div>
  );
}

export default Choices;
