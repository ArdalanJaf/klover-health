import { createSlice } from "@reduxjs/toolkit";

export const publicSlice = createSlice({
  name: "public",
  initialState: {
    availableTs: [], // [UTC time int, UTC time int, etc]
    prices: {
      preAssessment: "",
      assessment: "",
    },
    contactForm: {
      email: "",
      name: "",
      message: "",
    },
    contactErrors: {},
    productSelected: "",
  },
  reducers: {
    setAvailableTs: (state, action) => {
      state.availableTs = action.payload;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setContactForm: (state, action) => {
      state.contactForm[action.payload.label] = action.payload.value;
    },
    setContactErrors: (state, action) => {
      state.contactErrors = action.payload;
    },
    clearContactErrors: (state) => {
      state.contactErrors = {};
    },
    clearContactForm: (state) => {
      state.contactForm = {
        email: "",
        name: "",
        message: "",
      };
    },
    selectProduct: (state, action) => {
      state.productSelected = action.payload;
    },
  },
});

export const {
  setAvailableTs,
  setPrices,
  setContactForm,
  setContactErrors,
  clearContactErrors,
  clearContactForm,
  selectProduct,
} = publicSlice.actions;

export default publicSlice.reducer;
