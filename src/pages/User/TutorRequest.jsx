import React, { useState } from "react";
import Navbar from '../../components/Navbar/navbar'
import { FaChalkboardUser, FaLanguage, FaUserGraduate, FaUserNinja } from "react-icons/fa6";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import axiosInstance from "../../axios/axiosConfig";
import {useDispatch} from 'react-redux'
import { userDetails } from "../../redux/authContext";
import { useNavigate } from "react-router-dom";

const TutorRequest = () => {
  const [qualification, setQualification] = useState("");
  const [Experience, setExperience] = useState("");
  const [language, setLanguage] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userDetails);

  const generaterror = (err) => toast.error(err, { position: "top-center" });

  const tutorship = (e) => {
    e.preventDefault();
    if (!qualification.trim() || !Experience.trim() || !language.trim()) {
      generaterror("please fill all the field");
    }


   axiosInstance
     .post(
       "tutor/request/",
       {
         qualification,
         "experience":Experience,
         language,
         tutorpic: e.target.tutorpic.files[0],
       },
       { headers: { "Content-Type": "multipart/form-data" } }
     )
     .then((res) => {
       if (res.status) {
         dispatch(userDetails({...user,is_tutor: true}));
         generaterror("Request has been send to admin");
         navigate("tutor/courses");
       }
     });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="flex justify-center container">
          <Toaster />
          <form
            method="post"
            onSubmit={tutorship}
            className="shadow-xl md:p-14 rounded-3xl"
          >
            <div className="py-5">
              <div className="flex justify-center text-emerald-500">
                <FaUserNinja size={30} />
              </div>
              <div className="flex justify-end flex-nowrap pl-16 pt-5">
                <input
                  className="font-bold cursor-pointer"
                  name="tutorpic"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>

            <div className="grid px-5 pb-8 lg:p-0">
              <div>
                <div className="flex items-center mb-3">
                  <div className="mr-2 text-3xl rounded-full text-emerald-500">
                    <FaChalkboardUser size={20} />
                  </div>
                  <label htmlFor="qualification">Qualification</label>
                </div>
                <input
                  className="rounded-lg h-12 px-4 bg-gray-200 focus:outline-none focus:ring-2 w-full mb-2"
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="Enter your qualification"
                />
              </div>

              <div className="my-2">
                <div className="flex items-center mb-3">
                  <div className="mr-2 rounded-full text-emerald-500">
                    <FaUserGraduate size={20} />
                  </div>
                  <label htmlFor="Experience">Experience</label>
                </div>
                <select
                  value={Experience}
                  onChange={(e) => {
                    setExperience(e.target.value);
                  }}
                  className="rounded-lg flex items-center cursor-pointer h-12 px-4 bg-gray-200 focus:outline-none focus:ring-2 w-full mb-2 max-h-28 overflow-y-auto"
                >
                  <option value="">Select your experience</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="">
                <div className="flex items-center mb-3">
                  <div className="mr-2 text-emerald-500">
                    <FaLanguage size={25} />
                  </div>
                  <label htmlFor="Language">Language</label>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-lg flex items-center cursor-pointer h-12 px-4 bg-gray-200 focus:outline-none focus:ring-2 w-full mb-2 max-h-28 overflow-y-auto"
                >
                  <option value="">Select your language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center h-12 bg-emerald-500 rounded font-semibold text-sm text-blue-100 hover:bg-emerald-900 w-full mt-8"
              >
                Request Tutorship
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TutorRequest;
