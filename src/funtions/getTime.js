function getTime(value) {
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
}

export default getTime;
