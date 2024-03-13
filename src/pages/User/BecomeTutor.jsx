import React, { useState } from 'react'
import { FaChalkboardUser, FaHandsHoldingChild, FaTrophy, FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import './becometutor.css'
import Navbar from "../../components/Navbar/navbar";
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

function becomeTutor() {

  const [show, setShow] = useState(1)
  const [hide1, setHide1] = useState(true)
  const [hide3, setHide3] = useState(true);
  const [hide2, setHide2] = useState(true);
  const history = useNavigate()

  const user = useSelector((state) => state.auth.user);
  console.log(user)

  function signUp() {
    history("/tutorsignup");
  }

  function tutorRequest() {
    history("/tutorrequest");
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="container w-full">
          {/*Section - 1 */}

          <div className="relative">
            <div className="">
              <img
                src="Images/Home/teacher.jpg"
                className="banner-image w-full h-[80vh] md:h-auto object-cover"
              />
            </div>
            <div className="absolute hidden banner-text md:block md:right-28 lg:right-72">
              <h1 className="font-bold font-serif lg:text-start md:text-4xl lg:text-5xl text-white">
                Come teach&nbsp;
                <br />
                with us
              </h1>
              <p className="lg:text-2xl md:text-gray-400 pt-5">
                Join us as an educator and&nbsp;
                <br className="" />
                make a big impact
              </p>
              <button
                onClick={() => (!user ? signUp() : tutorRequest())}
                className="xl:mt-8 mt-5 bg-blue-700 hover:bg-blue-900 text-white font-bold md:text-xs lg:text-lg md:py-3 md:px-6 lg:py-4 lg:px-8 rounded-full"
              >
                GET STARTED
              </button>
            </div>
            <div className="p-5 md:hidden banner-text_1">
              <h1 className="text-3xl md:text-4xl text-start font-bold">
                Come teach with us
              </h1>
              <p className="text-xl text-start text-black font-bold pt-3">
                Join us as an educator and make a big impact
              </p>
              <button
                onClick={() => signUp()}
                className="mt-5 -ml-52 bg-blue-700 hover:bg-blue-900 text-white text-sm py-3 px-6 rounded-full"
              >
                GET STARTED
              </button>
            </div>
          </div>

          {/*Section - 2 */}

          <div className="pb-24">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold pt-12 pb-3 lg:py-14 text-center">
              So many reasons to start
            </h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-between md:w-full lg:w-4/5">
                <div className="p1">
                  <div className="flex justify-center items-center rounded-full mr-5">
                    <FaChalkboardUser className="p-3 text-8xl text- text-center" />
                  </div>
                  <h3 className="text-center text-2xl font-mono font-extrabold">
                    Teach your way
                  </h3>
                  <p className="text-center pt-2">
                    Publish the course you want, in the way you want, always
                    have control of your own content.
                  </p>
                </div>
                <div className="p1">
                  <div className="flex justify-center items-center rounded-full mr-5">
                    <FaHandsHoldingChild className="p-3 text-8xl text-black text-center" />
                  </div>
                  <h3 className="text-center text-2xl font-mono font-extrabold">
                    Inspire learners
                  </h3>
                  <p className="text-center pt-2">
                    Teach what you know and help learners explore their
                    interests, gain new skills, and advance their careers.
                  </p>
                </div>
                <div className="p1">
                  <div className="flex justify-center items-center rounded-full mr-5">
                    <FaTrophy className="p-3 text-8xl text-black text-center" />
                  </div>
                  <h3 className="text-center text-2xl font-mono font-extrabold">
                    Get rewarded
                  </h3>
                  <p className="text-center pt-2">
                    Expand your professional network, build your expertise, and
                    earn money on each paid enrollment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-400 y-banner flex justify-center">
            <div className="lg:w-4/5">
              <div className="grid grid-cols-4 gap-10">
                <div className="py-10">
                  <h2 className="text-center lg:text-6xl text-red font-bold">
                    25M
                  </h2>
                  <p className="">Students</p>
                </div>
                <div className="py-10">
                  <h2 className="text-center lg:text-6xl text-red font-bold">
                    1K
                  </h2>
                  <p className="">Tutors</p>
                </div>
                <div className="py-10">
                  <h2 className="text-center lg:text-6xl text-red font-bold">
                    180+
                  </h2>
                  <p className="">Countries</p>
                </div>
                <div className="py-10">
                  <h2 className="text-center lg:text-6xl text-red font-bold">
                    5K
                  </h2>
                  <p className="">Courses</p>
                </div>
              </div>
            </div>
          </div>

          {/*Section - 2 */}

          <div className="flex justify-center">
            <div className="py-5 md:py-10 lg:py-16 lg:w-4/5">
              <h2 className="text-2xl md:text-4xl lg:text-5xl text-center font-serif font-bold lg:pb-8">
                How to begin
              </h2>

              <div className="hidden lg:block">
                <div className="flex justify-center">
                  <div className="lg:grid lg:grid-cols-3 gap-10 border-y-2 lg:border-b-2 lg:border-t-0 text-center text-gray-600">
                    <h2
                      onClick={() => setShow(1)}
                      className={`lg:text-2xl font-bold lg:py-5 cursor-pointer hover:text-black ${
                        show == 1 ? "border-b-2 lg:border-black text-black" : ""
                      }`}
                    >
                      Plan your curriculum
                    </h2>
                    <h2
                      onClick={() => setShow(2)}
                      className={`lg:text-2xl font-bold lg:py-5 cursor-pointer hover:text-black ${
                        show == 2 ? "border-b-2 border-black text-black" : ""
                      }`}
                    >
                      Record your video
                    </h2>
                    <h2
                      onClick={() => setShow(3)}
                      className={`lg:text-2xl font-bold lg:py-5 cursor-pointer hover:text-black ${
                        show == 3 ? "border-b-2 border-black text-black" : ""
                      }`}
                    >
                      Launch your course
                    </h2>
                  </div>
                </div>

                <div className="">
                  {show == 1 ? (
                    <div className="p">
                      <div className="grid text-xl lg:grid-cols-2 px-24">
                        <div className="p-20">
                          <p>
                            You start with your passion and knowledge. Then
                            choose a promising topic with the help of our
                            Marketplace Insights tool.
                          </p>
                          <p className="pt-2">
                            {" "}
                            The way that you teach — what you bring to it — is
                            up to you.
                          </p>
                          <h3 className="py-4 text-2xl font-bold">
                            How we help you
                          </h3>
                          <p>
                            We offer plenty of resources on how to create your
                            first course. And, our instructor dashboard and
                            curriculum pages help keep you organized.
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <img
                            src="Images/Home/plan-your-curriculum-v3.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  ) : show == 2 ? (
                    <div className="p">
                      <div className="grid text-xl lg:grid-cols-2 px-28">
                        <div className="px-16 py-20">
                          <p className="p-1">
                            Use basic tools like a smartphone or a DSLR camera.
                            Add a good microphone and you’re ready to start.
                          </p>
                          <p>
                            If you don’t like being on camera, just capture your
                            screen. Either way, we recommend two hours or more
                            of video for a paid course.
                          </p>
                          <h3 className="py-4 text-2xl font-bold">
                            How we help you
                          </h3>
                          <p>
                            Our support team is available to help you throughout
                            the process and provide feedback on test videos.
                          </p>
                        </div>
                        <div className="p">
                          <img
                            src="Images/Home/record-your-video-v3.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p">
                      <div className="grid text-xl lg:grid-cols-2 px-24">
                        <div className="px-20 py-16">
                          <p>
                            Gather your first ratings and reviews by promoting
                            your course through social media and your
                            professional networks. Your course will be
                            discoverable in our marketplace where you earn
                            revenue from each paid enrollment.
                          </p>
                          <h3 className="py-4 text-2xl font-bold">
                            How we help you
                          </h3>
                          <p>
                            Our custom coupon tool lets you offer enrollment
                            incentives while our global promotions drive traffic
                            to courses. There’s even more opportunity for
                            courses chosen for Udemy Business.
                          </p>
                        </div>
                        <div className="p">
                          <img
                            src="Images/Home/launch-your-course-v3.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="grid px-5 md:pb-10">
              <div className=" border-gray-400 border-t-2">
                <div className="flex justify-between">
                  <h3 className="py-2 md:text-xl font-bold">
                    Plan your curriculum
                  </h3>
                  {!hide1 ? (
                    <div onClick={() => setHide1(true)} className="py-3">
                      <FaAngleUp />
                    </div>
                  ) : (
                    <div onClick={() => setHide1(false)} className="py-3">
                      <FaAngleDown />
                    </div>
                  )}
                </div>

                <div className={`${hide1 ? "hidden" : ""}`}>
                  <div className="flex justify-center">
                    <img src="Images/Home/plan-your-curriculum-v3.jpg" alt="" />
                  </div>
                  <div className="">
                    <p className="px-10">
                      You start with your passion and knowledge. Then choose a
                      promising topic with the help of our Marketplace Insights
                      tool.
                    </p>
                    <p className="px-10 pt-1">
                      The way that you teach — what you bring to it — is up to
                      you.
                    </p>
                    <h3 className="py-4 text-lg font-bold">How we help you</h3>
                    <p className="px-10 pb-4">
                      We offer plenty of resources on how to create your first
                      course. And, our instructor dashboard and curriculum pages
                      help keep you organized.
                    </p>
                  </div>
                </div>
              </div>

              <div className=" border-gray-400 border-y-2">
                <div className="flex justify-between">
                  <h3 className="py-2 md:text-xl font-bold">
                    Record your video
                  </h3>
                  {!hide2 ? (
                    <div onClick={() => setHide2(true)} className="py-3">
                      <FaAngleUp />
                    </div>
                  ) : (
                    <div onClick={() => setHide2(false)} className="py-3">
                      <FaAngleDown />
                    </div>
                  )}
                </div>

                <div className={`${hide2 ? "hidden" : ""}`}>
                  <div className="flex justify-center">
                    <img src="Images/Home/record-your-video-v3.jpg" alt="" />
                  </div>
                  <div className="">
                    <p className="px-10">
                      Use basic tools like a smartphone or a DSLR camera. Add a
                      good microphone and you’re ready to start.
                    </p>
                    <p className="px-10">
                      If you don’t like being on camera, just capture your
                      screen. Either way, we recommend two hours or more of
                      video for a paid course.
                    </p>
                    <h3 className="py-4 text-lg font-bold">How we help you</h3>
                    <p className="px-10 pb-4">
                      Our support team is available to help you throughout the
                      process and provide feedback on test videos.
                    </p>
                  </div>
                </div>
              </div>

              <div className=" border-gray-400 border-b-2">
                <div className="flex justify-between">
                  <h3 className="py-2 md:text-xl font-bold">
                    Launch your course
                  </h3>
                  {!hide3 ? (
                    <div onClick={() => setHide3(true)} className="py-3">
                      <FaAngleUp />
                    </div>
                  ) : (
                    <div onClick={() => setHide3(false)} className="py-3">
                      <FaAngleDown />
                    </div>
                  )}
                </div>

                <div className={`${hide3 ? "hidden" : ""}`}>
                  <div className="flex justify-center">
                    <img src="Images/Home/plan-your-curriculum-v3.jpg" alt="" />
                  </div>
                  <div className="">
                    <p className="px-10">
                      Gather your first ratings and reviews by promoting your
                      course through social media and your professional
                      networks.
                    </p>
                    <p className="px-10 pt-1">
                      Your course will be discoverable in our marketplace where
                      you earn revenue from each paid enrollment.
                    </p>
                    <h3 className="py-4 text-lg font-bold">How we help you</h3>
                    <p className="px-10 pb-4">
                      Our custom coupon tool lets you offer enrollment
                      incentives while our global promotions drive traffic to
                      courses. There’s even more opportunity for courses chosen
                      for Udemy Business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center bg-gray-100">
            <div className="grid justify-center p-20">
              <h1 className="md:text-4xl text-xl lg:text-5xl text-center font-bold">
                Become an instructor today
              </h1>
              <p className="md:text-2xl py-5 md:py-8 text-center">
                Join one of the world’s largest online learning
                <br className="hidden md:block" /> marketplaces.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => (!user ? signUp() : tutorRequest())}
                  className="bg-blue-700 hover:bg-blue-900 text-white font-serif md:text-xs lg:text-lg py-2 px-4 md:py-3 md:px-6 rounded-full"
                >
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default becomeTutor