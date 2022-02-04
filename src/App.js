import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  GlobalStyles,
  Loading,
  Nav,
  Player,
  Header,
  Lyric,
  Warning,
} from "./components";
import { Home, Album, Singer, Search } from "./Pages";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { HOME_API, actions } from "./store";

function App() {
  const {
    loading,
    page,
    warning: { show, msg },
    currentSong,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const fetchHomeData = async () => {
    try {
      const respon = await fetch(`${HOME_API}${page}`);
      const dataRespon = await respon.json();
      const {
        data: { items },
      } = dataRespon;
      dispatch(actions.setLoading(false));
      dispatch(actions.setData(items));
    } catch (error) {
      dispatch(actions.setScroll(false));
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  if (loading) {
    return <Loading loadFull={true} />;
  }

  return (
    <GlobalStyles>
      <div className="app theme-dark">
        <div className="app__container">
          <Header />
          <Row>
            <Col lg={2}>
              <Nav />
            </Col>
            <Col lg={10} className="app__wrap">
              <div className="app__outer">
                <Routes>
                  <Route path={"/"} element={<Home />}></Route>
                  <Route path={"/Album/:id"} element={<Album />}></Route>
                  <Route
                    path={"/Singer/:SingerName"}
                    element={<Singer />}
                  ></Route>
                  <Route path={"/Search/:Keyword"} element={<Search />}></Route>
                </Routes>
              </div>
            </Col>
          </Row>
          <Lyric />
          {currentSong.encodeId && <Player />}
          <Warning msg={msg} />
        </div>
      </div>
    </GlobalStyles>
  );
}
export default App;
