import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { setTimeslotInfo } from "../../redux/adminSlice";
import makeDoubleDigitStr from "../../utils/makeDoubleDigitStr";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function AdminTimeslots() {
  const token = useSelector((state) => state.admin.login.token);
  const { timeslots, exceptionTs } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [localTimeslot, setLocalTimeslot] = useState({
    day: "",
    hour: "",
    minutes: "",
  });

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let hour = [];
  for (let i = 0; i < 24; i++) hour.push(i);
  let minutes = [];
  for (let i = 0; i < 60; i += 5) minutes.push(i);

  const getTimeslotInfo = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/timeslots_info");
      // console.log(results.data);
      dispatch(setTimeslotInfo(results.data.timeslotInfo));
    } catch (error) {
      // message to tell user to contact Risha directly
      alert("API down " + error);
    }
  };

  const organiseTsByDay = (aTsObj) => {
    let organised = [[], [], [], [], [], [], []];
    aTsObj.map((obj) => {
      organised[obj.day].push(obj);
    });
    return organised;
  };

  const delTimeslot = async (payload) => {
    console.log("trying", payload);
    try {
      let result = await axios.post(API_URL + "/admin/del_timeslot", payload, {
        headers: { token: token },
      });
      result.data.status === 1
        ? getTimeslotInfo()
        : console.log("something is wrong");
    } catch (error) {
      console.log(error);
    }
  };

  const addTimeslot = async (payload) => {
    try {
      let result = await axios.post(API_URL + "/admin/add_timeslot", payload, {
        headers: { token: token },
      });
      if (result.data.status === 1) {
        console.log("recieved");
        getTimeslotInfo();
        setLocalTimeslot({ day: "", hour: "", minutes: "" });
      }
      return console.log("something is wrong");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (e) => {
    let copy = { ...localTimeslot };
    copy[e.target.id] = e.target.value;
    return setLocalTimeslot(copy);
  };
  // retrieve mutable properties
  // useEffect(() => {
  //   getTimeslotInfo();
  // }, []);

  useEffect(() => {
    console.log(localTimeslot);
    console.log("reRender");
  }, [localTimeslot]);

  return (
    <div>
      <div>
        <h3>Weekly Timeslots:</h3>
        <p>
          Below shows the timeslots you have made available. To delete one,
          simply click it!
        </p>
        {timeslots.length > 0 ? (
          <ul>
            {organiseTsByDay(timeslots).map((arr, i) => {
              return (
                <li key={i}>
                  {days[i]}:{" "}
                  {arr.map((obj, i) => {
                    return (
                      <button
                        key={i}
                        value={obj.id}
                        onClick={(e) => {
                          delTimeslot({ id: e.target.value });
                        }}
                      >{`${makeDoubleDigitStr(obj.hour)}:${makeDoubleDigitStr(
                        obj.minutes
                      )}`}</button>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>
            Warning: You have not made any available timeslots, so customers
            cannot book any sessons!
          </p>
        )}
      </div>

      <div>
        <h5>Add new timeslot:</h5>
        <select
          id="day"
          value={localTimeslot.day}
          onChange={(e) => handleSelect(e)}
        >
          <option>Day</option>
          {days.map((day, i) => (
            <option key={i} value={i}>
              {day}
            </option>
          ))}
        </select>
        <select
          id="hour"
          value={localTimeslot.hour}
          onChange={(e) => handleSelect(e)}
        >
          <option>Hour</option>
          {hour.map((num, i) => (
            <option key={i} value={num}>
              {makeDoubleDigitStr(num)}
            </option>
          ))}
        </select>
        <select
          id="minutes"
          value={localTimeslot.minutes}
          onChange={(e) => {
            handleSelect(e);
          }}
        >
          <option>Minute</option>
          {minutes.map((num, i) => (
            <option key={i} value={num}>
              {makeDoubleDigitStr(num)}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={
            localTimeslot.day && localTimeslot.hour && localTimeslot.minutes
              ? false
              : true
          }
          onClick={(e) => {
            e.preventDefault();
            addTimeslot({ timeslot: localTimeslot });
          }}
        >
          Submit
        </button>
      </div>

      {/* <button
        type="submit"
        name="submit"
        onClick={(e) => {
          getTimeslotInfo();
        }}
      >
        GET TIME INFO
      </button> */}
    </div>
  );
}

export default AdminTimeslots;
