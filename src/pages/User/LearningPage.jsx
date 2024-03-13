import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/navbar'
import Body from '../../components/User/LearningRoom/Body';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios/axiosConfig';

function  LearningPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState([]);
  const [modules, setModules] = useState([]);
  const [chapters, setChapters] = useState([]);

  // const firstVideo = chapters.length > 0 ? chapters[0].video : null;

  const fetchCourse = async () => {
    await axiosInstance
      .get(`student/learningroom/${courseId}`)
      .then((res) => {
        setCourse(res.data.course);
        setModules(res.data.modules);
        setChapters(res.data.chapters);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
      <div className="">
        <Navbar />
        <Body course={course} modules={modules} chapters={chapters}/>
      </div>
    </>
  );
}

export default LearningPage