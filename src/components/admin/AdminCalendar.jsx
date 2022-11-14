import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import "./calendar.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";

function AdminCalendar({ getAvailableTimeslots, getTimeslotInfo }) {
  const [selected, setSelected] = useState();
  const { availableTs, exceptionTs } = useSelector((state) => state.admin);

  function getSlotsForDate(date, arrOfDates, arrOfExceptions) {
    let endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    endDate = endDate.getTime();
    let output = [];
    arrOfDates.map((ts) => {
      if (ts >= date && ts < endDate) output.push({ time: ts });
    });
    arrOfExceptions.map((exc) => {
      if (exc.time >= date && exc.time < endDate) output.push(exc);
    });
    return output.sort((a, b) => (a.time > b.time ? +1 : -1));
  }

  const addException = async (payload) => {
    try {
      let result = await axios.post(API_URL + "/admin/add_exception", payload);
      if (result.data.status === 1) {
        console.log("recieved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const delException = async (payload) => {
    try {
      let result = await axios.post(API_URL + "/admin/del_exception", payload);
      if (result.data.status === 1) {
        getTimeslotInfo();
        getAvailableTimeslots();
      }
      return console.log("something is wrong");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Calendar
        onChange={(value) => setSelected(value.getTime())}
        // selectRange={true}
        // allowPartialRange={true}
        tileClassName={({ date, view }) => {
          if (
            availableTs.find((ts) => {
              let tsDate = new Date(ts);
              return tsDate.toDateString() === date.toDateString();
            })
          ) {
            return "available";
          }
          if (
            exceptionTs.dates.find((exc) => {
              if (exc.type === 2) {
                let dre = new Date(exc.date_range_end);
                dre.setDate(dre.getDate() + 1);
                return (
                  date.getTime() >= exc.time && date.getTime() < dre.getTime()
                );
              }
              if (exc.type === 1) {
                return date.getTime() === exc.time;
              }
            })
          ) {
            return "exception";
          }
        }}
      />
      <div>
        <h5>{new Date(selected).toDateString()}</h5>
        <ul>
          {getSlotsForDate(selected, availableTs, exceptionTs.slots).map(
            (item, i) => {
              let time = new Date(item.time);
              let isExc = item.type === 0;
              return (
                <li key={i}>
                  <button
                    className={isExc ? "excSlot" : ""}
                    value={isExc ? item.id : item.time}
                    onClick={(e) => {
                      isExc
                        ? delException({ id: e.target.value })
                        : addException({ type: 0, time: e.target.value });
                    }}
                  >{`${time.toLocaleTimeString()}`}</button>
                </li>
              );
            }
          )}
        </ul>
      </div>
      {/* <p>Selected: {selected}</p> */}
    </div>
  );
}

export default AdminCalendar;
