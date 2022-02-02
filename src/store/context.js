import React, { useState } from "react";
import reducer from "./reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

export const AppProvider = ({ children }) => {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  // const [loadingPage, setLoadingPage] = useState(true);
  // const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const [nextPage, setNextPage] = useState(false);
  // const [scroll, setScroll] = useState(true);
  // const [blackHeader, setBlackHeader] = useState(false);
  // const [album, setAlbum] = useState({});
  // const [listSong, setListSong] = useState([]);
  // const [indexValidSongs, setIndexValidSongs] = useState([]);
  // const [currentSong, setCurrentSong] = useState({});
  // const [currentIndexSong, setCurrentIndexSong] = useState(0);
  // const [randomSong, setRandomSong] = useState(false);
  // const [repeatSong, setRepeatSong] = useState(0);
  // const [song, setSong] = useState({});
  // const [songCurrentTime, setSongCurrentTime] = useState(0);
  // const [songLoading, setSongLoading] = useState(true);
  // const [showLyric, setShowLyric] = useState(false);
  // const [invi, setInvi] = useState(false);

  // const getSong = (action, payLoad) => {
  //   const valid = (statusSong, isWorldWide) => {
  //     if (statusSong === 1 && isWorldWide) {
  //       return true;
  //     }
  //     return false;
  //   };
  //   if (repeatSong === 1) {
  //     return currentSong;
  //   } else {
  //     switch (action) {
  //       case "setAlbum": {
  //         if (album.encodeId !== currentAlbum || !currentAlbum) {
  //           const {
  //             encodeId,
  //             song: { items },
  //           } = album;
  //           setCurrentAlbum(encodeId);
  //           setListSong(items);
  //         }
  //         break;
  //       }
  //       case "playAlbum": {
  //         if (currentAlbum !== album.encodeId) {
  //           getSong("setAlbum");
  //           const {
  //             song: { items },
  //           } = album;
  //           const indexArr = [];
  //           items.forEach((item, index) => {
  //             const { streamingStatus: statusSong, isWorldWide } = item;
  //             if (statusSong === 1 && isWorldWide) {
  //               indexArr.push(index);
  //             }
  //           });
  //           if (randomSong) {
  //             const indexRD = Math.floor(Math.random() * indexArr.length);
  //             setCurrentSong(items[indexArr[indexRD]]);
  //             setCurrentIndexSong(indexArr[indexRD]);
  //           } else {
  //             setCurrentSong(items[indexArr[0]]);
  //             setCurrentIndexSong(indexArr[0]);
  //           }
  //           setPlaying(true);
  //         } else if (currentAlbum === album.encodeId && !playing) {
  //           setPlaying(true);
  //         }
  //         // else if (playing && album.encodeId !== currentAlbum) {
  //         //   getSong("setAlbum");
  //         // }
  //         break;
  //       }
  //       case "next": {
  //         if (randomSong) {
  //           const validIndex = Math.floor(
  //             Math.random() * indexValidSongs.length
  //           );
  //           if (currentIndexSong === indexValidSongs[validIndex]) {
  //             setCurrentIndexSong(indexValidSongs[validIndex + 1]);
  //           } else {
  //             setCurrentIndexSong(indexValidSongs[validIndex]);
  //           }
  //         } else {
  //           const currentIndex = indexValidSongs.findIndex(
  //             (item) => item === currentIndexSong
  //           );
  //           setCurrentIndexSong(() => indexValidSongs[currentIndex + 1]);
  //         }
  //         if (repeatSong === 1) {
  //           setRepeatSong(0);
  //         }
  //         break;
  //       }
  //       case "back": {
  //         if (randomSong) {
  //           const validIndex = Math.floor(
  //             Math.random() * indexValidSongs.length
  //           );
  //           if (currentIndexSong === indexValidSongs[validIndex]) {
  //             setCurrentIndexSong(indexValidSongs[validIndex + 1]);
  //           } else {
  //             setCurrentIndexSong(indexValidSongs[validIndex]);
  //           }
  //         } else {
  //           const currentIndex = indexValidSongs.findIndex(
  //             (item) => item === currentIndexSong
  //           );
  //           setCurrentIndexSong(() => indexValidSongs[currentIndex - 1]);
  //         }
  //         if (repeatSong === 1) {
  //           setRepeatSong(0);
  //         }
  //         break;
  //       }
  //       case "autoNextSong": {
  //         let newIndexSong;
  //         if (repeatSong === 1) {
  //           newIndexSong = currentIndexSong;
  //           setCurrentIndexSong(() => newIndexSong);
  //         } else if (repeatSong === 0) {
  //           if (randomSong) {
  //             const validIndex = Math.floor(
  //               Math.random() * indexValidSongs.length
  //             );
  //             if (currentIndexSong === indexValidSongs[validIndex]) {
  //               setCurrentIndexSong(() => indexValidSongs[validIndex + 1]);
  //             } else {
  //               setCurrentIndexSong(indexValidSongs[validIndex]);
  //             }
  //           } else {
  //             const currentIndex = indexValidSongs.findIndex(
  //               (item) => item === currentIndexSong
  //             );
  //             setCurrentIndexSong(() => indexValidSongs[currentIndex + 1]);
  //           }
  //         }
  //         break;
  //       }
  //       case "playSingleSong": {
  //         if (album.encodeId !== currentAlbum) {
  //           getSong("setAlbum");
  //           const {
  //             song: { items },
  //           } = album;
  //           const newSong = items.filter((item, index) => {
  //             return index === payLoad;
  //           });
  //           const { streamingStatus: statusSong, isWorldWide } = newSong[0];
  //           if (valid(statusSong, isWorldWide)) {
  //             // setCurrentSong(newSong[0]);
  //             setCurrentIndexSong(payLoad);
  //             setPlaying(true);
  //           }
  //         } else if (album.encodeId === currentAlbum) {
  //           if (currentIndexSong === payLoad) {
  //             setPlaying(!playing);
  //           } else {
  //             if (indexValidSongs.includes(payLoad)) {
  //               setCurrentIndexSong(payLoad);
  //               setPlaying(true);
  //             }
  //           }
  //         }
  //         break;
  //       }
  //       default:
  //         break;
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const indexArr = [];
  //   listSong.forEach((item, index) => {
  //     const { streamingStatus: statusSong, isWorldWide } = item;
  //     if (statusSong === 1 && isWorldWide) {
  //       indexArr.push(index);
  //     }
  //   });
  //   setIndexValidSongs(indexArr);
  // }, [listSong]);

  // useEffect(()=>{
  //   const newArrSort=indexValidSongs.sort((a,b)=>a-b);
  //   setIndexValidSongs(indexValidSongs);
  // },[indexValidSongs])

  // useEffect(() => {
  //   if (listSong.length > 0) {
  //     setCurrentSong(listSong[currentIndexSong]);
  //   }
  // }, [currentIndexSong]);

  // useEffect(() => {
  //   if (!nextPage) return;
  //   setPage(page + 1);
  // }, [nextPage]);

  // useEffect(() => {
  //   fetchHomeDataNextPage();
  // }, [page]);

  return <Provider store={store}>{children}</Provider>;
};

// useGlobalAppContext

// export const useGlobalAppContext = () => {
//   return useContext(AppContext);
// };
