const genTimeslots = (available = [], noOfMonths = 3) => {
  try {
    const output = [];
    let now = new Date();

    // how many months of timeslots should be generated
    let finalDate = new Date();
    const MAX_MONTHS_TO_GEN_DATES = noOfMonths;
    finalDate.setMonth(now.getUTCMonth() + MAX_MONTHS_TO_GEN_DATES); //mutable
    let oneDay = 1000 * 60 * 60 * 24;
    let totalDays = ((finalDate.getTime() - now.getTime()) / oneDay).toFixed();

    available.forEach((item) => {
      let date = new Date();

      // bring date to same week day as available slot (eg. today: Mon 23/04, available slot: Tues => Tues 24/04)
      date = matchDateToDay(date, item.day);

      // create timeslot (date obj) for each week upto finalDate
      for (let i = 0; i < totalDays; i += 7) {
        let timeslot = new Date(date.getTime());
        timeslot.setDate(date.getUTCDate() + i);
        timeslot.setHours(item.hour);
        timeslot.setMinutes(item.minutes);
        timeslot.setSeconds(0);
        timeslot.setMilliseconds(0);
        output.push(timeslot.getTime());
      }
    });
    return output.sort();
  } catch (error) {
    console.log(error);
  }

  function matchDateToDay(date, targetDay) {
    if (date.getUTCDay() === targetDay) return date;
    let week = [0, 1, 2, 3, 4, 5, 6];
    let temp = week.splice(0, date.getUTCDay());
    week = week.concat(temp);
    week.splice(week.findIndex((e) => e === targetDay));
    date.setDate(date.getUTCDate() + week.length);
    return date;
  }
};

export default genTimeslots;
