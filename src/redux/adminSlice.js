import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    prices: {
      preAssessment: 0,
      assessment: 0,
    },
    contact: {
      phone: "",
      email: "",
    },
    availableTs: [], // [EMCAInt, EMCAInt, etc]
    login: { userId: null, token: null },
    timeslots: [], // [{id, day, hour, minutes}]
    unavailability: [], // [{id, type, time, date_range_end, }]
    timeslotOptions: {
      fixedMax: "",
      noOfWeeks: 0,
      maxDate: { year: 0, month: 0, date: 0 },
      cushionDays: 0,
    },
  },
  reducers: {
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setAvailableTs: (state, action) => {
      state.availableTs = action.payload;
    },
    setTimeslotInfo: (state, action) => {
      // console.log(action.payload);
      state.timeslots = action.payload.timeslots;
      state.timeslotOptions = action.payload.timeslotOptions;
      // split up
      // state.unavailability = action.payload.unavailability;
    },
    setUnavailability: (state, action) => {
      state.unavailability = action.payload;
    },
    setLogin: (state, action) => {
      state.login.userId = action.payload.userId;
      state.login.token = action.payload.token;
    },
  },
});

export const {
  setPrices,
  setContact,
  setAvailableTs,
  setTimeslotInfo,
  setUnavailability,
  setLogin,
} = adminSlice.actions;

export default adminSlice.reducer;
