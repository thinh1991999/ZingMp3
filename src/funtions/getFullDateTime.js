function getFullDateTime(nb) {
  const date = new Date(nb * 1000);
  const year = date.getFullYear();
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
}

export default getFullDateTime;
