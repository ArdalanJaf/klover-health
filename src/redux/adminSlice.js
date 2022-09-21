import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    prices: {
      preAssessment: 40,
      assessment: 300,
    },
    contact: {
      phone: "",
      email: "",
    },
    timeSlots: {
      available: [],
      exemptions: [],
    },
  },
  reducers: {
    setPrices: (state, action) => {
      state.prices[action.payload.label] = action.payload.value;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
  },
});

export const { setPrices, setContact } = adminSlice.actions;

export default adminSlice.reducer;
