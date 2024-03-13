import React from 'react'
import { StarIcon, HeartIcon } from "@heroicons/react/24/outline";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';


function Course({courses}) {
  
  const course = courses.id;
  const title = courses.title
  const navigate = useNavigate()
  
  const editCourse = () =>
    navigate(`/tutor/edit-course/${course}`)
  const editModules = () => navigate(`/tutor/add-module/${course}/${title}`);

  return (
    <>
      <div className="overflow-hidden border border-gray-500  shadow-lg group">
        <div className="flex gap-3 justify-between p-3 border border-black mb-2">
          <h3
            className="underline cursor-pointer hover:text-red-500 mt-[-3px] font-bold text-violet-700"
            onClick={editModules}
          >
            modules
          </h3>
          {courses.status != "Submitted" && (
            <div className="flex justify-end">
              <span
                className="text-emerald-500 mr-3 cursor-pointer"
                onClick={editCourse}
              >
                <FaEdit />
              </span>
              <span className="hover:text-red-500 cursor-pointer">
                <FaTrash />
              </span>
            </div>
          )}
        </div>
        <img className="w-full" src={courses.courseimg} alt="Course Image" />
        <div className="px-6 py-4">
          <h3 className="font-bold">{courses.title}</h3>
          {/* <span className="text-sm font-semibold text-gray-700">Category</span> */}
          {/* <div className="font-bold mb-1">
            {course.course.category}
          </div> */}
          {/* Microsoft Excel - Excel from Beginner to Advanced */}

          {/* <p className="text-gray-700 text-base">Tutor name</p>
          <div className="flex">
            <span>Rating</span>
            <span>⭐⭐⭐⭐⭐</span>
            <span>(598)</span>
          </div>
          <div className="pt-1 flex justify-between">
            <span>₹ 999</span>
            <span className="">+Add to cart</span>
          </div> */}
          <p>
            Status: <span>{courses.status}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Course