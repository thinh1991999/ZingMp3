import { toast } from "react-toastify";
const lastestStorage = () => {
  const data = JSON.parse(JSON.stringify(localStorage.getItem("lastest")));
  if (typeof data !== "object") {
    return [];
  }
  return data;
};

const initState = {
  loading: true,
  page: 1,
  data: [],
  currentNav: 1,
  currentAlbum: "",
  playing: false,
  blackHeader: false,
  scroll: true,
  loadingHome: true,
  nextPage: false,
  album: {},
  listSong: [],
  indexValidSongs: [],
  currentSong: {},
  currentIndexSong: null,
  idCurrentSong: "",
  randomSong: false,
  repeatSong: 0,
  songLoading: true,
  song: {},
  songCurrentTime: 0,
  showLyric: false,
  showPlayLists: false,
  invi: false,
  fetchSong: false,
  lastest: lastestStorage(),
  activeSearch: false,
  singer: {},
  currentSinger: "",
  showNavMobile: false,
  btnMobile: null,
  popperInfo: {
    show: false,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    position: "",
  },
  popperMess: "",
  currentChart: "",
  timeToStop: 0,
  showTimeStop: false,
  warningModal: {
    show: false,
    type: "",
  },
};

const getRandomIndex = (arr, index) => {
  const indexRD = Math.floor(Math.random() * (arr.length - 1));
  if (indexRD === index) {
    return getRandomIndex(arr, index);
  }
  return indexRD;
};

const getValidLastest = (arr, hint) => {
  let valid = false;
  arr.forEach((item) => {
    if (item.encodeId === hint.encodeId) {
      valid = true;
    }
  });
  return valid;
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LOADING": {
      return {
        ...state,
        loading: false,
      };
    }
    case "SET_DATA": {
      const { lastest, data } = state;
      const newData = Array.from([...data, ...action.payLoad]);
      newData[2].items = lastest;

      return {
        ...state,
        data: Array.from([...newData]),
      };
    }
    case "SET_BG_HEADER": {
      return {
        ...state,
        blackHeader: action.payLoad,
      };
    }
    case "SET_SCROLL": {
      return {
        ...state,
        scroll: action.payLoad,
      };
    }
    case "SET_POPPER_INFO": {
      return {
        ...state,
        popperInfo: action.payLoad,
      };
    }
    case "SET_POPPER_MESS": {
      return {
        ...state,
        popperMess: action.payLoad,
      };
    }
    case "SET_CURRENT_NAV": {
      return {
        ...state,
        currentNav: action.payLoad,
      };
    }
    case "SET_SHOW_NAV_MOBILE": {
      return {
        ...state,
        showNavMobile: action.payLoad,
      };
    }
    case "SET_BTN_MOBILE": {
      return {
        ...state,
        btnMobile: action.payLoad,
      };
    }
    case "SET_LOADING_HOME": {
      return {
        ...state,
        loadingHome: action.payLoad,
      };
    }
    case "SET_NEXT_PAGE_HOME": {
      return {
        ...state,
        nextPage: action.payLoad,
      };
    }
    case "SET_PAGE": {
      return {
        ...state,
        page: action.payLoad,
      };
    }
    case "SET_ALBUM": {
      return {
        ...state,
        album: action.payLoad,
      };
    }
    case "SET_CURRENT_ALBUM": {
      return {
        ...state,
        currentAlbum: action.payLoad,
      };
    }
    case "SET_PLAYING": {
      return {
        ...state,
        playing: action.payLoad,
      };
    }
    case "SET_SONG": {
      return {
        ...state,
        song: action.payLoad,
      };
    }
    case "SET_SONG_LOADING": {
      return {
        ...state,
        songLoading: action.payLoad,
      };
    }
    case "SET_SONG_CURRENT_TIME": {
      return {
        ...state,
        songCurrentTime: action.payLoad,
      };
    }
    case "SET_REPEAT_SONG": {
      return {
        ...state,
        repeatSong: action.payLoad,
      };
    }
    case "SET_RANDOM_SONG": {
      return {
        ...state,
        randomSong: action.payLoad,
      };
    }
    case "SET_SHOW_LYRIC": {
      return {
        ...state,
        showLyric: action.payLoad,
        showPlayLists: false,
      };
    }
    case "SET_SHOW_TIME_STOP": {
      return {
        ...state,
        showTimeStop: action.payLoad,
      };
    }
    case "SET_SHOW_PLAY_LISTS": {
      return {
        ...state,
        showPlayLists: action.payLoad,
      };
    }
    case "SET_WARNING_MODAL": {
      return {
        ...state,
        warningModal: action.payLoad,
      };
    }
    case "CLEAR_PLAY_LIST": {
      return {
        ...state,
        idCurrentSong: "",
        listSong: [],
        currentIndexSong: null,
        currentSinger: "",
        currentAlbum: "",
        currentSong: {},
        playing: false,
        songCurrentTime: 0,
      };
    }
    case "SET_INVI": {
      return {
        ...state,
        invi: action.payLoad,
      };
    }
    case "SET_ACTIVE_SEARCH": {
      return {
        ...state,
        activeSearch: action.payLoad,
      };
    }
    case "SET_WARNING": {
      return {
        ...state,
        warning: Object.assign({}, action.payLoad),
      };
    }
    case "SET_FETCH_SONG": {
      return {
        ...state,
        fetchSong: action.payLoad,
      };
    }
    case "SET_SINGER": {
      return {
        ...state,
        singer: Object.assign({}, action.payLoad),
      };
    }
    case "SET_CURRENT_SINGER": {
      return {
        ...state,
        currentSinger: action.payLoad,
      };
    }
    case "PLAY_SINGER": {
      const { singer } = state;
      const newListSong = Array.from([...singer.sections[0].items]);
      const indexArr = [];
      newListSong.forEach((item) => {
        const { encodeId, streamingStatus: statusSong } = item;
        if (statusSong === 1) {
          indexArr.push(encodeId);
        }
      });

      const newSong = newListSong.filter((item) => {
        const { encodeId } = item;
        return encodeId === indexArr[0];
      })[0];

      const newIndex = newListSong.findIndex((item) => {
        const { encodeId } = item;
        return encodeId === indexArr[0];
      });

      if (indexArr.length === 0) {
        toast.error("List nhạc không có bài được hỗ trợ");
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          currentIndexSong: newIndex,
          currentSong: newSong,
          currentSinger: singer.alias,
          idCurrentSong: indexArr[0],
          currentAlbum: "",
          listSong: newListSong,
          playing: true,
          indexValidSongs: indexArr,
          showLyric: true,
          fetchSong: true,
          randomSong: false,
        };
      }
    }
    case "PLAY_SONG_SAME_SINGER": {
      const { indexValidSongs, listSong } = state;

      const indexCurrent = listSong.findIndex(
        (item) => item.encodeId === action.payLoad
      );

      if (indexValidSongs.includes(action.payLoad)) {
        return {
          ...state,
          idCurrentSong: action.payLoad,
          currentSong: listSong.filter(
            (item) => item.encodeId === action.payLoad
          )[0],
          currentIndexSong: indexCurrent,
          fetchSong: true,
        };
      } else {
        toast.error("Bài hát này chưa được hỗ trợ!");
        return {
          ...state,
        };
      }
    }
    case "PLAY_SONG_ANOTHER_SINGER": {
      const { singer } = state;
      const newListSong = Array.from([...singer.sections[0].items]);

      const indexArr = [];
      newListSong.forEach((item) => {
        const { encodeId, streamingStatus: statusSong } = item;
        if (statusSong === 1) {
          indexArr.push(encodeId);
        }
      });

      const newSong = newListSong.filter((item) => {
        const { encodeId } = item;
        return encodeId === action.payLoad;
      })[0];

      const newIndex = newListSong.findIndex((item) => {
        const { encodeId } = item;
        return encodeId === action.payLoad;
      });

      if (indexArr.includes(action.payLoad)) {
        return {
          ...state,
          currentAlbum: "",
          idCurrentSong: action.payLoad,
          currentSinger: singer.alias,
          indexValidSongs: indexArr,
          listSong: newListSong,
          currentIndexSong: newIndex,
          currentSong: newSong,
          fetchSong: true,
          showLyric: true,
        };
      } else {
        toast.error('"Bài hát này chưa được hỗ trợ"');
        return {
          ...state,
        };
      }
    }
    case "PLAY_SONG_SAME_ALBUM": {
      const { indexValidSongs, listSong } = state;
      const indexCurrent = listSong.findIndex(
        (item) => item.encodeId === action.payLoad
      );

      if (indexValidSongs.includes(action.payLoad)) {
        return {
          ...state,
          idCurrentSong: action.payLoad,
          currentSong: listSong.filter(
            (item) => item.encodeId === action.payLoad
          )[0],
          currentIndexSong: indexCurrent,
          fetchSong: true,
        };
      } else {
        toast.error("Bài hát này chưa được hỗ trợ!");
        return {
          ...state,
        };
      }
    }
    case "PLAY_SONG_ANOTHER_ALBUM": {
      const { album } = state;
      const {
        encodeId,
        song: { items },
      } = album;
      const indexArr = [];
      items.forEach((item) => {
        const { encodeId, streamingStatus: statusSong } = item;
        if (statusSong === 1) {
          indexArr.push(encodeId);
        }
      });
      const indexCurrent = items.findIndex(
        (item) => item.encodeId === action.payLoad
      );

      if (indexArr.includes(action.payLoad)) {
        return {
          ...state,
          currentAlbum: encodeId,
          indexValidSongs: indexArr,
          idCurrentSong: action.payLoad,
          listSong: items,
          currentIndexSong: indexCurrent,
          currentSong: items.filter(
            (item) => item.encodeId === action.payLoad
          )[0],
          fetchSong: true,
          showLyric: true,
          currentSinger: "",
        };
      } else {
        toast.error("Bài hát này chưa được hỗ trợ!");
        return {
          ...state,
        };
      }
    }
    case "PLAY_SONG_ANOTHER_CHART_HOME": {
      const { id, album, items } = action.payLoad;
      const indexArr = [];
      items.forEach((item) => {
        const { encodeId, streamingStatus: statusSong } = item;
        if (statusSong === 1) {
          indexArr.push(encodeId);
        }
      });
      if (indexArr.includes(id)) {
        const newIndex = items.findIndex((item) => item.encodeId === id);
        const newSong = items.filter((item) => {
          const { encodeId } = item;
          return encodeId === id;
        })[0];
        return {
          ...state,
          currentAlbum: album,
          indexValidSongs: indexArr,
          idCurrentSong: id,
          listSong: items,
          currentIndexSong: newIndex,
          currentSong: newSong,
          fetchSong: true,
          showLyric: true,
          currentSinger: "",
        };
      } else {
        toast.error("Bài hát này chưa được hỗ trợ!");
        return {
          ...state,
        };
      }
    }
    case "SET_SONG_CURRENT_INFO": {
      const {
        encodeId,
        album: { encodeId: idAlbum },
      } = action.payLoad;
      return {
        ...state,
        currentAlbum: idAlbum,
        idCurrentSong: encodeId,
        currentSong: action.payLoad,
        fetchSong: true,
        showLyric: true,
        currentSinger: "",
      };
    }
    case "SET_LIST_SONG": {
      const { idCurrentSong } = state;
      const indexArr = [];
      action.payLoad.forEach((item) => {
        const { encodeId, streamingStatus: statusSong } = item;
        if (statusSong === 1) {
          indexArr.push(encodeId);
        }
      });
      const newIndex = action.payLoad.findIndex((item) => {
        const { encodeId } = item;
        return encodeId === idCurrentSong;
      });
      console.log(newIndex);
      console.log(indexArr);
      return {
        ...state,
        indexValidSongs: indexArr,
        listSong: action.payLoad,
        currentIndexSong: newIndex,
      };
    }
    case "PLAY_NEXT_SONG_AUTO": {
      const {
        repeatSong,
        randomSong,
        indexValidSongs,
        currentIndexSong,
        listSong,
        idCurrentSong,
      } = state;
      if (repeatSong === 1) {
        const newSong = listSong.filter((item) => {
          const { encodeId } = item;
          return encodeId === idCurrentSong;
        })[0];

        const newIndex = listSong.findIndex((item) => {
          const { encodeId } = item;
          return encodeId === idCurrentSong;
        });

        return {
          ...state,
          idCurrentSong: idCurrentSong,
          currentSong: newSong,
          currentIndexSong: newIndex,
          fetchSong: true,
        };
      } else {
        if (randomSong) {
          const indexRd = getRandomIndex(indexValidSongs, currentIndexSong);

          const newSong = listSong.filter((item) => {
            const { encodeId } = item;
            return encodeId === indexValidSongs[indexRd];
          })[0];

          const newIndex = listSong.findIndex((item) => {
            const { encodeId } = item;
            return encodeId === indexValidSongs[indexRd];
          });

          return {
            ...state,
            currentSong: newSong,
            currentIndexSong: newIndex,
            idCurrentSong: indexValidSongs[indexRd],
            fetchSong: true,
          };
        } else {
          const currentIndex = indexValidSongs.findIndex(
            (item) => item === idCurrentSong
          );

          if (currentIndex === indexValidSongs.length - 1) {
            if (repeatSong === 0) {
              return {
                ...state,
                playing: false,
              };
            }
            if (repeatSong === 2) {
              const newSong = listSong.filter((item) => {
                const { encodeId } = item;
                return encodeId === indexValidSongs[0];
              })[0];

              const newIndex = listSong.findIndex((item) => {
                const { encodeId } = item;
                return encodeId === indexValidSongs[0];
              });

              return {
                ...state,
                currentSong: newSong,
                currentIndexSong: newIndex,
                idCurrentSong: indexValidSongs[0],
                fetchSong: true,
              };
            }
          } else {
            const newSong = listSong.filter((item) => {
              const { encodeId } = item;
              return encodeId === indexValidSongs[currentIndex + 1];
            })[0];

            const newIndex = listSong.findIndex((item) => {
              const { encodeId } = item;
              return encodeId === indexValidSongs[currentIndex + 1];
            });

            return {
              ...state,
              currentSong: newSong,
              currentIndexSong: newIndex,
              fetchSong: true,
              idCurrentSong: indexValidSongs[currentIndex + 1],
            };
          }
        }
      }
    }
    case "PLAY_NEXT_SONG": {
      const {
        randomSong,
        currentIndexSong,
        indexValidSongs,
        listSong,
        repeatSong,
        idCurrentSong,
      } = state;
      if (randomSong) {
        const indexRd = getRandomIndex(indexValidSongs, currentIndexSong);
        const newSong = listSong.filter((item) => {
          const { encodeId } = item;
          return encodeId === indexValidSongs[indexRd];
        })[0];

        const newIndex = listSong.findIndex((item) => {
          const { encodeId } = item;
          return encodeId === indexValidSongs[indexRd];
        });

        return {
          ...state,
          currentSong: newSong,
          currentIndexSong: newIndex,
          fetchSong: true,
          idCurrentSong: indexValidSongs[indexRd],
        };
      } else {
        const currentIndex = indexValidSongs.findIndex(
          (item) => item === idCurrentSong
        );
        if (currentIndex === indexValidSongs.length - 1) {
          const song = listSong.filter((item) => {
            const { encodeId } = item;
            return encodeId === indexValidSongs[0];
          })[0];

          const newIndex = listSong.findIndex((item) => {
            const { encodeId } = item;
            return encodeId === indexValidSongs[0];
          });

          if (repeatSong === 1) {
            return {
              ...state,
              currentSong: song,
              currentIndexSong: newIndex,
              fetchSong: true,
              repeatSong: 0,
              idCurrentSong: indexValidSongs[0],
            };
          } else {
            return {
              ...state,
              currentSong: song,
              currentIndexSong: newIndex,
              fetchSong: true,
              idCurrentSong: indexValidSongs[0],
            };
          }
        } else {
          const song = listSong.filter((item) => {
            const { encodeId } = item;
            return encodeId === indexValidSongs[currentIndex + 1];
          })[0];

          const newIndex = listSong.findIndex((item) => {
            const { encodeId } = item;
            return encodeId === indexValidSongs[currentIndex + 1];
          });

          if (repeatSong === 1) {
            return {
              ...state,
              currentSong: song,
              currentIndexSong: newIndex,
              fetchSong: true,
              repeatSong: 0,
              idCurrentSong: indexValidSongs[currentIndex + 1],
            };
          }
          return {
            ...state,
            currentSong: song,
            currentIndexSong: newIndex,
            fetchSong: true,
            idCurrentSong: indexValidSongs[currentIndex + 1],
          };
        }
      }
    }
    case "PLAY_BACK_SONG": {
      const {
        randomSong,
        currentIndexSong,
        indexValidSongs,
        listSong,
        repeatSong,
        idCurrentSong,
      } = state;
      if (randomSong) {
        const indexRd = getRandomIndex(indexValidSongs, currentIndexSong);

        const newSong = listSong.filter((item) => {
          const { encodeId } = item;
          return encodeId === indexValidSongs[indexRd];
        })[0];

        const newIndex = listSong.findIndex((item) => {
          const { encodeId } = item;
          return encodeId === indexValidSongs[indexRd];
        });

        if (repeatSong === 1) {
          return {
            ...state,
            currentSong: newSong,
            currentIndexSong: newIndex,
            fetchSong: true,
            repeatSong: 0,
            idCurrentSong: indexValidSongs[indexRd],
          };
        }
        return {
          ...state,
          currentSong: newSong,
          currentIndexSong: newIndex,
          fetchSong: true,
          idCurrentSong: indexValidSongs[indexRd],
        };
      } else {
        const currentIndex = indexValidSongs.findIndex(
          (item) => item === idCurrentSong
        );

        const newSong = listSong.filter((item) => {
          const { encodeId } = item;
          return encodeId === indexValidSongs[currentIndex - 1];
        })[0];

        const newIndex = listSong.findIndex((item) => {
          const { encodeId } = item;
          return encodeId === indexValidSongs[currentIndex - 1];
        });

        if (repeatSong === 1) {
          return {
            ...state,
            currentSong: newSong,
            currentIndexSong: newIndex,
            fetchSong: true,
            repeatSong: 0,
            idCurrentSong: indexValidSongs[currentIndex - 1],
          };
        }
        return {
          ...state,
          currentSong: newSong,
          currentIndexSong: newIndex,
          fetchSong: true,
          idCurrentSong: indexValidSongs[currentIndex - 1],
        };
      }
    }
    case "PLAY_ALBUM": {
      const { album, randomSong, currentIndexSong, lastest } = state;
      const {
        encodeId,
        song: { items },
      } = album;
      const indexArr = [];
      let newCurrentIndex = 0;
      let newIdSong = "";
      items.forEach((item, index) => {
        const { encodeId, streamingStatus: statusSong } = item;
        if (statusSong === 1) {
          indexArr.push(encodeId);
        }
      });
      if (indexArr.length === 0) {
        toast.error("Album này chưa được hỗ trợ");
        return {
          ...state,
        };
      }
      let newSong = items.filter((item) => {
        const { encodeId } = item;
        return encodeId === indexArr[0];
      })[0];
      newIdSong = indexArr[0];
      if (randomSong) {
        const indexRd = getRandomIndex(indexArr, currentIndexSong);
        newIdSong = indexArr[indexRd];
        newSong = items.filter((item) => {
          const { encodeId } = item;
          return encodeId === newIdSong;
        })[0];
        newCurrentIndex = items.findIndex((item) => {
          const { encodeId } = item;
          return encodeId === newIdSong;
        });
      }

      if (!getValidLastest(lastest, album)) {
        lastest.unshift(album);
        localStorage.setItem("lastest", JSON.stringify(lastest));
      }

      return {
        ...state,
        currentIndexSong: newCurrentIndex,
        currentSong: newSong,
        idCurrentSong: newIdSong,
        currentAlbum: encodeId,
        listSong: items,
        playing: true,
        indexValidSongs: indexArr,
        showLyric: true,
        fetchSong: true,
        currentSinger: "",
      };
    }
    case "SET_TIME_TO_STOP": {
      return {
        ...state,
        timeToStop: action.payLoad,
      };
    }

    default:
      return state;
  }
};

export default reducer;
