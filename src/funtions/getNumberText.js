function getNumberText(value) {
  if (!value) return 0;
  if (value < 1000) {
    return value;
  } else {
    const nb = Math.round(value / 1000);
    return `${nb}K`;
  }
}

export default getNumberText;
