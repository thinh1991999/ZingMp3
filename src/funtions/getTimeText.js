function getTime(value) {
  const hour = Math.floor(value / 3600);
  const minute = Math.floor((value % 3600) / 60);

  return `${hour} giờ ${minute} phút`;
}

export default getTime;
