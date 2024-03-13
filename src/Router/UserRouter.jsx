import React, { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from '../pages/Auth/signUpPage';
import BecomeTutor from '../pages/User/BecomeTutor'
import LoginPage from '../pages/Auth/loginPage';
import TutorSignUp from '../pages/Auth/TutorSignUp'
import TutorRequest from '../pages/User/TutorRequest'; 
import CoursesPage from '../pages/User/CoursesPage';
import CourseDetailPage from '../pages/User/CourseDetailPage';
import Home from '../pages/User/Home';
import StudentHome from '../pages/User/StudentHome';
import PaymentPage from '../pages/User/PaymentPage'
import NotFoundPage from '../pages/NotFoundPage';
import ShimmerList from '../components/ShimmerList/ShimmerList';
import MyCoursesPage from '../pages/User/MyCoursesPage';
import LearningPage from '../pages/User/LearningPage';

function UserRouter() {

    const userAuth = useSelector(state=>state.auth.user)
    const PrivateRoute = ({ element, ...rest }) => {
      return userAuth ? element : <Navigate to="/login" />;
    };
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/tutorsignup"
          element={
            <Suspense fallback={<ShimmerList />}>
              <TutorSignUp />
            </Suspense>
          }
        />
        <Route path="/becomeTutor" element={<BecomeTutor />} />
        <Route
          path="/courses"
          element={
            <Suspense fallback={<ShimmerList />}>
              <CoursesPage />
            </Suspense>
          }
        />
        <Route
          path="/course-details"
          element={
            <Suspense fallback={<ShimmerList />}>
              <CourseDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={userAuth ? <Navigate to={"/home"} /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={userAuth ? <Navigate to={"/home"} /> : <SignUpPage />}
        />
        {/* Private routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute
              element={
                <Suspense fallback={<ShimmerList />}>
                  <StudentHome />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/tutorrequest"
          element={<PrivateRoute element={<TutorRequest />} />}
        />
        <Route
          path="/payment"
          element={<PrivateRoute element={<PaymentPage />} />}
        />
        <Route
          path="/mycourses"
          element={
            <PrivateRoute
              element={
                <Suspense fallback={<ShimmerList />}>
                  <MyCoursesPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/course/:coursename/:courseId"
          element={
            <PrivateRoute
              element={
                <Suspense fallback={<ShimmerList />}>
                  <LearningPage />
                </Suspense>
              }
            />
          }
        />
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default UserRouter