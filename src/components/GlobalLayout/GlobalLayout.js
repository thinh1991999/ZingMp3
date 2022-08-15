import clsx from "clsx";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";

export default function GlobalLayout({ children }) {
  const { showNavMobile } = useSelector((state) => state);

  return (
    <div className="app__container">
      <Header />
      <Row>
        <Col
          lg={1}
          xl={2}
          md={1}
          className={clsx("app__nav", showNavMobile && "app__nav--active")}
        >
          <Nav />
        </Col>
        <Col lg={11} xl={10} md={11} className="app__wrap">
          <div className="app__outer">{children}</div>
        </Col>
      </Row>
    </div>
  );
}
