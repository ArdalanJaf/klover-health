import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { setTimeslotInfo } from "../../redux/adminSlice";
import emcaToString from "../../utils/emcaToString";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function AdminUnavailability() {
  const { unavailability } = useSelector((state) => state.admin);
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

  const addUnavailability = async (payload) => {
    try {
      console.log(payload);
      let result = await axios.post(
        API_URL + "/admin/add_unavailability",
        payload,
        {
          headers: { token: token },
        }
      );
      console.log(result);
      setNeedRender(true);
    } catch (error) {
      console.log(error);
    }
  };

  const delUnavailability = async (payload) => {
    try {
      await axios.post(API_URL + "/admin//del_unavailability", payload, {
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

  function toUTCTimeZone(date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
  }

  const highlights = () => {
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

  function searchUForDate(date) {
    // checks if there is existing entry that matches startDate selected
    // returns undefined or existing entry object
    let nDate = new Date();
    nDate.setUTCFullYear(date.getFullYear());
    nDate.setUTCMonth(date.getMonth());
    nDate.setUTCDate(date.getDate());
    nDate.setUTCHours(0);
    nDate.setUTCMinutes(0);
    nDate.setUTCSeconds(0);
    nDate.setUTCMilliseconds(0);

    return unavailability.find((date) => {
      if (date.type === 1) return date.time === nDate.getTime();
      return (
        nDate.getTime() >= date.time && nDate.getTime() <= date.date_range_end
      );
    });
  }

  return (
    <div>
      <h3>Dates unavailable:</h3>
      <ul>
        {unavailability.map((exc, i) => {
          return (
            <li key={i} className="mb-1">
              <button
                className={`btn btn-sm text-white ${
                  searchUForDate(startDate) === exc
                    ? "bg-success"
                    : "bg-secondary"
                }`}
                value={exc.id}
                onClick={(e) => delUnavailability({ id: e.target.value })}
              >
                {emcaToString(exc.time)}
                {exc.date_range_end && ` - ${emcaToString(exc.date_range_end)}`}
              </button>
            </li>
          );
        })}
      </ul>

      <h5>Enter new unavailability date(s):</h5>
      <div className="alert alert-info">
        Select 1 date to be unavailable for a single day, or 2 dates to be
        unavailable for a number of days. Green days are already unavailable.
      </div>
      <div>
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
        <div className="ms-1" style={{ width: "240.25px" }}>
          {searchUForDate(startDate) ? (
            <>
              {/* <p>
                {emcaToString(searchUForDate(startDate).time)}{" "}
                {searchUForDate(startDate).date_range_end &&
                  `- ${emcaToString(searchUForDate(startDate).date_range_end)}`}
              </p> */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={() => {
                    console.log(searchUForDate(startDate).id);
                    delUnavailability({ id: searchUForDate(startDate).id });
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              {/* <p>
                {startDate.toDateString()}
                {endDate && ` - ${endDate.toDateString()}`}
              </p> */}
              <div className="text-center">
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
                >
                  Submit
                </button>
              </div>
            </>
          )}
          {/* <p>
          Date: {startDate.toDateString()}
          {endDate && ` - ${endDate.toDateString()}`}
        </p> */}
        </div>
      </div>
    </div>
  );
}

export default AdminUnavailability;
