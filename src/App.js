import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import "react-toastify/dist/ReactToastify.css";

import { auth, db } from "./firebase";

import {
  GlobalStyles,
  Loading,
  Lyric,
  GlobalLayout,
  CommentModal,
  LogInModal,
  WarningModal,
  SetTimeModal,
  Playlists,
  Player,
  Popper,
  TimeStopNote,
  MvModal,
} from "./components";
import {
  Album,
  Error,
  Home,
  ListMV,
  NewSong,
  Profile,
  Search,
  Singer,
  Top100,
  ZingChartPage,
} from "./Pages";
import { actions } from "./store";

function App() {
  const {
    showNavMobile,
    popperInfo: { show },
    warningModal: { show: warningShow },
    showLogin,
    showComment,
    currentUser,
    title,
  } = useSelector((state) => state.root);
  const { showMvModal } = useSelector((state) => state.mv);
  const { currentSong, showTimeStop, timeToStop } = useSelector(
    (state) => state.song
  );
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(actions.setLoginStatus(true));
        const userRef = ref(db, "users/" + user.uid);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          dispatch(
            actions.setCurrentUser({ email: user.email, id: user.uid, ...data })
          );
        });
      } else {
        dispatch(actions.setLoginStatus(false));
        dispatch(actions.setCurrentUser(null));
      }
    });
  }, [dispatch]);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "infoCurrent",
  //     JSON.stringify({
  //       idCurrentSong,
  //       currentAlbum,
  //       currentSinger,
  //       currentIndexSong,
  //       songCurrentTime,
  //       currentSong,
  //       song,
  //       listSong,
  //       indexValidSongs,
  //     })
  //   );
  // }, [
  //   idCurrentSong,
  //   currentAlbum,
  //   currentSinger,
  //   currentIndexSong,
  //   songCurrentTime,
  //   currentSong,
  //   song,
  //   listSong,
  //   indexValidSongs,
  // ]);
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <GlobalStyles>
      <div className="app theme-dark">
        <Routes>
          <Route
            path={"/"}
            element={
              <GlobalLayout>
                <Home />
              </GlobalLayout>
            }
          ></Route>

          <Route
            path={"/Album/:id"}
            element={
              <GlobalLayout>
                <Album />
              </GlobalLayout>
            }
          ></Route>
          <Route
            path={"/ZingChartHome"}
            element={
              <GlobalLayout>
                <ZingChartPage />
              </GlobalLayout>
            }
          ></Route>
          <Route
            path={"/Singer/:SingerName"}
            element={
              <GlobalLayout>
                <Singer />
              </GlobalLayout>
            }
          ></Route>
          <Route
            path={"/Top100"}
            element={
              <GlobalLayout>
                <Top100 />
              </GlobalLayout>
            }
          ></Route>
          <Route
            path={"/ListMV"}
            element={
              <GlobalLayout>
                <ListMV />
              </GlobalLayout>
            }
          ></Route>
          <Route
            path={"/NewSong"}
            element={
              <GlobalLayout>
                <NewSong />
              </GlobalLayout>
            }
          ></Route>
          <Route
            path={"/Search/:Keyword"}
            element={
              <GlobalLayout>
                <Search />
              </GlobalLayout>
            }
          ></Route>
          <Route
            path={"/Profile"}
            element={
              <GlobalLayout>
                <Profile />
              </GlobalLayout>
            }
          ></Route>
          <Route path={"/error"} element={<Error />}></Route>
          <Route path={"/*"} element={<Error />}></Route>
          {/* 
          <Route
            path={"/SearchMobile"}
            element={
              <GlobalLayout>
                <SearchMobile />
              </GlobalLayout>
            }
          ></Route>
          */}
        </Routes>
        <Lyric />
        {currentSong && !showMvModal && <Player />}
        {show && <Popper />}
        {currentSong && <Playlists />}
        {showTimeStop && <SetTimeModal />}
        {timeToStop > 0 && <TimeStopNote />}
        {warningShow && <WarningModal />}
        {showLogin && <LogInModal />}
        {/* {showComment.show && <CommentModal />}
        
        
        
        */}
        <MvModal />
      </div>
      <ToastContainer autoClose={3000} />
    </GlobalStyles>
  );
}
export default App;
