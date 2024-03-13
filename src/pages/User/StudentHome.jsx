import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import Header from '../../components/User/Courses/header';
import Filter from '../../components/User/Courses/Filter';
import Footer from '../../components/Footer';

function StudentHome() {
  return (
    <div>
      <Navbar />
      <div className="lg:container mx-auto">
        <Header />
        <Filter />
        <Footer />
      </div>
    </div>
  );
}

export default StudentHome