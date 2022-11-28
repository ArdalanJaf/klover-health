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
  const { timeslots, timeslotOptions } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [localTimeslot, setLocalTimeslot] = useState({
    day: "",
    hour: "",
    minutes: "",
  });
  const [localTSOptions, setLocalTSOptions] = useState(timeslotOptions);
  const [showTooltip, setShowTooltip] = useState({
    noOfWeeks: false,
    maxDate: false,
    cushionDays: false,
  });

  // for select options & timeslots table keys
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let hour = [];
  for (let i = 0; i < 24; i++) hour.push(i);
  let minutes = [];
  for (let i = 0; i < 60; i += 5) minutes.push(i);

  const getTimeslotInfo = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/timeslots_info", {
        headers: { token: token },
      });
      dispatch(setTimeslotInfo(results.data.timeslotInfo));
      setLocalTSOptions(results.data.timeslotInfo.timeslotOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const organiseTsByDay = (aTsObj) => {
    let organised = [[], [], [], [], [], [], []];
    aTsObj.map((obj) => {
      organised[obj.day].push(obj);
    });
    return organised;
  };

  const addTimeslot = async (payload) => {
    try {
      let result = await axios.post(API_URL + "/admin/add_timeslot", payload, {
        headers: { token: token },
      });
      if (result.data.status === 1) {
        getTimeslotInfo();
        setLocalTimeslot({ day: "", hour: "", minutes: "" });
      }
      return console.log("something is wrong");
    } catch (error) {
      console.log(error);
    }
  };

  const delTimeslot = async (payload) => {
    try {
      await axios.post(API_URL + "/admin/del_timeslot", payload, {
        headers: { token: token },
      });
      getTimeslotInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTSOptions = async (payload) => {
    try {
      await axios.post(API_URL + "/admin/update_ts_options", payload, {
        headers: { token: token },
      });
      getTimeslotInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (e) => {
    let copy = { ...localTimeslot };
    copy[e.target.id] = e.target.value;
    return setLocalTimeslot(copy);
  };

  function dateValuesToDate(dateValues) {
    if (dateValues === null) return null;
    let { date, month, year } = dateValues;
    let nDate = new Date();
    nDate.setFullYear(year);
    nDate.setMonth(month);
    nDate.setDate(date);
    nDate.setHours(0);
    nDate.setMinutes(0);
    nDate.setSeconds(0);
    nDate.setMilliseconds(0);
    return nDate;
  }

  function dateToDateValues(date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    };
  }

  useEffect(() => {
    getTimeslotInfo();
  }, []);

  return (
    <div>
      <div className="mb-4 ">
        <h2>Timeslots</h2>
        <p>
          This table shows the weekly timeslots you have made available for
          clients to book appointments. To add a new timeslot, use the "Add New
          Timeslot" form below. To delete a timeslot, simply click it.
        </p>
        <div className="alert alert-warning mt-2">
          {" "}
          Remember: all times represent UK time (GMT/BST).{" "}
        </div>
        {timeslots.length > 0 ? (
          <table className="table">
            <tbody>
              {organiseTsByDay(timeslots).map((arr, i) => {
                return (
                  <tr key={i} className="">
                    <th scope="row" style={{ width: "60px" }}>
                      {" "}
                      <span className="fw-bold text-uppercase">{days[i]}</span>
                    </th>
                    <td style={{ padding: "4px 8px" }}>
                      {arr.map((obj, i) => {
                        return (
                          <button
                            className="btn btn-sm bg-secondary text-white me-1"
                            id="hoverDel"
                            style={{ cursor: "pointer" }}
                            key={i}
                            value={obj.id}
                            onClick={(e) => {
                              delTimeslot({ id: e.target.value });
                            }}
                          >{`${makeDoubleDigitStr(
                            obj.hour
                          )}:${makeDoubleDigitStr(obj.minutes)}`}</button>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-danger">
            Warning: You have no timeslots, so there are no available
            appointments for clients to make a booking.
          </div>
        )}
      </div>

      <div className="mb-5">
        <h5 className="mb-1">Add New Timeslot:</h5>
        <div className="d-flex justify-content-between mb-2">
          <select
            className="form-control me-1"
            id="day"
            value={localTimeslot.day}
            onChange={(e) => handleSelect(e)}
          >
            <option value="">Day</option>
            {days.map((day, i) => (
              <option key={i} value={i}>
                {day}
              </option>
            ))}
          </select>
          <select
            className="form-control mx-1"
            id="hour"
            value={localTimeslot.hour}
            onChange={(e) => handleSelect(e)}
          >
            <option value="">Hour</option>
            {hour.map((num, i) => (
              <option key={i} value={num}>
                {makeDoubleDigitStr(num)}
              </option>
            ))}
          </select>
          <select
            className="form-control ms-1"
            id="minutes"
            value={localTimeslot.minutes}
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            <option value="">Minute</option>
            {minutes.map((num, i) => (
              <option key={i} value={num}>
                {makeDoubleDigitStr(num)}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary"
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
            Add Timeslot
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-4">Appointment Options</h3>

        <div className="mb-4">
          <h5 className="mb-3">Latest appointment available:</h5>
          <div className="form-check mb-2 d-flex align-items-center">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              checked={!localTSOptions.fixedMax}
              onChange={() =>
                setLocalTSOptions({
                  ...localTSOptions,
                  fixedMax: !localTSOptions.fixedMax,
                })
              }
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Generate appointments for {"   "}
              <span>
                <input
                  value={localTSOptions.noOfWeeks}
                  onChange={(e) =>
                    setLocalTSOptions({
                      ...localTSOptions,
                      noOfWeeks: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  className="form-control d-inline text-center"
                  style={{ width: "50px" }}
                ></input>
              </span>
              {"  "}
              weeks into the future{" "}
              <i
                className="bi bi-info-circle"
                onMouseEnter={() =>
                  setShowTooltip({ ...showTooltip, noOfWeeks: true })
                }
                onMouseLeave={() =>
                  setShowTooltip({ ...showTooltip, noOfWeeks: false })
                }
              ></i>{" "}
            </label>
          </div>
          {showTooltip.noOfWeeks && (
            <div className="alert alert-info">
              Appointments are generated for a number of weeks from the current
              day a client is on the website. <br />
              Eg. if you enter "5 weeks" and a client goes on the site on
              14/11/2022, then latest possible appointment available to them
              will be no later than 9/12/2022.
            </div>
          )}

          <div className="form-check d-flex align-items-center">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              checked={localTSOptions.fixedMax}
              onChange={() =>
                setLocalTSOptions({
                  ...localTSOptions,
                  fixedMax: !localTSOptions.fixedMax,
                })
              }
            />
            <label
              className="form-check-label datePicker"
              htmlFor="flexRadioDefault1"
            >
              Generate appointments untill {"  "}
              <div className="d-inline-flex align-items-center">
                <DatePicker
                  selected={dateValuesToDate(localTSOptions.maxDate)}
                  onChange={(date) => {
                    setLocalTSOptions({
                      ...localTSOptions,
                      maxDate: dateToDateValues(date),
                    });
                  }}
                  dateFormat="dd/MM/yyyy"
                  startDate={dateValuesToDate(localTSOptions.maxDate)}
                />{" "}
                <i
                  className="bi bi-info-circle ms-2"
                  onMouseEnter={() =>
                    setShowTooltip({ ...showTooltip, maxDate: true })
                  }
                  onMouseLeave={() =>
                    setShowTooltip({ ...showTooltip, maxDate: false })
                  }
                ></i>{" "}
              </div>
            </label>
          </div>
          {showTooltip.maxDate && (
            <div className="alert alert-info mt-2">
              Appointments are generated untill date selected. <br />
              Eg. if you enter "01/12/2022" and a client goes on the site on
              14/11/2022, then latest possible appointment available to them
              will be before 01/12/2022.
            </div>
          )}
        </div>
        <div className="mb-3">
          <h5>Earliest appointment available:</h5>
          Earliest available appointment in {"  "}
          <span>
            <input
              value={localTSOptions.cushionDays}
              onChange={(e) =>
                setLocalTSOptions({
                  ...localTSOptions,
                  cushionDays: e.target.value,
                })
              }
              type="number"
              onWheel={(e) => e.target.blur()}
              className="form-control d-inline text-center"
              style={{ width: "50px" }}
            ></input>
          </span>
          {"  "} days{" "}
          <i
            className="bi bi-info-circle"
            onMouseEnter={() =>
              setShowTooltip({ ...showTooltip, cushionDays: true })
            }
            onMouseLeave={() =>
              setShowTooltip({ ...showTooltip, cushionDays: false })
            }
          ></i>{" "}
          {showTooltip.cushionDays && (
            <div className="alert alert-info mt-2">
              Earliest appointment available from current day client is booking.
              <br />
              Eg. if you input "3 days" and a client goes on the website on
              14/11/2022, the earliest possible appointment available to them
              will be on 17/11/2022.
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary"
            disabled={localTSOptions === timeslotOptions ? true : false}
            onClick={() => updateTSOptions(localTSOptions)}
          >
            Update Options
          </button>
        </div>
      </div>
      <div style={{ height: "250px" }}></div>
    </div>
  );
}

export default AdminTimeslots;
