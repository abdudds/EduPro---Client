import React from 'react'
import { FaSearch } from 'react-icons/fa';
import Course from './Course';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from '../../axios/axiosConfig';
import { useSelector } from 'react-redux';

function Courses() {

  const getCourses = async () => {
    const response = await axiosInstance.get(
      "tutor/course/" 
    );
    if (response.status === 200) {
      console.log(response.data,'+++');
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  };

  // Fetch saved courses
  const courseQuery = useQuery(["courses"], getCourses);

  return (
    <div className="container px-5 md:pl-2 pt-12 w-full">
      <h1 className="text-3xl font-bold font-serif">Courses</h1>
      <div className="flex justify-end md:justify-between mt-7 lg:pr-10">
        <div className="hidden md:flex border-2 border-black h-12 ">
          <input className="pl-2" placeholder="Search your course" />
          <div className="flex justify-center items-center bg-black text-white w-12 text-xl">
            <FaSearch />
          </div>
        </div>
        <Link to="/tutor/add-course">
          <div className="bg-emerald-500 h-12 px-3 pt-3 text-white font-bold">
            {!courseQuery?'Create your course': 'New Course'}
          </div>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-10 lg:grid-cols-4 py-10">
        {courseQuery.data?.map((course, index) => (
                <Course key={index} index={index} courses={course} />
              ))}
      </div>
    </div>
  );
}

export default Courses