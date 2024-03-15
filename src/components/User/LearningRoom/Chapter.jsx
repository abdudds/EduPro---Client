import React, { useEffect, useState } from 'react'
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import { FaCloudArrowDown, FaDownload } from 'react-icons/fa6';
import { setLoadChapter } from '../../../redux/Student/LoadChapter';
import {Tooltip} from 'react-tooltip'
import { useDispatch } from 'react-redux';

function Chapter({chapter}) {
  const [chapterVisited, setVisited] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleVideoStreamed = () => {
      console.log(' chapter worked event')
      setVisited(true);
    };
    
    const videoElement = document.getElementById('lectureVideo')
    videoElement.addEventListener("videoStreamed", handleVideoStreamed)

    return () => {
      videoElement.removeEventListener("videoStreamed", handleVideoStreamed);
    };
  }, []) 
 
  const handleVideoClick = () => {
    dispatch(setLoadChapter(chapter));
  };

  const handleDownloadClick = async () => {
    try {
      const response = await fetch(chapter.pdf);
      const blob = await response.blob();
      const fileExtension = getFileExtension(blob.type);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${chapter.chapterNo}_${chapter.title}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const getFileExtension = (contentType) => {
    switch (contentType) {
      case "application/pdf":
        return "pdf";
      case "image/png":
        return "png";
      case "image/jpeg":
        return "jpg";
      default:
        return "unknown";
    }
  };
  // console.log(chapter);
  return (
    <>
      <div className="grid grid-cols-6 border-2 border-b-slate-100 bg-slate-100">
        <div className="cols-span-1 flex justify-center items-center">
          {!chapterVisited ? (
            <FaSquare className="text-white border-2 border-black" />
          ) : (
            <FaCheckSquare className="w-5 h-5" />
          )}
        </div>
        <div className="col-span-4 flex justify-between items-center">
          <p
            className="cursor-pointer"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            onClick={handleVideoClick}
          >{`${chapter.chapterNo}. ${chapter.title}`}</p>
        </div>
        {chapter.pdf && (
          <div
            className="flex justify-center items-center col-span-1"
            onClick={handleDownloadClick}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Click here to download the attachment"
          >
            <FaCloudArrowDown />
            <Tooltip id="my-tooltip" place="top" />
          </div>
        )}
      </div>
    </>
  );
}

export default Chapter