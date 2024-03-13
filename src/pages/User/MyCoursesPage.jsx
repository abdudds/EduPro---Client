import React from 'react'
import Navbar from "../../components/Navbar/navbar";
import Footer from '../../components/Footer';
import Body from '../../components/User/MyCourses/Body';

function MyCoursesPage() {
  return (
    <>
      <Navbar />
      <div className="md:container mx-auto">
        <Body />
      </div>
      <Footer />
    </>
  );
}

export default MyCoursesPage