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

export const getRandomSong = (items, currentSong = null, validArr) => {
  if (validArr.length === 1) {
    return currentSong;
  }
  const indexRD = Math.floor(Math.random() * (items.length - 1));
  if (
    items[indexRD].encodeId === currentSong?.encodeId ||
    items[indexRD].streamingStatus !== 1
  ) {
    return getRandomSong(items, currentSong);
  }
  return items[indexRD];
};

export const getRandomIndex = (arr, index) => {
  const indexRD = Math.floor(Math.random() * (arr.length - 1));
  if (indexRD === index) {
    return getRandomIndex(arr, index);
  }
  return indexRD;
};

export const cleanStringify = (object) => {
  if (object && typeof object === "object") {
    object = copyWithoutCircularReferences([object], object);
  }
  return JSON.stringify(object);

  function copyWithoutCircularReferences(references, object) {
    var cleanObject = {};
    Object.keys(object).forEach(function (key) {
      var value = object[key];
      if (value && typeof value === "object") {
        if (references.indexOf(value) < 0) {
          references.push(value);
          cleanObject[key] = copyWithoutCircularReferences(references, value);
          references.pop();
        } else {
          cleanObject[key] = "###_Circular_###";
        }
      } else if (typeof value !== "function") {
        cleanObject[key] = value;
      }
    });
    return cleanObject;
  }
};

export const getDate = (nb) => {
  const date = new Date(nb * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (day < 10 && month < 10) {
    return `0${day}/0${month}/${year}`;
  } else if (day < 10) {
    return `0${day}/${month}/${year}`;
  } else if (month < 10) {
    return `${day}/0${month}/${year}`;
  }
  return `${day}/${month}/${year}`;
};

export const getFullDateTime = (nb) => {
  const date = new Date(nb * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const rank = date.getDay();
  let rankText = "";
  switch (rank) {
    case 0:
      rankText = "Chủ Nhật";
      break;
    case 1:
      rankText = "Thứ Hai";
      break;
    case 2:
      rankText = "Thứ Ba";
      break;
    case 3:
      rankText = "Thứ Tư";
      break;
    case 4:
      rankText = "Thứ Năm";
      break;
    case 5:
      rankText = "Thứ Sáu";
      break;
    case 6:
      rankText = "Thứ Bảy";
      break;

    default:
      break;
  }

  return `${hour}:${minute} ${rankText}, ${day} tháng ${month}`;
};

export const getNumberText = (value) => {
  if (!value) return 0;
  if (value < 1000) {
    return value;
  } else {
    const nb = Math.round(value / 1000);
    return `${nb}K`;
  }
};

export const getTimeText = (value) => {
  const hour = Math.floor(value / 3600);
  const minute = Math.floor((value % 3600) / 60);

  return `${hour} giờ ${minute} phút`;
};
