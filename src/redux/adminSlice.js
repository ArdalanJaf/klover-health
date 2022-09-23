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
