import { createSlice } from "@reduxjs/toolkit";

export const CoursesLoad = createSlice({
  name: "CourseLoad",
  initialState: {
    courseData: null,
    purchasedCourses: null,
  },
  reducers: {
    setCoursesLoad(state, action) {
      state.courseData = action.payload;
    },
    setPurchasedCourses(state, action) {
      state.purchasedCourses = action.payload;
    },
  },
});

export const { setCoursesLoad, setPurchasedCourses } = CoursesLoad.actions;
export default CoursesLoad.reducer;
