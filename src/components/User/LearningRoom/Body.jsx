import React, { useEffect, useState } from 'react'
import VideoPlayer from '../../VideoPlayer';
import Chapters from './Chapter';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axios/axiosConfig';
import Module from './Module';
import { useSelector } from 'react-redux';

function Body({course, modules, chapters}) {

  const [videoKey, setVideoKey] = useState(0)

  const chapter = useSelector((state) => state.learningRoom.chapter);
  console.log(chapter)
  
  useEffect(()=>{
     if (chapters.length > 0) {
       setVideoKey((prevKey) => prevKey + 1);
     }
     
  },[chapters])

  useEffect(()=>{
    if (chapter) {
      setVideoKey((prevKey) => prevKey + 1);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  },[chapter])

  
  return (
    <div className="">
      <div className="grid md:grid-cols-4">
        <div className="md:col-span-3">
          <div className="h-96">
            { videoKey &&<VideoPlayer
              height={"full"}
              width={"full"}
              key={videoKey}
              chapter={chapter?.chapter || chapters[0]}
              video={chapter?.chapter?.video || chapters[0]?.video}
              controls={true}
              disabled={false}
              autoPlay={true}
            />}
          </div>
        </div>
        
        <div className=" md:col-span-1 w-full md:h-ful">
          <h1 className="text-black w-full border border-slate-300 p-2 font-bold">
            Course Content
          </h1>
          <div  className="overflow-y-scroll scrollbar-hide">
            {modules?.map((module, i)=>
                <Module key={i} module={module} chapters={chapters}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body