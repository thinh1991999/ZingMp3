function getDate(nb) {
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
}

export default getDate;
