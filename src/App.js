import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  GlobalStyles,
  Loading,
  Nav,
  Player,
  Header,
  Lyric,
  Popper,
  Playlists,
  SetTimeModal,
} from "./components";
import {
  Home,
  Album,
  Singer,
  Search,
  ZingChartPage,
  ListMV,
  Top100,
  SearchMobile,
} from "./Pages";
import { Row, Col } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { HOME_API, actions } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";

function App() {
  const {
    loading,
    page,
    idCurrentSong,
    currentSong,
    showNavMobile,
    popperInfo: { show },
    showTimeStop,
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
            <Col
              lg={1}
              xl={2}
              md={1}
              className={clsx("app__nav", showNavMobile && "app__nav--active")}
            >
              <Nav />
            </Col>
            <Col lg={11} xl={10} md={11} className="app__wrap">
              <div className="app__outer">
                <Routes>
                  <Route path={"/"} element={<Home />}></Route>
                  <Route path={"/Album/:id"} element={<Album />}></Route>
                  <Route
                    path={"/Singer/:SingerName"}
                    element={<Singer />}
                  ></Route>
                  <Route path={"/Search/:Keyword"} element={<Search />}></Route>
                  <Route
                    path={"/ZingChartHome"}
                    element={<ZingChartPage />}
                  ></Route>
                  <Route path={"/ListMV"} element={<ListMV />}></Route>
                  <Route path={"/Top100"} element={<Top100 />}></Route>
                  <Route
                    path={"/SearchMobile"}
                    element={<SearchMobile />}
                  ></Route>
                </Routes>
              </div>
            </Col>
          </Row>
        </div>
        <Lyric />
        {showTimeStop && <SetTimeModal />}
        {idCurrentSong && <Playlists />}
        {idCurrentSong && <Player />}
        {show && <Popper />}
      </div>

      <ToastContainer autoClose={3000} />
    </GlobalStyles>
  );
}
export default App;
