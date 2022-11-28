import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    formData: {
      email: "",
      name: "",
      message: "",
    },
    joiErrors: {},
    productSelected: "",
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData[action.payload.label] = action.payload.value;
    },
    setJoiErrors: (state, action) => {
      state.joiErrors = action.payload;
    },
    clearJoiErrors: (state) => {
      state.joiErrors = {};
    },
    clearFormData: (state) => {
      state.formData = {
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
  setFormData,
  setJoiErrors,
  clearJoiErrors,
  clearFormData,
  selectProduct,
} = contactSlice.actions;

export default contactSlice.reducer;
