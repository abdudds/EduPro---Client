import React from 'react'
import {
  StarIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from 'react-router-dom';


function Course({coursedata}) {
  const navigate = useNavigate()

  return (
    <>
      <div className="relative rounded border h-full border-gray-300 overflow-hidden shadow-lg group pb-2">
        <img
          className="w-full h-1/2"
          src={coursedata.courseimg}
          alt="Course Image"
        />
        <div className="py-4 px-6">
          <span className="text-sm font-semibold text-gray-700">
            {coursedata.category}
          </span>
          <div className="">
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
              }}
              className="h-full font-bold mb-1 overflow-hidden"
            >
              {coursedata.title}
            </p>
          </div>
          <p className="text-gray-700 text-base">{coursedata.tutor_name}</p>
          <div className="flex">
            <span>Rating</span>
            <span>⭐⭐⭐⭐⭐</span>
            <span>(598)</span>
          </div>
          <div className="flex justify-between">
            <p className="text-xs">Duration: {coursedata.duration} hrs</p>
            <p className="text-xs">{coursedata.level}</p>
          </div>
          <div className="pt-1 flex justify-between">
            <span className='font-bold'>₹ {coursedata.price}</span>
            {/* <Link to={{ pathname: "/course-details", state: courseData}} className="cursor-pointer text-blue-600 underline">
              course details
            </Link> */}
            <div
              onClick={() => navigate("/course-details", { state: coursedata })}
              className="text-right underline font-poppins cursor-pointer text-blue-800 bg-blue-gray-900/10 flex items-center  
                shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none
                active:scale-100"
            >
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* <HeartIcon
          className="absolute fill-red-600 text-red-700 right-2 top-3 h-10 w-10 opacity-0 transition-opacity  duration-300 group-hover:opacity-100"
          aria-hidden="true"
        /> */}
      </div>
    </>
  );
}

export default Course;