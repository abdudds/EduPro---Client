import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authContext";
import tutorReducer from "./tutorAuth"
import CoursesLoad from "./Student/CoursesLoad";
import { CourseOnPayment } from "./Student/CourseOnPayment"; 
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LoadChapter from "./Student/LoadChapter";

const persistConfig = { key: "client", storage };
const persistedauthReducer = persistReducer(persistConfig, authReducer);

const tutorpersistConfig = { key: "Tutor", storage}
const tutorPersistorReducer = persistReducer(tutorpersistConfig, tutorReducer)

const CourseOnPaymentpersistConfig = {key : 'CourseOnPayment',storage}
const CourseOnPaymentReducer = persistReducer(CourseOnPaymentpersistConfig, CourseOnPayment.reducer)

const chapterpersistConfig = { key: "chapter", storage}
const chapterPersistorReducer = persistReducer(chapterpersistConfig, LoadChapter)


export const store = configureStore({
  reducer: {
    auth: persistedauthReducer,
    tutor: tutorPersistorReducer,
    CoursesLoad: CoursesLoad,
    CourseOnPayment: CourseOnPaymentReducer,
    learningRoom: chapterPersistorReducer,
  },
});

export const persistor = persistStore(store);
