import React, { useEffect } from 'react'
import axiosInstance from '../axios/axiosConfig';
import { useDispatch } from 'react-redux';
import { setWatched } from '../redux/Student/LoadChapter';


function VideoPlayer({ height, width, video, disabled, autoPlay, controls, chapter }) {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const videoElement = document.getElementById("lectureVideo");

    if (videoElement) {
      const handleTimeUpdate = () => {
        console.log("event worked");
        const currentTime = videoElement.currentTime;
        const duration = videoElement.duration;
        const streamed = (currentTime / duration) * 100;

        if (streamed > 2) {
          axiosInstance
            .post("student/learning/", {
              chapter: chapter.id,
              chapter_completed: 'True',
            })
            .then((res) => {
              console.log(res.data);
              videoElement.removeEventListener("timeupdate", handleTimeUpdate);
              dispatch(setWatched(res.data));
            })
            .catch((error) => console.error("Error fetching courses:", error));
                    
        }
      }

      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      
      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  },[]);
  

  return (
    <video
      id="lectureVideo"
      className={`h-${height} w-${width}`}
      controls={controls}
      autoPlay={autoPlay}
      muted
      disabled={disabled}
      controlsList="nodownload"
    >
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer