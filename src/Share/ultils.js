export const getHighLvSong = (id) => {
  return `http://api.mp3.zing.vn/api/streaming/audio/${id}/320`;
};

export const getTime = (value) => {
  const minute = Math.floor(value / 60);
  const second = Math.round(value % 60);
  if (minute < 10 && second < 10) {
    return `0${minute}:0${second}`;
  } else if (minute < 10) {
    return `0${minute}:${second}`;
  } else if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
};

export const getTimeTextFull = (value) => {
  let hour = Math.floor(value / 3600);
  let minute = Math.floor((value % 3600) / 60);
  let second = value - hour * 3600 - minute * 60;
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }
  return `${hour}:${minute}:${second}`;
};

export const getListValidIdxSong = (items) => {
  const indexArr = [];
  items.forEach((item) => {
    const { encodeId, streamingStatus: statusSong } = item;
    if (statusSong === 1) {
      indexArr.push(encodeId);
    }
  });
  return indexArr;
};

export const getRandomSong = (items, currentSong = null) => {
  const indexRD = Math.floor(Math.random() * (items.length - 1));
  if (
    items[indexRD].encodeId === currentSong?.encodeId ||
    items[indexRD].streamingStatus !== 1
  ) {
    return getRandomSong(items, currentSong);
  }
  return items[indexRD];
};
