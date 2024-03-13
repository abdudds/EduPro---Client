import React, { useState } from 'react'
import { FaBookOpen, FaPlayCircle, FaUserFriends } from 'react-icons/fa'
import { FaStarHalfStroke } from 'react-icons/fa6';

function Sidebar() {
  const [show, setShow] = useState(1)
  return (
    <>
      <div className=" bg-black container h-full">
        <div className="grid py-10">
          <div
            onClick={() => setShow(1)}
            className={`flex items-center border-l-4 border-black h-12 ${
              show == 1 ? "border-emerald-500" : ""
            } hover:bg-gray-700 text-white`}
          >
            <div className="p-4 text-xl">
              <FaBookOpen />
            </div>
            <div className="pl-2 font-serif font-bold  tracking-wider">
              Courses
            </div>
          </div>

          <div
            onClick={() => setShow(2)}
            className={`flex items-center border-l-4 border-black h-12 ${
              show == 2 ? "border-emerald-500" : ""
            } hover:bg-gray-700 text-white`}
          >
            <div className="p-4 text-xl">
              <FaUserFriends />
            </div>
            <div className="pl-2 font-serif font-bold  tracking-wider">
              Students
            </div>
          </div>

          <div
            onClick={() => setShow(3)}
            className={`flex items-center border-l-4 border-black h-12 ${
              show == 3 ? "border-emerald-500" : ""
            } hover:bg-gray-700 text-white`}
          >
            <div className="p-4 text-xl">
              <FaStarHalfStroke />
            </div>
            <div className="pl-2 font-serif font-bold  tracking-wider">
              Ratings
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar