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
      let formData = { ...state.formData };
      formData[action.payload.label] = action.payload.value;
      const results = { ...state, formData };
      return results;
    },
    setJoiErrors: (state, action) => {
      let joiErrors = { ...state.joiErrors };
      joiErrors = action.payload;
      const results = { ...state, joiErrors };
      return results;
    },
    clearJoiErrors: (state) => {
      let joiErrors = { ...state.joiErrors };
      joiErrors = {};
      const results = { ...state, joiErrors };
      return results;
    },
  },
});

export const { setFormData, setJoiErrors, clearJoiErrors } =
  contactSlice.actions;

export default contactSlice.reducer;
