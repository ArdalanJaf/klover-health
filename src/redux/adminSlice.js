import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    prices: {
      preAssessment: 4000,
      assessment: 30000,
    },
    contact: {
      phone: "",
      email: "",
    },
    timeslots: [],
  },
  reducers: {
    setPrices: (state, action) => {
      state.prices[action.payload.label] = action.payload.value;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setTimeslots: (state, action) => {
      state.timeslots = action.payload;
    },
  },
});

export const { setPrices, setContact, setTimeslots } = adminSlice.actions;

export default adminSlice.reducer;
