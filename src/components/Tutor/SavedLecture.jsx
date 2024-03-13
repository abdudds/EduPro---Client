import React, { useEffect, useState } from 'react'
import { Toaster, toast } from "react-hot-toast";
import { FaFile, FaPen, FaTrash, FaVideo } from 'react-icons/fa6';
import Lecture from './Lecture';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../axios/axiosConfig';

function SavedLecture({chapter,index,deleteButton=false,onChange}) {
  const [showLecture, setShowLecture] = useState(true);
  const [lecture, setLecture] = useState(chapter);
  const [chapterName, setChapterName] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [notesName, setNotesName] = useState("");

  const mount = () => {
    if (chapter) {
      setLecture(chapter)
      setChapterName(chapter.title);
      if (chapter.video) {
        const url = new URL(chapter.video);
        setLectureName(url.pathname.split("/").pop());
      }

      if (chapter.pdf) {
        const notesUrl = new URL(chapter.pdf);
        setNotesName(notesUrl.pathname.split("/").pop());
      }
    }
    onChange(false)
  }
  useEffect(mount, [deleteButton]);
  // if (deleteButton) {
  //   console.log('mount worked+++++++++++++++++')
  //   if (chapter) {
  //     setChapterName(chapter.title);
  //     if (chapter.video) {
  //       console.log('first')
  //       const url = new URL(chapter.video);
  //       setLectureName(url.pathname.split("/").pop());
  //     }

  //     if (chapter.pdf) {
  //       console.log("swecond");
  //       const notesUrl = new URL(chapter.pdf);
  //       setNotesName(notesUrl.pathname.split("/").pop());
  //     }
  //   }
  // };
  const handleShowLecture = (bool, val) => {
    setShowLecture(bool);

    if (val) {
      if (val.chapterName) {
        setChapterName(val.chapterName);
        setLecture((chapter) => ({ ...chapter, title: val.chapterName }));
      }
      if (val.lectureName) {
        setLectureName(val.lectureName);
      }
      if (val.videoUrl) {
        setLecture((chapter) => ({ ...chapter, video: val.videoUrl }));
      }
      if (val.notesName) {
        setNotesName(val.notesName);
      }
      if (val.pdfUrl) {
        setLecture((chapter) => ({ ...chapter, pdf: val.pdfUrl }));
      }
    }
  };

  // Delete saved lecture

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteLecture, {
    onSuccess: async() => {
      await queryClient.invalidateQueries(['chapters'])
      onChange(true)
      // setChapterName('')
      // setLectureName('')
      // setNotesName('')
      // setLecture('')
  }
  });

  async function deleteLecture(chapter) {
    const response = await axiosInstance.delete(
      `tutor/chapter/${chapter.id}/?module_id=${chapter.module}`
    );

    if (response.status) {
      console.log('chapter deleted backend')
    } else {
      console.log("eroorrr ocureed add module");
      throw new Error(response.statusText);
    }
  }

  const deleteMutation = () => {
    console.log('del mutation worked')
    mutation.mutate(chapter);
  };

    // const handleDeleteLecture = async () => {
    //   try {
    //     await axiosInstance.delete(
    //       `tutor/chapter/${chapter.id}/?module_id=${chapter.module}`
    //     );
    //     queryClient.invalidateQueries(["chapters"]);
    //     onChange(true);
    //     console.log("Chapter deleted successfully");
    //   } catch (error) {
    //     console.error("Error occurred during chapter deletion:", error.message);
    //   }
    // };

  return (
    <>
      {showLecture ? (
        <div className="flex border-black shadow shadow-slate-700 p-2 mt-4 pb-4 flex-col gap-3">
          <Toaster />

          <div className="flex justify-between mr-4 group">
            <h3 className="font-bold">
              {`Chapter ${index + 1}: ${chapterName}`}
            </h3>
            <div className="flex items-center mr-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <FaPen
                className="ml-2 mr-4 text-emerald-500"
                onClick={() => setShowLecture(false)}
              />
              <FaTrash
                className="text-red-500"
                onClick={deleteMutation}
                // onClick={handleDeleteLecture}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 justify-between">
            <div className="flex gap-2 rounded border border-black w-full px-3">
              <div className="flex items-center">
                <FaVideo />
              </div>
              <div className="truncate items-center gap-2">
                {lectureName ? lectureName : "Add lecture"}
              </div>
            </div>
            <div className="flex gap-2 rounded border border-black w-full px-3">
              <div className="flex items-center">
                <FaFile />
              </div>
              <div className="truncate items-center gap-2">
                {notesName ? notesName : "Add notes"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Lecture chapter={lecture} onChange={handleShowLecture} />
      )}
    </>
  );
}

export default SavedLecture