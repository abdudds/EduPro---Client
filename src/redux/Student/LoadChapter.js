import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    chapter: null,
    watched: null,
}

const LoadChapter = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setLoadChapter(state, action) {
        state.chapter = action.payload
    },
    setWatched(state, action) {
      console.log(' watched worked')
      state.watched = action.payload
    }
  }
});

export const {setLoadChapter, setWatched} = LoadChapter.actions

export default LoadChapter.reducer