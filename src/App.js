import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStyles, Loading, Lyric, GlobalLayout } from "./components";
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
  Error,
} from "./Pages";
import { useSelector, useDispatch } from "react-redux";
import { HOME_API, actions } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "./store/actions";
import { onValue, ref } from "firebase/database";

function App() {
  const {
    loading,
    page,
    idCurrentSong,
    currentAlbum,
    currentIndexSong,
    songCurrentTime,
    currentSinger,
    currentSong,
    song,
    showNavMobile,
    popperInfo: { show },
    showTimeStop,
    timeToStop,
    warningModal: { show: warningShow },
    showLogin,
    showComment,
    title,
    listSong,
    indexValidSongs,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
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
    fetchHomeData();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, "users/" + user.uid);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data?.profile_picture) {
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
    dispatch(actions.setPlaying(false));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "infoCurrent",
      JSON.stringify({
        idCurrentSong,
        currentAlbum,
        currentSinger,
        currentIndexSong,
        songCurrentTime,
        currentSong,
        song,
        listSong,
        indexValidSongs,
      })
    );
  }, [
    idCurrentSong,
    currentAlbum,
    currentSinger,
    currentIndexSong,
    songCurrentTime,
    currentSong,
    song,
    listSong,
    indexValidSongs,
  ]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  if (loading) {
    return <Loading loadFull={true} />;
  }

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
            path={"/*"}
            element={
              <GlobalLayout>
                <Home />
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
          <Route
            path={"/Album/:id"}
            element={
              <GlobalLayout>
                <Album />
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
            path={"/Search/:Keyword"}
            element={
              <GlobalLayout>
                <Search />
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
            path={"/ListMV"}
            element={
              <GlobalLayout>
                <ListMV />
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
            path={"/SearchMobile"}
            element={
              <GlobalLayout>
                <SearchMobile />
              </GlobalLayout>
            }
          ></Route>
          <Route path={"/error"} element={<Error />}></Route>
        </Routes>
        <Lyric />
        {/* {showComment.show && <CommentModal />}
        {showLogin && <LogInModal />}
        {warningShow && <WarningModal />}
        {timeToStop > 0 && <TimeStopNote />}
        {showTimeStop && <SetTimeModal />}
        {idCurrentSong && <Playlists />}
        {idCurrentSong && <Player />} */}
        {/* {show && <Popper />} */}
      </div>
      <ToastContainer autoClose={3000} />
    </GlobalStyles>
  );
}
export default App;
