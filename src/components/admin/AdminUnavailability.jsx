import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { setUnavailability } from "../../redux/adminSlice";
import DatePicker from "react-datepicker";
import formatUTCToString from "../../utils/formatUTCToString";

function AdminUnavailability() {
  const { unavailability } = useSelector((state) => state.admin);
  const token = useSelector((state) => state.admin.login.token);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const getUnavailability = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/unavailability", {
        headers: { token: token },
      });
      dispatch(setUnavailability(results.data.unavailability));
    } catch (error) {
      alert("API down " + error);
    }
  };

  const addUnavailability = async (payload) => {
    try {
      await axios.post(API_URL + "/admin/add_unavailability", payload, {
        headers: { token: token },
      });
      getUnavailability();
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.log(error);
    }
  };

  const delUnavailability = async (payload) => {
    try {
      await axios.post(API_URL + "/admin//del_unavailability", payload, {
        headers: { token: token },
      });
      getUnavailability();
    } catch (error) {
      console.log(error);
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

  const highlights = () => {
    // takes all unavailability dates and produces array of date objects to be highlighted in datepicker
    function toUTCTimeZone(date) {
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      return date;
    }

    let arr = [];
    unavailability.map((date) => {
      if (date.type === 1) {
        arr.push(toUTCTimeZone(new Date(date.time)));
      }
      if (date.type === 2) {
        let startDate = toUTCTimeZone(new Date(date.time));

        let noOfDays =
          (date.date_range_end - date.time) / (1000 * 60 * 60 * 24);

        for (let i = 0; i <= noOfDays; i++) {
          let nDate = toUTCTimeZone(new Date(date.time));
          nDate.setDate(startDate.getDate() + i);
          arr.push(nDate);
        }
      }
    });
    return arr;
  };

  function searchUForDate(startDate, endDate) {
    // checks if there is existing entry that matches dates selected
    // returns undefined or existing entry object
    const dateToUTCTime = (date) => {
      let nDate = new Date();
      nDate.setUTCFullYear(date.getFullYear());
      nDate.setUTCMonth(date.getMonth());
      nDate.setUTCDate(date.getDate());
      nDate.setUTCHours(0);
      nDate.setUTCMinutes(0);
      nDate.setUTCSeconds(0);
      nDate.setUTCMilliseconds(0);
      return nDate.getTime();
    };

    let sTime = dateToUTCTime(startDate);

    if (endDate !== null) {
      let eTime = dateToUTCTime(endDate);

      return unavailability.find((date) => {
        if (date.type === 1) return date.time >= sTime && date.time <= eTime;
        return (
          (sTime >= date.time && sTime <= date.date_range_end) ||
          (eTime >= date.time && eTime <= date.date_range_end)
        );
      });
    }

    return unavailability.find((date) => {
      if (date.type === 1) return date.time === sTime;
      return sTime >= date.time && sTime <= date.date_range_end;
    });
  }

  useEffect(() => {
    getUnavailability();
  }, []);

  return (
    <div>
      <h2>Unavailability</h2>

      <p>
        Appointment slots will not be generated on date(s) that are added to
        unavailability. Below shows your existing unavailability entries.
        <br /> To add an entry, use the "Add Unavailability date(s)" form. To
        delete an entry, simply click on it.
      </p>
      <div className="alert alert-warning">
        Remember: all dates represent UK time (GMT/BST).
      </div>
      <div className="mb-4">
        {unavailability.length ? (
          <div>
            <ul style={{ listStyle: "none", paddingInlineStart: "0" }}>
              {unavailability.map((date, i) => {
                return (
                  <li key={i}>
                    <button
                      className={`btn text-white mb-1 ${
                        startDate && searchUForDate(startDate, endDate) === date
                          ? "bg-custom-highlight"
                          : "bg-secondary"
                      }`}
                      id="hoverDel"
                      value={date.id}
                      onClick={(e) => delUnavailability({ id: e.target.value })}
                    >
                      {formatUTCToString(date.time, true)}
                      {date.date_range_end &&
                        ` - ${formatUTCToString(date.date_range_end, true)}`}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="alert alert-info">
            You currently have no unavailability entries.
          </div>
        )}
      </div>

      <div>
        <h5>Add unavailability date(s):</h5>
        <div className="d-flex align-items-center flex-wrap">
          <div className="datePicker datePickerLong d-flex align-items-center">
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
              // inline
              highlightDates={highlights()}
            />
            <i
              className="bi bi-info-circle ms-2"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            ></i>
          </div>
          <div className="my-2 text-center" style={{ width: "220px" }}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                addUnavailability({
                  startDate: prepForAPI(startDate),
                  endDate: !endDate
                    ? null
                    : startDate.getTime() === endDate.getTime()
                    ? null
                    : prepForAPI(endDate),
                });
              }}
              disabled={
                startDate && searchUForDate(startDate, endDate) === undefined
                  ? false
                  : true
              }
            >
              Add Unavailability
            </button>
          </div>
          {showTooltip && (
            <div className="alert alert-info mt-2">
              Select a single date to make only one day unavailable. Select two
              dates to make a range of dates unavailable.
              <br /> Dates highlighted in green represent existing entries. You
              cannot enter seperate overlapping entries.
            </div>
          )}
        </div>
      </div>
      <div style={{ height: "50px" }}></div>
    </div>
  );
}

export default AdminUnavailability;
