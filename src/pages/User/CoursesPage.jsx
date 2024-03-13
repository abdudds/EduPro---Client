import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Header from "../../components/User/Courses/header";
import Footer from "../../components/Footer";
import Filter from "../../components/User/Courses/Filter";

const CoursesPage = () => {
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
};

export default CoursesPage;
