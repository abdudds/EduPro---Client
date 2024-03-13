import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/navbar'
import Courses from '../../components/courseCard'
import { FaGlobe, FaBookOpenReader, FaCertificate } from "react-icons/fa6";
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useSelector } from "react-redux";
import axiosInstance from '../../axios/axiosConfig';
import { Card, CardBody, CardFooter, CardHeader } from '@material-tailwind/react';


function Home() {
  const history = useNavigate()
  const [courseData, setCourse] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("popular/course");
        setCourse(response.data);
      } catch (error) {
        toast.error("Some error occurred. Please try again.", {
          position: "top-center",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function signUp(){
    history("signup/");
  }

  function becomeTutor(){
    history("becometutor");
  }

  const user = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="container w-full">
          {/* Banner Section - 1 */}

          <div className="relative">
            <div
              className="bg-cover bg-center banner-img"
              style={{ backgroundImage: `url('Images/Home/banner_img.jpg')` }}
            ></div>
            <div className="absolute left-5 sm:left-20 top-24 lg:top-28 lg:left-40 md:w-2/5 w-3/4 text-center md:text-left">
              <h1 className="text-white font-bold text-xl md:text-4xl xl:text-5xl xl:mb-8 mb-4">
                Start investing in
                <br className="md:hidden" />
                Your Future Today
              </h1>
              <p className="text-gray-300 leading-10 md:text-2xl">
                Unlock knowledge and skills with over 1300 courses in 25
                subjects taught by the world’s leading universities and brands.
              </p>
              <button
                onClick={() => signUp()}
                className="xl:mt-9 mt-5 bg-blue-700 hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-full"
              >
                JOIN FOR FREE
              </button>
            </div>
          </div>

          {/* Popular Courses */}
          <div className="flex justify-center mb-24">
            <div className="p-4 max-w-full">
              <h1 className="p-12 text-center text-6xl font-bold">
                Popular Courses
              </h1>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-14 justify-center gap-5 md:gap-7">
                
                {loading
                  ? [...Array(4)].map((obj, i) => {
                      return (
                        <Card key={i} className="w-auto mx-1 my-2">
                          <CardHeader
                            shadow={false}
                            floated={false}
                            className="h-56"
                          >
                            <div className="w-full h-full animate-pulse bg-slate-300"></div>
                          </CardHeader>
                          <CardBody>
                            <div className="w-full h-2 animate-pulse bg-slate-300">
                              {" "}
                            </div>
                            <div className="w-full h-2 animate-pulse bg-slate-300">
                              {" "}
                            </div>
                          </CardBody>
                          <div className="w-full flex justify-center"></div>
                          <CardFooter className="pt-0 ">
                            <div className="w-full h-full rounded-lg py-3 animate-pulse bg-slate-300">
                              {" "}
                            </div>

                            <Button
                              className="text-right underline text-blue-800 bg-blue-gray-900/10  
                        shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none
                        active:scale-100"
                            ></Button>
                          </CardFooter>
                        </Card>
                      );
                    })
                  : courseData.map((obj,i) => {
                      return (
                        <Courses key={i} coursedata={obj}/>
                      );
                    })}
              </div>
            </div>
          </div>

          {/* Banner Section - 2 */}

          <div className="grid xl:grid-cols-2">
            <div>
              <img className="w-full" src="Images/Home/banner_img2.jpeg" />
            </div>
            <div className="bg-purple-100 sm:banner-img flex justify-center items-center">
              <div className="md:w-2/ pb-5 md:pl-10 lg:p-20 md:ml-10">
                <h1 className="banner_two_h1 leading-10 pt-10 lg:pt-0 pl-7 md:pl-0 text-3xl sm:text-5xl font-bold">
                  Pick a Course That
                  <br />
                  Makes Your Life
                </h1>
                <p className="py-7 md:py-10 pl-7 md:pl-0 sm:text-2xl text-gray-500 banner_two_p">
                  Looking for your next favorite course?
                  <br />
                  Find our freshest content here. Discover new horizons. Gain
                  knowledge that makes a mind-blowing change in your life.
                  Ready? Let’s get started!
                </p>
                <button onClick={()=>history('/courses')} className="ml-7 md:ml-0 p-5 text-white bg-blue-500 hover:bg-white hover:text-black border-4 hover:border-blue-900 rounded-full">
                  VIEW ALL COURSES
                </button>
              </div>
            </div>
          </div>

          {/* Banner Section - 3 */}

          <div className="grid xl:grid-cols-2">
            <div className="flex justify-center items-center sm:banner-img bg-slate-100 pb-10 pr-10 order-2 xl:order-1">
              <div className="lg:p-16">
                <h1 className="banner_two_h1 leading-10 pt-5 lg:pt-0 pl-7 md:pl-20 text-3xl sm:text-5xl font-bold">
                  Why choose us
                </h1>
                <p className="py-5 md:py-5 pl-7 md:pl-20 sm:text-2xl text-gray-500">
                  EduPro is committed to helping students achieve their goals by
                  providing an innovative environment and making a difference.
                </p>
                <div className="ml-7 md:ml-20 pt-2 rounded ">
                  <div className="flex flex-wrap sm:flex-nowrap justify-center items-center p-3 bg-gray-200 shadow-lg">
                    <div className="flex justify-center items-center bg-blue-800 rounded-full mr-5">
                      <FaGlobe className="p-3 text-7xl text-white text-center" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-center sm:text-start mb-1">
                        Learn from the Best
                      </h3>
                      <p className="text-gray-700 text-center sm:text-start">
                        Certificate courses are instructed by experienced and
                        qualified instructors with Ph.D. and Masters'
                        degrees.Our dedicated faculty's expertise ensures that
                        you receive top-notch guidance and gain invaluable
                        knowledge to excel in your chosen field.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap justify-center items-center p-3 bg-gray-200 shadow-lg my-6">
                    <div className="flex justify-center items-center bg-blue-800 rounded-full mr-5">
                      <FaBookOpenReader className="p-3 text-7xl text-white text-center" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-center sm:text-start mb-1">
                        Set Your Own Learning Pace
                      </h3>
                      <p className="text-gray-700 text-center sm:text-start">
                        If you're a busy parent or a professional and have no
                        time for courses during business hours, you can find an
                        online program that works around your schedule. Is it
                        not that awesome?
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap justify-center items-center p-3 bg-gray-200 shadow-lg">
                    <div className="flex justify-center items-center bg-blue-800 rounded-full mr-5">
                      <FaCertificate className="p-3 text-7xl text-white text-center" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-center sm:text-start mb-1">
                        Graduate in Less Than a Year
                      </h3>
                      <p className="text-gray-700 text-center sm:text-start">
                        Get your degree in the blink of an eye and start writing
                        your success story now. Unlock a world of endless
                        opportunities and pave the way for a brighter future.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center order-1 xl:order-2">
              <img className="w-full" src="Images/Home/banner3.png" />
            </div>
          </div>

          {/* Banner Section - 4 */}

          <div className="flex bg-purple-100 justify-center items-center">
            <div className="w-4/5 my-32  grid md:grid-cols-2">
              <div className="pb-10">
                <div className="flex justify-end pr-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="102.411"
                    height="102.434"
                    viewBox="0 0 102.411 102.434"
                  >
                    <path
                      id="Shape_1"
                      data-name="Shape 1"
                      d="M417.682,3682.968l-10.6-17.681v16.364a2.56,2.56,0,1,1-5.12,0v-16.364l-10.606,17.678a2.559,2.559,0,0,1-2.2,1.245,2.515,2.515,0,0,1-1.316-.364,2.557,2.557,0,0,1-.881-3.512L400,3658.6H378.914a5.121,5.121,0,0,1-5.12-5.122v-40.967a5.12,5.12,0,0,1,5.12-5.121H430.12a5.12,5.12,0,0,1,5.12,5.121v3.912l-5.12,2.56v-6.472H378.914v40.971H430.12V3647.4l5.12-1.279v7.367a5.12,5.12,0,0,1-5.12,5.121H409.037l13.037,21.732a2.554,2.554,0,0,1-.88,3.511,2.5,2.5,0,0,1-1.311.37A2.565,2.565,0,0,1,417.682,3682.968Zm32.92,1.245a5.121,5.121,0,0,1-5.09-4.556l-4.474-40.266-14.8,3.7a5.121,5.121,0,0,1-6.362-4.969V3634.2l-31.428-8.982a2.559,2.559,0,0,1,1.41-4.919l31.6,9.029a5.134,5.134,0,0,1,1.253-.906l20.482-10.243a5.129,5.129,0,0,1,2.29-.541h20.482a5.122,5.122,0,0,1,5.038,4.2l5.121,28.167a5.121,5.121,0,0,1-5.039,6.038h-3.272l-1.866,23.452a5.12,5.12,0,0,1-5.1,4.716Zm0-5.12h10.241l2.24-28.168h8l-5.12-28.168h-7.682v15.581a2.56,2.56,0,1,1-5.12,0v-15.581h-7.681L425,3633v5.122L445.481,3633Zm-10.241-81.943a15.362,15.362,0,1,1,15.362,15.364A15.38,15.38,0,0,1,440.36,3597.149Zm5.121,0a10.241,10.241,0,1,0,10.241-10.244A10.241,10.241,0,0,0,445.481,3597.151Z"
                      transform="translate(-373.794 -3581.784)"
                      fill="#2a3045"
                    ></path>
                  </svg>
                  <div className="px-5">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                      Learners, Start Here
                    </h1>
                    <p className="mt-3">
                      Take the first step toward your
                      <br /> new career or hobby.
                    </p>
                  </div>
                </div>
                <div className="-w-1/2 flex justify-center">
                  <button
                    onClick={() => signUp()}
                    className="xl:mt-9 mt-5 bg-blue-700 hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-full"
                  >
                    START LEARNING
                  </button>
                </div>
              </div>

              <div className="sm:border-l sm:pl-14 border-gray-500">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="102.411"
                    height="102.4"
                    viewBox="0 0 102.411 102.4"
                  >
                    <path
                      id="Shape_1"
                      data-name="Shape 1"
                      d="M1107.277,3684.181a5.123,5.123,0,0,1-5.106-4.717l-2.228-28.043-1.231-12.027-7.2,3.349a11.119,11.119,0,0,0-7.28.478,5.1,5.1,0,0,1-1.645-.272l-12.757-4.322-1.3,12.679-2.239,28.16a5.118,5.118,0,0,1-5.1,4.715h-10.242a5.121,5.121,0,0,1-5.1-4.715l-1.866-23.446h-3.272a5.117,5.117,0,0,1-5.038-6.035l5.12-28.16a5.121,5.121,0,0,1,5.038-4.2h20.482a5.126,5.126,0,0,1,2.54.672l17.887,10.221,12.218-9.772a5.124,5.124,0,0,1,3.2-1.121h20.482a5.121,5.121,0,0,1,5.038,4.2l4.542,24.979h.661a5.12,5.12,0,0,1,5.12,5.12V3663.7a5.12,5.12,0,0,1-5.12,5.12h-9.41l-.847,10.646a5.121,5.121,0,0,1-5.1,4.715Zm-2.239-33.281,2.239,28.16h10.241l.815-10.24h-1.838a5.12,5.12,0,0,1-5.12-5.12v-11.777a5.12,5.12,0,0,1,5.12-5.12h10.521l-4.376-24.064h-7.682v15.574a2.56,2.56,0,1,1-5.12,0v-15.574h-7.682l-12.8,10.24v5.12l13.72-6.383Zm-64.328,0h8l2.239,28.16h10.241l2.239-28.16,1.963-19.183,18.84,6.383v-5.12l-17.922-10.24h-7.681v15.574a2.56,2.56,0,1,1-5.12,0v-15.574h-7.681Zm75.784,12.8h16.386v-11.777h-16.386Zm-19.458-66.56a15.361,15.361,0,1,1,15.361,15.36A15.377,15.377,0,0,1,1097.036,3597.141Zm5.12,0A10.241,10.241,0,1,0,1112.4,3586.9,10.24,10.24,0,0,0,1102.156,3597.141Zm-61.446,0a15.361,15.361,0,1,1,15.361,15.36A15.377,15.377,0,0,1,1040.71,3597.141Zm5.12,0a10.241,10.241,0,1,0,10.241-10.241A10.24,10.24,0,0,0,1045.83,3597.141Z"
                      transform="translate(-1035.589 -3581.781)"
                      fill="#2a3045"
                    ></path>
                  </svg>
                  <div className="px-5">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                      Teachers, Start Here
                    </h1>
                    <p className="mt-3">
                      Teach what you love.
                      <br />
                      Masterstudy gives you the tools to create a course.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => becomeTutor()}
                    className="xl:mt-9 mt-5 bg-blue-700 hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-full"
                  >
                    START TEACHING
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home

