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
    timeslots: [], // [{id, day, hour, minutes}]
    exceptionTs: { dates: [], slots: [] }, // [{id, type, time, date_range_end, }]
    login: { userId: null, token: null },
  },
  reducers: {
    setPrices: (state, action) => {
      // console.log("recieved");
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
      // split up
      state.exceptionTs = action.payload.exceptionTs;
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
  setLogin,
} = adminSlice.actions;

export default adminSlice.reducer;
