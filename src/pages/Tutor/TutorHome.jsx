import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import Sidebar from '../../components/Tutor/Sidebar'
import Courses from '../../components/Tutor/Courses';
import Footer from '../../components/Footer'

function TutorHome() {
  return (
    <>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="offset h-[87px]"></div>
      <div className="flex">
        <div className="fixed h-screen hidden md:block md:w-1/3 lg:w-1/6">
          <Sidebar />
        </div>
        <div className="offset md:w-1/3 lg:w-1/6"></div>
        <div className="container md:pl-24">
          <Courses />
        </div>
      </div>
      <Footer  />
    </>
  );
}

export default TutorHome