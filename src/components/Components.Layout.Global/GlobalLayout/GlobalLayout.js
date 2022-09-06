import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "../../Components.Global/Header/Header";
import Nav from "../../Components.Global/Nav/Nav";
import NavMobile from "../../Components.Global/NavMobile/NavMobile";

export default function GlobalLayout({ children }) {
  const { showNavMobile } = useSelector((state) => state.root);

  return (
    <div className="app__container">
      <Header />
      <Row>
        <Col lg={1} xl={2} md={1} className="app__nav d-md-block d-none">
          <Nav />
        </Col>
        <Col lg={11} xl={10} md={11} className="app__wrap">
          <div className="app__outer">{children}</div>
        </Col>
      </Row>
      {showNavMobile && <NavMobile />}
    </div>
  );
}
