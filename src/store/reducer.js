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
  randomSong: false,
  repeatSong: 0,
  songLoading: true,
  song: {},
  songCurrentTime: 0,
  showLyric: false,
  invi: false,
  fetchSong: false,
  lastest: lastestStorage(),
  activeSearch: false,
  warning: {
    show: false,
    msg: "",
  },
  singer: {},
  currentSinger: "",
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
    case "SET_CURRENT_NAV": {
      return {
        ...state,
        currentNav: action.payLoad,
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
    case "PLAY_SONG_SAME_SINGER": {
      const { singer } = state;
      return {
        ...state,
      };
    }
    case "PLAY_SONG_ANOTHER_SINGER": {
      const { singer } = state;
      console.log(singer);
      const newListSong = Array.from([...singer.sections[0].items]);

      const indexArr = [];
      newListSong.forEach((item, index) => {
        const { streamingStatus: statusSong, isWorldWide } = item;
        if (statusSong === 1 && isWorldWide) {
          indexArr.push(index);
        }
      });
      if (indexArr.includes(action.payLoad)) {
        return {
          ...state,
          currentAlbum: "",
          currentSinger: singer.alias,
          indexValidSongs: indexArr,
          listSong: newListSong,
          currentIndexSong: action.payLoad,
          currentSong: newListSong[action.payLoad],
          fetchSong: true,
          showLyric: true,
        };
      } else {
        return {
          ...state,
          warning: {
            show: true,
            msg: "Bài hát này chưa được hỗ trợ",
          },
        };
      }
      return {
        ...state,
        // currentSinger: action.payLoad,
      };
    }
    case "PLAY_SONG_SAME_ALBUM": {
      const { indexValidSongs, listSong } = state;
      if (indexValidSongs.includes(action.payLoad)) {
        return {
          ...state,
          currentSong: listSong[action.payLoad],
          currentIndexSong: action.payLoad,
          fetchSong: true,
        };
      } else {
        return {
          ...state,
          warning: {
            show: true,
            msg: "Bài hát này chưa được hỗ trợ",
          },
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
      items.forEach((item, index) => {
        const { streamingStatus: statusSong, isWorldWide } = item;
        if (statusSong === 1 && isWorldWide) {
          indexArr.push(index);
        }
      });
      if (indexArr.includes(action.payLoad)) {
        return {
          ...state,
          currentAlbum: encodeId,
          indexValidSongs: indexArr,
          listSong: items,
          currentIndexSong: action.payLoad,
          currentSong: items[action.payLoad],
          fetchSong: true,
          showLyric: true,
        };
      } else {
        return {
          ...state,
          warning: {
            show: true,
            msg: "Bài hát này chưa được hỗ trợ",
          },
        };
      }
    }
    case "PLAY_NEXT_SONG_AUTO": {
      const {
        repeatSong,
        randomSong,
        indexValidSongs,
        currentIndexSong,
        listSong,
      } = state;
      if (repeatSong === 1) {
        const newSong = listSong[currentIndexSong];
        const newIndex = currentIndexSong;

        return {
          ...state,
          currentSong: newSong,
          currentIndexSong: newIndex,
          fetchSong: true,
        };
      } else {
        if (randomSong) {
          const indexRd = getRandomIndex(indexValidSongs, currentIndexSong);
          return {
            ...state,
            currentSong: listSong[indexValidSongs[indexRd]],
            currentIndexSong: indexRd,
            fetchSong: true,
          };
        } else {
          const currentIndex = indexValidSongs.findIndex(
            (item) => item === currentIndexSong
          );
          if (currentIndex === indexValidSongs.length - 1) {
            if (repeatSong === 0) {
              return {
                ...state,
                playing: false,
              };
            }
            if (repeatSong === 2) {
              return {
                ...state,
                currentSong: listSong[indexValidSongs[0]],
                currentIndexSong: indexValidSongs[0],
                fetchSong: true,
              };
            }
          } else {
            return {
              ...state,
              currentSong: listSong[indexValidSongs[currentIndex + 1]],
              currentIndexSong: indexValidSongs[currentIndex + 1],
              fetchSong: true,
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
      } = state;
      if (randomSong) {
        const indexRd = getRandomIndex(indexValidSongs, currentIndexSong);
        return {
          ...state,
          currentSong: listSong[indexValidSongs[indexRd]],
          currentIndexSong: indexRd,
          fetchSong: true,
        };
      } else {
        const currentIndex = indexValidSongs.findIndex(
          (item) => item === currentIndexSong
        );
        if (currentIndex === indexValidSongs.length - 1) {
          if (repeatSong === 1) {
            return {
              ...state,
              currentSong: listSong[indexValidSongs[0]],
              currentIndexSong: indexValidSongs[0],
              fetchSong: true,
              repeatSong: 0,
            };
          } else {
            return {
              ...state,
              currentSong: listSong[indexValidSongs[0]],
              currentIndexSong: indexValidSongs[0],
              fetchSong: true,
            };
          }
        } else {
          if (repeatSong === 1) {
            return {
              ...state,
              currentSong: listSong[indexValidSongs[currentIndex + 1]],
              currentIndexSong: indexValidSongs[currentIndex + 1],
              fetchSong: true,
              repeatSong: 0,
            };
          }
          return {
            ...state,
            currentSong: listSong[indexValidSongs[currentIndex + 1]],
            currentIndexSong: indexValidSongs[currentIndex + 1],
            fetchSong: true,
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
      } = state;
      if (randomSong) {
        const indexRd = getRandomIndex(indexValidSongs, currentIndexSong);
        if (repeatSong === 1) {
          return {
            ...state,
            currentSong: listSong[indexValidSongs[indexRd]],
            currentIndexSong: indexRd,
            fetchSong: true,
            repeatSong: 0,
          };
        }
        return {
          ...state,
          currentSong: listSong[indexValidSongs[indexRd]],
          currentIndexSong: indexRd,
          fetchSong: true,
        };
      } else {
        const currentIndex = indexValidSongs.findIndex(
          (item) => item === currentIndexSong
        );
        if (repeatSong === 1) {
          return {
            ...state,
            currentSong: listSong[indexValidSongs[currentIndex - 1]],
            currentIndexSong: indexValidSongs[currentIndex - 1],
            fetchSong: true,
            repeatSong: 0,
          };
        }
        return {
          ...state,
          currentSong: listSong[indexValidSongs[currentIndex - 1]],
          currentIndexSong: indexValidSongs[currentIndex - 1],
          fetchSong: true,
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
      items.forEach((item, index) => {
        const { streamingStatus: statusSong, isWorldWide } = item;
        if (statusSong === 1 && isWorldWide) {
          indexArr.push(index);
        }
      });
      if (indexArr.length === 0) {
        return {
          ...state,
          warning: {
            show: true,
            msg: "Album này chưa được hỗ trợ",
          },
        };
      }
      let newCurrentIndex = indexArr[0];
      let newSong = items[newCurrentIndex];
      if (randomSong) {
        const indexRd = getRandomIndex(indexArr, currentIndexSong);
        newCurrentIndex = indexArr[indexRd];
        newSong = items[newCurrentIndex];
      }

      if (!getValidLastest(lastest, album)) {
        lastest.unshift(album);
        localStorage.setItem("lastest", JSON.stringify(lastest));
      }

      return {
        ...state,
        currentIndexSong: newCurrentIndex,
        currentSong: newSong,
        currentAlbum: encodeId,
        listSong: items,
        playing: true,
        indexValidSongs: indexArr,
        showLyric: true,
        fetchSong: true,
      };
    }

    default:
      return state;
  }
};

export default reducer;
