import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { FaFile, FaPen, FaTrash, FaVideo } from 'react-icons/fa6';
import axiosInstance from '../../axios/axiosConfig';

function Lecture({ onChange,module,chapter }) {
  const [chapterName, setChapterName] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [notesName, setNotesName] = useState("");
  const [notes, setNotes] = useState([]);
  const [video, setVideo] = useState([]);
  const [duration, setDuration] = useState(null);
  const [moduleId, setModule] = useState()

  console.log(duration,'+++++++++')

  useEffect(()=>{
    if (chapter) { 
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

    if (!module) setModule(chapter.module)
    else setModule(module.id)
  },[])

  const generateError = (err) => toast.error(err, { position: "top-center" });
  
  const handleVideoFile = (e) => {
    const file = e.target.files[0];
    setVideo(file)
    if (file) {
      setLectureName(file.name);
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        setDuration(video.duration.toFixed(0));
      };
      video.src = window.URL.createObjectURL(file);
    }
  };

  const handleNotes = (e) => {
    const file = e.target.files[0];
    setNotes(file)
    if (file) {
      setNotesName(file.name);
    }
  };

  const cancelChapter = () => onChange(true);

  // Creating new chapters
  const queryClient = useQueryClient();

  const chapterMutation = useMutation(addChapter, {
    onSuccess: () => {
      setChapterName("");
      setLectureName("");
      setNotesName("");
      onChange(true);
    },
    onError: (error) => {},
  });

  async function addChapter() {
    const response = await axiosInstance.post(
      "tutor/chapter/?module_id=" + moduleId,
      {
        module: moduleId,
        title: chapterName,
        video,
        videoDuration: duration,
        pdf: notes,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (response.status == 201) {
      queryClient.setQueriesData(["chapters"], (old) => {
         return [...old, response.data];
        });
    } else {
      console.log("eroorrr ocureed add module", response);
      throw new Error(response.statusText);
    }
  }
  const saveChapter = (e) => {
    e.preventDefault();
    if (!chapterName.trim()
    ) {
      generateError("Please enter the chapter name");
      return;
    }
    if (!lectureName.trim()) {
      generateError("Please add lecture");
      return;
    }
    chapterMutation.mutate();
  };

  // Edit saved chapter

  const editMutation = useMutation(editChapter, {
    onSuccess: (data) => {
      const val = { chapterName, lectureName, notesName, videoUrl:data.video, pdfUrl:data.pdf };
      onChange(true,val);
    },
    onError: (error) => {},
  });

  async function editChapter() {
    const response = await axiosInstance.put(
      `tutor/chapter/${chapter.id}/?module_id=${chapter.module}`,
      {
        module: moduleId,
        title: chapterName,
        video,
        pdf: notes,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (response.status == 200) {
      return response.data
    } else {
      console.log("eroorrr ocureed add module");
      throw new Error(response.statusText);
    }
  }

  const editChapterSave = (e) => {
    e.preventDefault();
    editMutation.mutate();
  };

  return (
    <>
      <div className="flex border-black shadow shadow-slate-700 p-2 mb-4 flex-col gap-3">
        <Toaster />
        <div className="flex justify-between mr-4">
          <h3 className="font-bold">
            {chapter
              ? `Chapter ${chapter.chapterNo}: ${chapter.title}`
              : "New chapter"}
          </h3>
          {chapter && (
            <button
              onClick={cancelChapter}
              className="mr-5 font-bold text-gray-600"
            >
              X
            </button>
          )}
        </div>
        <input
          className="border rounded h-10 border-black px-2"
          type="text"
          name="lectureTitle"
          onChange={(e) => setChapterName(e.target.value)}
          placeholder={chapter ? "Enter new chapter name" : "Add chapter name"}
        />
        <div className="grid grid-cols-2 gap-2 justify-between">
          <div className="relative">
            <input
              className="opacity-0 relative z-10"
              onChange={handleVideoFile}
              type="file"
              accept="video/*"
              name="lectureVideo"
              placeholder=""
            />
            <div className="absolute rounded truncate top-0 border border-black w-full px-3">
              {lectureName ? (
                lectureName
              ) : (
                <span className="flex items-center gap-2">
                  <FaVideo />
                  Add Lecture
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <input
              className="opacity-0 relative z-10"
              onChange={handleNotes}
              type="file"
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              name="lectureNote"
              placeholder=""
            />
            <div className="absolute rounded truncate top-0 border border-black w-full px-3">
              {notesName ? (
                notesName
              ) : (
                <span className="flex items-center gap-2">
                  <FaFile />
                  Add Notes
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            type="submit"
            onClick={!chapter ? saveChapter : editChapterSave}
            className="bg-black text-white text-center text-base px-4 py-2 font-bold  cursor-pointer"
          >
            {!chapter ? "Save Chapter" : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Lecture