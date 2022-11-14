import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { setTimeslotInfo } from "../../redux/adminSlice";
import emcaToString from "../../utils/emcaToString";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function AdminExceptions() {
  const { exceptionTs } = useSelector((state) => state.admin);
  const token = useSelector((state) => state.admin.login.token);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [needRender, setNeedRender] = useState(false);

  const getTimeslotInfo = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/timeslots_info", {
        headers: { token: token },
      });
      // console.log(results.data);
      dispatch(setTimeslotInfo(results.data.timeslotInfo));
    } catch (error) {
      // message to tell user to contact Risha directly
      alert("API down " + error);
    }
  };

  function prepForAPI(date) {
    if (!date) return null;
    let output = {};
    output.date = date.getDate();
    output.month = date.getMonth();
    output.year = date.getFullYear();
    return output;
  }

  const addException = async (payload) => {
    try {
      await axios.post(API_URL + "/admin/add_exception", payload, {
        headers: { token: token },
      });
      setNeedRender(true);
    } catch (error) {
      console.log(error);
    }
  };

  const delException = async (payload) => {
    try {
      await axios.post(API_URL + "/admin/del_exception", payload, {
        headers: { token: token },
      });
      setNeedRender(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTimeslotInfo();
  }, []);

  useEffect(() => {
    getTimeslotInfo();
    setNeedRender(false);
  }, [needRender]);

  const highlights = () => {
    let arr = [];
    exceptionTs.dates.map((date) => {
      if (date.type === 1) {
        arr.push(new Date(date.time));
      }
      if (date.type === 2) {
        let startDate = new Date(date.time);

        let noOfDays =
          (date.date_range_end - date.time) / (1000 * 60 * 60 * 24);

        for (let i = 0; i <= noOfDays; i++) {
          let nDate = new Date(date.time);
          nDate.setDate(startDate.getDate() + i);
          arr.push(nDate);
        }
      }
    });
    return arr;
  };

  // console.log(
  //   startDate.getTime(),
  //   exceptionTs.dates.find((date) => {
  //     // console.log(date.time);
  //     let nDate = new Date(date.time);
  //     if (date.type === 1) {
  //       return (
  //         startDate.getDate() === nDate.getDate() &&
  //         startDate.getMonth() === nDate.getMonth() &&
  //         startDate.getFullYear() === nDate.getFullYear()
  //       );
  //     }
  //     if (date.type === 2) {
  //       return;
  //     }
  //   })
  // );

  // console.log(startDate.getTime());

  // let sDate = new Date(1669327857000);
  // console.log(sDate);
  // sDate.setHours(0);
  // sDate.setMinutes(0);
  // sDate.setSeconds(0);
  // sDate.setMilliseconds(0);
  // console.log(sDate);
  // let cDate = new Date(1669334400000);
  // console.log("cDate: ", cDate);

  let tDate = new Date(1667606400000);
  // let dif = tDate.getTimezoneOffset();
  console.log(tDate);
  // console.log(dif);
  // tDate.setMinutes(tDate.getMinutes() + dif);
  // console.log(tDate);
  console.log(toUTCTimeZone(tDate));
  console.log("end");

  function toUTCTimeZone(date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
  }

  // store a date for 25th, displayed as 24th (in the US)...
  // problem is when date is converted to local time...

  // console.log(
  //   startDate.getTime(),
  //   exceptionTs.dates.find((date) => {
  //     let nDate = new Date(date.time);
  //     let sDate = new Date(startDate.getTime());
  //     console.log(sDate);
  //     sDate.setUTCHours(00);
  //     sDate.setUTCMinutes(00);
  //     sDate.setUTCSeconds(00);
  //     sDate.setUTCMilliseconds(00);
  //     if (date.type === 1) {
  //       return sDate.getTime() === nDate.getTime();
  //     }
  //   })
  // );

  return (
    <div>
      <div>
        <h3>Dates unavailable:</h3>
        <ul>
          {exceptionTs.dates.map((exc, i) => {
            return (
              <li key={i}>
                <button
                  value={exc.id}
                  onClick={(e) => delException({ id: e.target.value })}
                >
                  {emcaToString(exc.time)}
                  {exc.date_range_end &&
                    ` - ${emcaToString(exc.date_range_end)}`}
                </button>
              </li>
            );
          })}
        </ul>

        <div>
          <h5>Enter new unavailability date(s):</h5>
          <p>
            Select 1 date to be unavailable for a single day, or 2 dates to be
            unavailable for a number of days. Green days are already
            unavailable.
          </p>
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            dateFormat="dd/MM/yyyy"
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            highlightDates={highlights()}
          />

          {/* <div>
            Selected:
            {console.log(
              exceptionTs.dates.find((date) => {
                if (date.type === 1) {
                  startDate.getTime() >= date.time &&
                    startDate.getTime() <= date.time + 1000 * 60 * 60 * 24;
                }
              })
            )}
          </div> */}

          <button
            type="submit"
            onClick={() => {
              addException({
                startDate: prepForAPI(startDate),
                endDate: prepForAPI(endDate),
              });
            }}
          >
            Submit
          </button>
        </div>
      </div>

      <button
        type="submit"
        name="submit"
        onClick={(e) => {
          getTimeslotInfo();
        }}
      >
        GET TIME INFO
      </button>
    </div>
  );
}

export default AdminExceptions;
