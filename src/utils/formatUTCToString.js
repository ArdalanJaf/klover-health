import makeDoubleDigitStr from "./makeDoubleDigitStr";

const formatUTCToString = (UTCTime, dateOnly = false, shortForm = false) => {
  let dateObj = new Date(UTCTime);

  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (dateOnly) {
    // for dateOnly, date is artificially changed to match UTC.
    // this is only because dateOnly is only used in admin Unavailability, where it is critical to display date in UTC (UK) time, rather than local time.
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
    return dateObj.toLocaleDateString("en-UK", dateOptions);
  }

  let time = `${makeDoubleDigitStr(dateObj.getHours())}:${makeDoubleDigitStr(
    dateObj.getMinutes()
  )}`;

  if (shortForm) {
    return `${time} ${dateObj.toLocaleDateString("en-UK")} `;
  }
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let date = dateObj.toLocaleDateString("en-UK", options);

  return time + " " + date + " ";
};

export default formatUTCToString;
