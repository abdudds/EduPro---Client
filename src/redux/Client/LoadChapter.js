import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    chapter: null,
}

const LoadChapter = createSlice({
  name: learning,
  initialState,
  reducers: {
    setLoadChapter(state, action) {
        state.chapter = action.payload
    }
  }
});

export const {setLoadChapter} = LoadChapter.actions

export default LoadChapter.reducer