import { toast } from "react-toastify";
import localStorageServ from "../../Services/localStorage";
import { ultils } from "../../Share";

let infoStorageInit = localStorageServ.infoSong.get();

const initState = {
  playing: false,
  currentAlbum: infoStorageInit?.["currentAlbum"] || "",
  album: {},
  listSong: infoStorageInit?.["listSong"] || [],
  currentSong: infoStorageInit?.["currentSong"] || null,
  randomSong: true,
  repeatSong: 0,
  songLoading: false,
  song: infoStorageInit?.["song"] || {},
  songCurrentTime: infoStorageInit?.["songCurrentTime"] || 0,
  fetchSong: false,
  showLyric: false,
  showPlayLists: false,
  invi: false,
  singer: {},
  currentSinger: infoStorageInit?.["currentSinger"] || "",
  timeToStop: 0,
  showTimeStop: false,
};

export const SongReducer = (state = initState, { type, payLoad }) => {
  switch (type) {
    case "SET_ALBUM": {
      return {
        ...state,
        album: payLoad,
      };
    }
    case "SET_CURRENT_ALBUM": {
      return {
        ...state,
        currentAlbum: payLoad,
      };
    }
    case "SET_PLAYING": {
      return {
        ...state,
        playing: payLoad,
      };
    }
    case "SET_SONG": {
      return {
        ...state,
        song: payLoad,
      };
    }
    case "SET_SONG_LOADING": {
      return {
        ...state,
        songLoading: payLoad,
      };
    }
    case "SET_SONG_CURRENT_TIME": {
      return {
        ...state,
        songCurrentTime: payLoad,
      };
    }
    case "SET_REPEAT_SONG": {
      return {
        ...state,
        repeatSong: payLoad,
      };
    }
    case "SET_RANDOM_SONG": {
      return {
        ...state,
        randomSong: payLoad,
      };
    }

    case "SET_SHOW_LYRIC": {
      return {
        ...state,
        showLyric: payLoad,
        showPlayLists: false,
      };
    }
    case "SET_SHOW_TIME_STOP": {
      return {
        ...state,
        showTimeStop: payLoad,
      };
    }
    case "SET_SHOW_PLAY_LISTS": {
      return {
        ...state,
        showPlayLists: payLoad,
      };
    }
    case "CLEAR_PLAY_LIST": {
      return {
        ...state,
        listSong: [],
        currentAlbum: "",
        currentSong: null,
        playing: false,
        songCurrentTime: 0,
      };
    }
    case "SET_FETCH_SONG": {
      return {
        ...state,
        fetchSong: payLoad,
      };
    }
    case "SET_SINGER": {
      return {
        ...state,
        singer: Object.assign({}, payLoad),
      };
    }
    case "SET_CURRENT_SINGER": {
      return {
        ...state,
        currentSinger: payLoad,
      };
    }

    case "PLAY_SONG_SAME_SINGER": {
      const { indexValidSongs, listSong } = state;

      const indexCurrent = listSong.findIndex(
        (item) => item.encodeId === payLoad
      );

      if (indexValidSongs.includes(payLoad)) {
        return {
          ...state,
          idCurrentSong: payLoad,
          currentSong: listSong.filter((item) => item.encodeId === payLoad)[0],
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

    case "PLAY_SONG_ANOTHER_CHART_HOME": {
      const { song, album, items } = payLoad;
      if (song) {
        return {
          ...state,
          currentAlbum: album,
          listSong: items,
          currentSong: song,
          fetchSong: true,
          currentSinger: "",
        };
      }
      return {
        ...state,
        currentAlbum: album,
        listSong: items,
        fetchSong: true,
        currentSinger: "",
      };
    }
    case "SET_SONG_CURRENT_INFO": {
      return {
        ...state,
        currentSong: payLoad,
      };
    }
    case "SET_LIST_SONG": {
      const { idCurrentSong } = state;
      const indexArr = [];
      payLoad.forEach((item) => {
        const { encodeId, streamingStatus: statusSong } = item;
        if (statusSong === 1) {
          indexArr.push(encodeId);
        }
      });
      const newIndex = payLoad.findIndex((item) => {
        const { encodeId } = item;
        return encodeId === idCurrentSong;
      });
      return {
        ...state,
        indexValidSongs: indexArr,
        listSong: payLoad,
        currentIndexSong: newIndex,
      };
    }
    case "PLAY_NEXT_SONG_AUTO": {
      const { repeatSong, randomSong, listSong, currentSong } = state;
      console.log(listSong);
      const validArr = ultils.getListValidIdxSong(listSong);
      if (repeatSong === 1) {
        return {
          ...state,
          currentSong: currentSong,
          fetchSong: true,
        };
      } else {
        if (randomSong) {
          const newSong = ultils.getRandomSong(listSong, currentSong, validArr);
          return {
            ...state,
            currentSong: newSong,
            fetchSong: true,
          };
        } else {
          const currentIndex = validArr.findIndex(
            (item) => item === currentSong.encodeId
          );
          if (currentIndex === validArr.length - 1) {
            if (repeatSong === 0) {
              return {
                ...state,
                playing: false,
              };
            }
            if (repeatSong === 2) {
              const newSong = listSong.filter((item) => {
                const { encodeId } = item;
                return encodeId === validArr[0];
              })[0];
              return {
                ...state,
                currentSong: newSong,
                fetchSong: true,
              };
            }
          } else {
            const newSong = listSong.filter((item) => {
              const { encodeId } = item;
              return encodeId === validArr[currentIndex + 1];
            })[0];
            return {
              ...state,
              currentSong: newSong,
              fetchSong: true,
            };
          }
        }
      }
      break;
    }
    case "PLAY_NEXT_SONG": {
      const { randomSong, listSong, repeatSong, currentSong } = state;
      const validArr = ultils.getListValidIdxSong(listSong);
      if (randomSong) {
        const newSong = ultils.getRandomSong(listSong, currentSong, validArr);
        if (repeatSong === 1) {
          return {
            ...state,
            currentSong: newSong,
            fetchSong: true,
            repeatSong: 0,
          };
        }
        return {
          ...state,
          currentSong: newSong,
          fetchSong: true,
        };
      } else {
        const currentIndex = validArr.findIndex(
          (item) => item === currentSong.encodeId
        );
        if (currentIndex === validArr.length - 1) {
          const song = listSong.filter((item) => {
            const { encodeId } = item;
            return encodeId === validArr[0];
          })[0];
          if (repeatSong === 1) {
            return {
              ...state,
              currentSong: song,
              fetchSong: true,
              repeatSong: 0,
            };
          } else {
            return {
              ...state,
              currentSong: song,
              fetchSong: true,
            };
          }
        } else {
          const song = listSong.filter((item) => {
            const { encodeId } = item;
            return encodeId === validArr[currentIndex + 1];
          })[0];
          if (repeatSong === 1) {
            return {
              ...state,
              currentSong: song,
              fetchSong: true,
              repeatSong: 0,
            };
          }
          return {
            ...state,
            currentSong: song,
            fetchSong: true,
          };
        }
      }
    }
    case "PLAY_BACK_SONG": {
      const { randomSong, listSong, repeatSong, currentSong } = state;
      const validArr = ultils.getListValidIdxSong(listSong);
      if (randomSong) {
        const newSong = ultils.getRandomSong(listSong, currentSong, validArr);
        if (repeatSong === 1) {
          return {
            ...state,
            currentSong: newSong,
            fetchSong: true,
            repeatSong: 0,
          };
        }
        return {
          ...state,
          currentSong: newSong,
          fetchSong: true,
        };
      } else {
        const currentIndex = validArr.findIndex(
          (item) => item === currentSong.encodeId
        );
        const newSong = listSong.filter((item) => {
          const { encodeId } = item;
          return encodeId === validArr[currentIndex - 1];
        })[0];

        if (repeatSong === 1) {
          return {
            ...state,
            currentSong: newSong,
            fetchSong: true,
            repeatSong: 0,
          };
        }
        return {
          ...state,
          currentSong: newSong,
          fetchSong: true,
        };
      }
    }
    case "PLAY_ALBUM": {
      const { album, currentSong } = state;
      const {
        encodeId,
        song: { items },
      } = album;
      const validArr = ultils.getListValidIdxSong(items);
      if (validArr.length === 0) {
        toast.error("Album này không có bài hát được hỗ trợ");
        return {
          ...state,
        };
      }
      const newSongInfoRD = ultils.getRandomSong(items, currentSong, validArr);
      return {
        ...state,
        currentSong: newSongInfoRD,
        currentAlbum: encodeId,
        listSong: items,
        showLyric: true,
        fetchSong: true,
        randomSong: true,
      };
    }
    case "PLAY_SONG_SAME_ALBUM": {
      return {
        ...state,
        currentSong: payLoad,
        fetchSong: true,
      };
    }
    case "PLAY_SONG_ANOTHER_ALBUM": {
      const { album } = state;
      const {
        encodeId,
        song: { items },
      } = album;

      return {
        ...state,
        currentAlbum: encodeId,
        listSong: items,
        currentSong: payLoad,
        fetchSong: true,
        showLyric: true,
        currentSinger: "",
      };
    }
    case "PLAY_NEW_SONG": {
      const { songInfo, album: albumId, items } = payLoad;
      return {
        ...state,
        currentAlbum: albumId,
        currentSong: songInfo,
        listSong: items,
        fetchSong: true,
        currentSinger: "",
      };
    }
    case "PLAY_SEARCH_SONG": {
      const { album: albumId, items } = payLoad;
      return {
        ...state,
        currentAlbum: albumId,
        listSong: items,
        currentSinger: "",
      };
    }
    case "PLAY_SINGER": {
      const { singer, currentSong } = state;
      const newListSong = singer.sections[0].items;
      const indexArrValid = ultils.getListValidIdxSong(newListSong);
      if (indexArrValid.length === 0) {
        toast.error("List nhạc không có bài được hỗ trợ");
        return {
          ...state,
        };
      }
      const newSong = ultils.getRandomSong(
        newListSong,
        currentSong,
        indexArrValid
      );
      return {
        ...state,
        currentSong: newSong,
        currentAlbum: newSong.album?.encodeId || null,
        listSong: newListSong,
        fetchSong: true,
        randomSong: true,
      };
    }
    case "PLAY_SONG_ANOTHER_SINGER": {
      const { singer } = state;
      const newListSong = Array.from([...singer.sections[0].items]);
      return {
        ...state,
        currentAlbum: payLoad?.album?.encodeId || null,
        listSong: newListSong,
        currentSong: payLoad,
        fetchSong: true,
      };
    }
    case "SET_TIME_TO_STOP": {
      return {
        ...state,
        timeToStop: payLoad,
      };
    }
    case "PLAY_SONG_AFTER_FETCH": {
      return {
        ...state,
        songCurrentTime: 0,
        song: payLoad,
        songLoading: false,
        playing: true,
        fetchSong: false,
      };
    }
    default:
      return state;
  }
};
