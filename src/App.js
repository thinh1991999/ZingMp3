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
  WarningModal,
  LogInModal,
  CommentModal,
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
  Profile,
} from "./Pages";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { HOME_API, actions } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";
import TimeStopNote from "./components/TimeStopNote/TimeStopNote";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "./store/actions";
import { onValue, ref } from "firebase/database";

function App() {
  const {
    loading,
    page,
    idCurrentSong,
    showNavMobile,
    popperInfo: { show },
    showTimeStop,
    timeToStop,
    warningModal: { show: warningShow },
    showLogin,
    showComment,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const fetchHomeData = async () => {
    try {
      const respon = await fetch(`${HOME_API}${page}`);
      const dataRespon = await respon.json();
      const {
        data: { items },
      } = dataRespon;
      dispatch(actions.setData(items));
    } catch (error) {
      dispatch(actions.setScroll(false));
    }
  };

  useEffect(() => {
    fetchHomeData();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, "users/" + user.uid);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data.profile_picture) {
            dispatch(setCurrentUser(data));
          } else {
            dispatch(
              setCurrentUser({
                ...data,
                profile_picture:
                  "https://firebasestorage.googleapis.com/v0/b/my-project-2b635.appspot.com/o/unknown.jpg?alt=media&token=0ac6668a-86e6-426a-bf15-18f4e93cacd5",
              })
            );
          }
        });
      } else {
        dispatch(setCurrentUser(null));
      }
      dispatch(actions.setLoading(false));
    });
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
                  <Route path={"/Profile"} element={<Profile />}></Route>
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
        {showComment.show && <CommentModal />}
        {showLogin && <LogInModal />}
        {warningShow && <WarningModal />}
        {timeToStop > 0 && <TimeStopNote />}
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
