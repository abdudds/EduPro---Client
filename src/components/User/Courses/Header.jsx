import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import headerImg from "/Images/Home/coursespage.jpg";

function Header() {
    const location = useLocation();
    const courseData = location.state;
    useEffect(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    });
  return (
    <div className="relative w-full h-56 bg-slate-300 mt-1">
      <img
        className="absolute w-full h-full object-cover"
        src={headerImg}
        alt=""
      />
      <div className="absolute grid grid-cols-4 w-full h-full">
        <div className="w-full h-full p-12 col-span-3">
          <h1 className="text-white text-4xl md:text-6xl font-poppins my-1">
            {courseData?.title ? courseData?.title.charAt(0).toUpperCase() + courseData.title.slice(1) : "Elevate Your Skills, Enrich Your Life"}{" "}
          </h1>
          <h2 className="text-white text-lg md:text-2xl font-poppins my-3">
            {courseData?.title ? "" : "with our concept-builder courses"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Header