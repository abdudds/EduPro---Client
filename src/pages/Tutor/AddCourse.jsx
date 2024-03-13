import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer";
import {
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
import { FaCog, FaImage } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import axiosInstance from "../../axios/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
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

function AddCourse() {
  const [SelectedSkills, Selectskills] = useState([]);
  const [searchedSkills, SetSearchSkills] = useState([]);
  const SearchInp = useRef(null);
  const navigate = useNavigate()
  const tutor = useSelector((state) => state.tutor.tutorDetails);
  console.log(tutor, "++++++++++=======");
  
  const generateError = (err) => toast.error(err, { position: "top-center" });
  
  const createCourse = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);

    if (
      SelectedSkills.length === 0 ||
      !inputObject.title.trim() ||
      !inputObject.category ||
      !inputObject.language ||
      !inputObject.level ||
      // !inputObject.duration ||
      !inputObject.price ||
      !inputObject.description
    ) {
      generateError("Please enter all details");
      return;
    }

    console.log(SelectedSkills)

    const skill = SelectedSkills.map((sk) => {
      return sk.id; 
    });

    console.log(inputObject,'++++++++++++++++', skill)

    axiosInstance
      .post(
        "tutor/course/",
        { ...inputObject, skill: skill},
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {

       const course = res.data.id
       console.log(res.data)
       localStorage.setItem('courseDetails', course)
        axiosInstance.post(
          "tutor/module/",
          { title: "Introduction", course },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        navigate(`/tutor/add-module/${course}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex justify-center pb-20">
        <div className="container lg:w-3/5">
          <div className="m-auto rounded-lg bg-[#e6e6e6] shadow-xl w-4/5 mx-auto mt-10 p-3 lg:p-14">
            <Toaster />
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold font-serif mb-8">Add Course</h1>
              <Link to={'/tutor/courses'} className="items-center text-black underline underline-offset-2">back</Link>
            </div>
            <form onSubmit={createCourse}>
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
                    placeholder="Enter Title"
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
                    className="flex items-center cursor-pointer h-8 px-2 focus:outline-none focus:ring-1 focus:ring-black w-full overflow-y-auto"
                  >
                    <option value="">Select category</option>
                    <option value="Software Development">
                      Software Development
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
                    type="number"
                    placeholder="Enter in months"
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
                    placeholder="Enter Price"
                    className="h-8 w-full pl-2"
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
                  placeholder="Enter Description"
                  className="h-20 w-full pl-2"
                />
              </div>

              <div className="flex justify-center mt-10">
                <button
                  type="submit"
                  className=" bg-emerald-500 hover:bg-emerald-900 text-white font-bold rounded-full px-6 py-3"
                >
                  Continue
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

export default AddCourse;
