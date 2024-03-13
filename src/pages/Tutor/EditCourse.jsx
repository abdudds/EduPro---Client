import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer";
import {
  FaBook,
  FaClock,
  FaFileLines,
  FaIndianRupeeSign,
  FaLanguage,
  FaLayerGroup,
  FaList,
  FaPenToSquare,
  FaSquareCheck,
  FaVideo,
  FaXmark,
} from "react-icons/fa6";
import { FaArrowAltCircleLeft, FaCog, FaImage } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import axiosInstance from "../../axios/axiosConfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

async function get_skills_with_query(query) {
  if (query == "") {
    return Promise.reject("no data");
  }

  try {
    const res = await axiosInstance.post("tutor/search-skill/", {
      query: query,
    });
    return Promise.resolve(res);
  } catch (error) {
    let d = {
      data: error.response.data,
      query: query,
    };
    return Promise.reject(d);
  }
}

function EditCourse() {
  const [SelectedSkills, Selectskills] = useState([]);
  const [searchedSkills, SetSearchSkills] = useState([]);
  const { course } = useParams(); 
  const SearchInp = useRef(null);
  const navigate = useNavigate();
  const tutor = useSelector((state) => state.tutor.tutorDetails);
  console.log(course, 'edit course', tutor)

  const generateError = (err) => toast.error(err, { position: "top-center" })

  // Fetch course details

  const getCourse = async () => {
    const response = await axiosInstance.get(`tutor/course/${course}`);
    if (response.status === 200) {
      console.log(response.data, 'refetchuing worked');
      Selectskills([...response.data.skill, ...SelectedSkills]);
      return response.data
    } else {
      throw new Error(response.statusText);
    }
  };

  const {
    data: courseQuery,
    isLoading,
    isError,
  } = useQuery(["course", course], getCourse, {enabled:true, refetchOnWindowFocus:false});


  const editCourse = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const banner = e.target.elements.courseimg.files[0];
    const preview = e.target.elements.previewvideo.files[0];

    if (!banner) {
      formData.delete("courseimg");
    }

    if (!preview) {
      formData.delete("previewvideo");
    }

    const inputObject = Object.fromEntries(formData);
    const data = Object.fromEntries(
      Object.entries(inputObject).filter(([key, value]) => value != "")
    );


    const skill = SelectedSkills.map((sk) => {
      return sk.id;
    });

    console.log(skill,'skill worked', data)

    axiosInstance
      .put(
        `tutor/course/${course}/`,
        { ...data, skill: skill },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        toast.success("Changes saved successfully", {
          position: "top-right",
          duration: 3000,
        });
      })
      .catch((err) => {
        toast.error("some error occured, try again", {
          position: "top-center",
          duration: 3000,
        });
      });
  };

  const submitCourse = (e) => {
    axiosInstance
      .put(
        `tutor/course/${course}/`,
        { status: "Submitted" },
      )
      .then((res) => {
        toast.success("Course submitted for uproval successfully", {
          position: "top-right",
          duration: 3000,
        });
        navigate('/tutor/courses')
      })
      .catch((err) => {
        toast.error("some error occured, try again", {
          position: "top-center",
          duration: 3000,
        });
      });
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading course data</p>;
  }

  return (
    <>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="absolute right-4 sm:top-24 sm:right-60 text-xl">
        <Link
          to={"/tutor/courses"}
          className="items-center flex gap-2 text-black underline underline-offset-2"
        >
          <FaArrowAltCircleLeft />
          back
        </Link>
      </div>
      <div className="flex justify-center pb-20">
        <div className="container lg:w-3/5">
          <h1 className="text-4xl pl-8 sm:pl-28 pt-10 font-bold font-serif mb-4">
            {courseQuery ? "Edit Course" : "Add Course"}
          </h1>
          <div className="m-auto border border-gray-300 rounded-lg bg-[#e6e6e6] shadow-xl w-4/5 mx-auto p-3 lg:px-14">
            <Toaster />
            <div className="flex justify-end mt-4">
              <div className="flex gap-1 text-lg font-bold sm:pr-8 ">
                <FaBook className="mt-2" />
                <Link
                  to={`/tutor/add-module/${course}`}
                  className="text-black underline underline-offset-2"
                >
                  modules
                </Link>
              </div>
            </div>
            <form onSubmit={editCourse} className="sm:mt-5">
              <div className="grid md:grid-cols-2 gap-5 md:gap-10">
                <div className="">
                  <div className="flex gap-2 mb-1">
                    <div className="flex justify-center items-center text-emerald-500 text-xl">
                      <FaPenToSquare />
                    </div>
                    <h3>Title</h3>
                  </div>
                  <input
                    type="text"
                    name="title"
                    // defaultValue={courseQuery.title}
                    placeholder={
                      courseQuery ? courseQuery.title : "Enter Title"
                    }
                    className="h-8 w-full pl-2"
                  />
                </div>

                <div className="">
                  <div className="flex gap-2 mb-1">
                    <div className="flex justify-center items-center text-emerald-500 text-xl">
                      <FaImage />
                    </div>
                    <h3>Image</h3>
                  </div>
                  <input
                    type="file"
                    name="courseimg"
                    accept="image/*"
                    className="h-8 w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 md:gap-10 my-4">
                <div className="">
                  <div className="flex gap-2 mb-1">
                    <div className="flex justify-center items-center text-emerald-500 text-xl">
                      <FaList />
                    </div>
                    <h3>Category</h3>
                  </div>
                  <select
                    name="category"
                    defaultValue=""
                    className="flex items-center truncate cursor-pointer h-8 px-2 focus:outline-none focus:ring-1 focus:ring-black w-full overflow-y-auto"
                  >
                    <option value="">Select category</option>
                    <option value="It & Software Development">
                      It & Software Development
                    </option>
                    <option value="Personal Development">
                      Personal Development
                    </option>
                    <option value="Bioinformatics">Bioinformatics</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Music">Music</option>
                  </select>
                </div>

                <div className="">
                  <div className="flex gap-2 mb-1">
                    <div className="flex justify-center items-center text-emerald-500 text-xl">
                      <FaLanguage />
                    </div>
                    <h3>Language</h3>
                  </div>
                  <select
                    name="language"
                    // defaultValue={
                    //   courseQuery ? courseQuery.language : "Select language"
                    // }
                    className="flex items-center cursor-pointer h-8 px-2 focus:outline-none focus:ring-1 focus:ring-black w-full overflow-y-auto"
                  >
                    <option value="">Select language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 md:gap-10">
                <div className="">
                  <div className="flex gap-2 mb-1">
                    <div className="flex justify-center items-center text-emerald-500 text-xl">
                      <FaLayerGroup />
                    </div>
                    <h3>Level</h3>
                  </div>
                  <select
                    name="level"
                    defaultValue={courseQuery ? courseQuery.level : ""}
                    className="flex items-center cursor-pointer h-8 px-2 focus:outline-none focus:ring-1 focus:ring-black w-full overflow-y-auto"
                  >
                    <option value="">Select your experience</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="">
                  <div className="flex gap-2 mb-1">
                    <div className="flex justify-center items-center text-emerald-500 text-xl">
                      <FaClock />
                    </div>
                    <h3>Duration</h3>
                  </div>
                  <input
                    name="duration"
                    defaultValue={courseQuery.duration}
                    type="number"
                    placeholder={
                      courseQuery ? courseQuery.duration : "Enter in months"
                    }
                    className="h-8 w-full pl-2"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 md:gap-10 my-4">
                <div className="">
                  <div className="flex gap-2 mb-1">
                    <div className="flex justify-center items-center text-emerald-500 text-xl">
                      <FaIndianRupeeSign />
                    </div>
                    <h3>Price</h3>
                  </div>
                  <input
                    name="price"
                    type="number"
                    defaultValue={courseQuery.price}
                    placeholder={
                      courseQuery ? `Inr ${courseQuery.price}` : "Enter Price"
                    }
                    className="h-8 w-full pl-2 text-end pr-2"
                  />
                </div>

                <div className="">
                  <div className="flex gap-2 mb-1">
                    <div className="flex justify-center items-center text-emerald-500 text-xl">
                      <FaVideo />
                    </div>
                    <h3>Preview</h3>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    name="previewvideo"
                    className="h-8 w-full"
                  />
                  {/* {previewvideo && <p>Current Video: {previewvideo.name}</p>} */}
                </div>
              </div>

              <div className="">
                <div className="">
                  <div className="flex gap-2 mb-1">
                    <div className="flex justify-center items-center text-emerald-500 text-xl">
                      <FaCog />
                    </div>
                    <h3>Skills</h3>
                  </div>
                  <input
                    type="text"
                    ref={SearchInp}
                    placeholder="Enter Skills"
                    className="h-8 w-full pl-2"
                    onChange={(e) => {
                      get_skills_with_query(e.target.value)
                        .then((res) => {
                          SetSearchSkills(res.data);
                        })
                        .catch((d) => {
                          if (d.data === "null") {
                            SetSearchSkills([
                              { skill: `Add skill "${d.query}" to database` },
                            ]);
                          } else SetSearchSkills([]);
                        });
                    }}
                  />
                </div>
                <ul className="flex gap-2 mt-2 cursor-pointer">
                  {searchedSkills.map((item, idx) => {
                    return (
                      <li
                        className="bg-white rounded px-3 py-2"
                        key={idx}
                        onClick={() => {
                          if (item.skill.includes("Add")) {
                            axiosInstance
                              .post("tutor/add-skill/", {
                                skill: item.skill.split('"')[1],
                              })
                              .then((res) => {
                                Selectskills([res.data, ...SelectedSkills]);
                                console.log(SelectedSkills);
                                SearchInp.current.value = "";
                                SetSearchSkills([]);
                              });
                          } else {
                            SetSearchSkills([]);
                            if (
                              SelectedSkills.filter((sk) => sk.id == item.id)[0]
                            ) {
                              generateError("Skill already added!");
                            } else {
                              Selectskills([...SelectedSkills, item]);
                              console.log(SelectedSkills);
                            }
                            SearchInp.current.value = "";
                          }
                        }}
                      >
                        {item.skill}
                      </li>
                    );
                  })}
                </ul>

                <div className="my-2 mx-3 flex gap-2">
                  {SelectedSkills.map((item, idx) => {
                    return (
                      <div
                        className="flex items-center gap-1 bg-emerald-500 w-fit p-1 px-2 rounded"
                        key={idx}
                      >
                        <p className="text-black">{item.skill}</p>

                        <FaXmark
                          onClick={() => {
                            Selectskills(
                              SelectedSkills.filter((sk) => sk.id != item.id)
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="my-4">
                <div className="flex gap-2 mb-1">
                  <div className="flex justify-center items-center text-emerald-500 text-xl">
                    <FaFileLines />
                  </div>
                  <h3>Description</h3>
                </div>
                <textarea
                  type="text"
                  name="description"
                  defaultValue={courseQuery.description}
                  placeholder={
                    courseQuery ? courseQuery.description : "Enter Description"
                  }
                  className="h-20 w-full pl-2 border border-black focus:ring-1 focus:ring-inset focus:ring-indigo-600"
                />
              </div>

              <div className="flex gap-2 sm:gap-0 justify-between my-10 mx-10">
                <div
                  onClick={submitCourse}
                  className=" bg-emerald-500  hover:bg-emerald-900 text-violet font-bold rounded px-6 py-3"
                >
                  Submit Course
                </div>
                <button
                  type="submit"
                  className=" bg-emerald-500 hover:bg-emerald-900 text-violet font-bold rounded px-6 py-3"
                >
                  {courseQuery ? "Save Changes" : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditCourse;
