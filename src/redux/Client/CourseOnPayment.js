import { createSlice } from "@reduxjs/toolkit";

export const CourseOnPayment = createSlice({
  name: "CourseOnPayment",
  initialState: {
    courseData: null,
  },
  reducers: {
    setCourseData(state, action) {
      state.courseData = action.payload;
    },
    removeCourseData(state, action) {
      state.courseData = null;
    },
  },
});

export const { setCourseData, removeCourseData } = CourseOnPayment.actions;
export default CourseOnPayment.reducer;
