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
  },
});

export const { setFormData, setJoiErrors, clearJoiErrors } =
  contactSlice.actions;

export default contactSlice.reducer;
