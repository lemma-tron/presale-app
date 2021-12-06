// convert millis to days, hours, minutes, seconds
export const convertMillistoDHMS = (millis) => {
  const seconds = Math.floor((millis / 1000) % 60);
  const minutes = Math.floor((millis / (1000 * 60)) % 60);
  const hours = Math.floor((millis / (1000 * 60 * 60)) % 24);
  const days = Math.floor(millis / (1000 * 60 * 60 * 24));

  return {
    millis,
    days,
    hours,
    minutes,
    seconds,
  };
};
