import React from 'react'
import Navbar from "../../components/Navbar/navbar"
import Header from '../../components/User/Courses/header';
import Footer from '../../components/Footer';
import Body from '../../components/User/CourseDetails/Body';


function CourseDetailPage() {
  return (
    <>
      <Navbar />
      <div className="lg:container mx-auto">
        <Header />
        <Body />
        <Footer />
      </div>
    </>
  );
}

export default CourseDetailPage