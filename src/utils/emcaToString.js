const emcaToString = (emcaInt) => {
  function toUTCTimeZone(date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
  }

  let dateObj = new Date(emcaInt);
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let day = dateObj.getDay();
  let date = dateObj.getDate();
  let month = dateObj.getMonth();
  let year = dateObj.getFullYear();

  return toUTCTimeZone(dateObj).toDateString();
  // return day + hours + minutes + date + month + year;
};

export default emcaToString;
