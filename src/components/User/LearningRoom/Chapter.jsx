import React, { useState } from 'react'
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import { FaCloudArrowDown, FaDownload } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

function Chapter({chapter}) {
  const [chapterVisited, setVisited] = useState(false)
  const dispatch = useDispatch()
 
  const handleVideoClick = (chapter) => {
    dispatch(chapter.video)
    
  };
  // console.log(chapter);
  return (
    <>
      <div className="grid grid-cols-6 border-2 border-b-slate-100 bg-slate-100">
        <div className="cols-span-1 flex justify-center items-center">
          {!chapterVisited ? (
            <FaSquare className="text-white border-2 border-black" />
          ) : (
            <FaCheckSquare className="w-5 h-5"/>
          )}
          {/* <label htmlFor="checkbox" className="ml-2 cursor-pointer relative">
            
            <FaSquare className="text-gray-300 absolute w-6 h-6 inset-0 m-auto" />
          </label> */}
        </div>
        <div className="col-span-4 flex justify-between items-center">
          <p
            className="cursor-pointer"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            onClick={handleVideoClick(chapter)}
          >{`${chapter.chapterNo}. ${chapter.title}`}</p>
        </div>
        <div className="flex justify-center items-center col-span-1">
          <FaCloudArrowDown />
        </div>
      </div>
    </>
  );
}

export default Chapter