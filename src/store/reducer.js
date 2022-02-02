const initState = {
  loading: true,
  page: 1,
  data: [],
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
  lastest: localStorage.getItem("lastest") || [],
  activeSearch: false,
  warning: {
    show: false,
    msg: "",
  },
};

const getRandomIndex = (arr, index) => {
  const indexRD = Math.floor(Math.random() * (arr.length - 1));
  if (indexRD === index) {
    return getRandomIndex(arr, index);
  }
  return indexRD;
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
      return {
        ...state,
        data: [...state.data, ...action.payLoad],
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
      let newCurrentIndex = indexArr[0];
      let newSong = items[newCurrentIndex];
      if (randomSong) {
        const indexRd = getRandomIndex(indexArr, currentIndexSong);
        newCurrentIndex = indexArr[indexRd];
        newSong = items[newCurrentIndex];
      }

      lastest.push(album);
      localStorage.setItem("lastest", lastest);
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
