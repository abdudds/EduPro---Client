import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios/axiosConfig';
import toast from 'react-hot-toast';
import { setPurchasedCourses } from '../../../redux/Client/CoursesLoad';

function Body() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedcourse = location.state;
    const purchasedCourses = useSelector((store) => store.CoursesLoad.purchasedCourses);
    const [isPurchased, setIsPurchased] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chatLoad, setChatLoad] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [totalRating, setTotalRating] = useState(0);
    const [courseData, setCourseData] = useState(selectedcourse);
    const [tutorData, setTutorData] = useState({});

    console.log(courseData,'+++++++++',tutorData)

    const loadPurchasedCourses = async()=>{
        setLoading(true)
        await axiosInstance.get(`/course-details/${selectedcourse.id}`)
        .then((res)=>{
            console.log(res.data);
            setCourseData({...courseData,...res.data.course})
            setTutorData({ ...tutorData, ...res.data.tutor });
            dispatch(setPurchasedCourses(res.data))
        }).catch((error)=>{
            toast.error(error.message)
            console.log(error);
        }).finally(()=>{
            setLoading(false)
        })
    }
    
    useEffect(()=>{
        loadPurchasedCourses()
    },[])

    useEffect(()=>{
        if(Array.isArray(purchasedCourses) && !loading){
            const purchased = purchasedCourses.filter((value)=>value === courseData.id)
            purchased.length !== 0 ? setIsPurchased(true) : setIsPurchased(false)
        }
        
        
    },[courseData,purchasedCourses])


  return (
    <div>
      {/* section one */}
      <div className="w-full grid md:grid-cols-2">
        <div className="bg-slate-50 h-auto w-full p-8 md:col-span-1">
          <h1 className="underline text-sm font-poppins">Course</h1>
          <br />
          <div className="flex justify-between">
            <h1 className="text-3xl font-poppins">{courseData?.title.charAt(0).toUpperCase() + courseData.title.slice(1)}</h1>
            <h1 className="text-2xl font-poppins">₹{courseData?.price}</h1>
          </div>
          <br />
          {!loading ? (
            <p className="font-sans">{courseData?.description}</p>
          ) : (
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-full h-4 my-2 rounded-md bg-slate-400 animate-pulse"
              ></div>
            ))
          )}
          <br />
          {/* <div className='flex items-center'>
                <StarRating size={'text-2xl'} rating={totalRating} disable={true}/> <p className='ml-4'>{courseData?.user_ratings ? (courseData?.user_ratings?.length+" ratings") : 'No reviews'}</p>
                {isPurchased && <div onClick={()=>setReviewModal(true)} className='ml-5 cursor-pointer underline text-sm bg-slate-300 rounded-md px-1'>Add Review</div>}
                </div> */}
          <br />
          {isPurchased ? (
            <button
              onClick={() => navigate("/userpanel")}
              className="rounded-md text-white btn-sm w-28 bg-blue-600"
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => navigate("/payment", { state: courseData })}
              className="rounded-md text-white btn-sm w-28 bg-blue-600"
            >
              Purchase
            </button>
          )}
        </div>
        <div className="md:col-span-1 flex justify-center">
          <video
            className="w-[500px] lg:w-[600px] h-[300px] lg:h-[400px] rounded-lg p-8 bg-white"
            controls
            autoPlay
            muted
          >
            {!loading && (
              <source src={courseData.previewvideo} type="video/mp4" />
            )}
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      {/* section two */}
      <div className="md:w-11/12 mx-auto h-auto bg-slate-50 mt-2 rounded-md">
        <div className="md:w-11/12 mx-auto h-auto px-11 py-5">
          <div className="bg-amber-500 grid grid-cols-1 md:grid-cols-3 p-5 rounded-3xl gap-3 hover:scale-105 transition">
            <div className=" md:col-span-1 ">
              <img
                className="mx-auto mt-4 object-cover transition-transform  w-60 h-60 rounded-3xl shadow-md drop-shadow-2xl shadow-black"
                src={
                  tutorData.tutor_img
                    ? tutorData.tutor_img
                    : "https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg"
                }
                alt=""
              />
            </div>
            <div className="md:col-span-2 py-8">
              <p className="text-white mb-2">About the Trainer</p>
              <h1 className="text-white text-3xl mb-2">
                {courseData?.tutor_name && courseData.tutor_name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

              </h1>
              {!loading ? (
                <p className="text-white">{tutorData?.about}</p>
              ) : (
                [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-4 my-2 bg-slate-200 animate-pulse rounded-md"
                  ></div>
                ))
              )}
              {/* {!chatLoad ? <button onClick={()=>accessChat()} className='border p-1 font-poppins rounded-lg bg-slate-200 text-black border-white mt-2 flex items-center justify-center w-36'><BiChat className='mx-1'/><p>Chat with me</p></button>
                    : <button className='border p-1 font-poppins rounded-lg bg-slate-200 text-black border-white mt-2 flex items-center justify-center w-36'><Spinner/></button>} */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto bg-blue-50 px-5 py-8 mt-2 rounded-md">
        <h1 className="text-black">What Will You Learn?</h1>
        <ul className="list-disc">
          {!loading &&
            courseData?.skillsOffering?.map((value) => (
              <li className="ml-8 text-black font-poppins ">{value}</li>
            ))}
        </ul>
      </div>
      {/* section three */}
      <h1 className="text-4xl underline mx-auto mt-12 text-center">
        Student Rating
      </h1>

      <div className="grid md:grid-cols-2 w-full h-auto mb-5">
        {/* <div className='col-span-1 my-16 ml-12'>
           { !loading && <AdvRating user_ratings={courseData?.user_ratings} />}
            </div> */}

        <div
          className={`col-span-1 my-16 px-4 ${
            !loading && courseData?.user_ratings?.length && "h-96"
          } overflow-y-auto`}
        >
          <h1 className="font-poppins text-lg">All Reviews</h1>
          {!loading && courseData?.user_ratings?.length ? (
            courseData?.user_ratings?.map((value, i) => {
              return (
                <div className="w-full h-auto bg-slate-50 flex flex-row items-center rounded-md mb-3 ">
                  <div className="w-1/6 h-full p-3 flex justify-center items-center">
                    <div className="mx-auto my-auto h-14 w-14 rounded-full bg-slate-600 flex justify-center items-center text-4xl text-white">
                      {value.user_name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex flex-col h-full ml-2 py-3 w-full overflow-auto">
                    <div className="flex justify-between">
                      <div className="text-lg">
                        {value?.user_name?.charAt(0).toUpperCase() +
                          value?.user_name?.slice(1).toLowerCase()}
                      </div>
                      <StarRating
                        size={"text-1xl"}
                        rating={value?.rating}
                        disable={true}
                      />
                    </div>
                    <p className="text-xs opacity-75">
                      {value?.date?.split("T")[0]}
                    </p>
                    <p className="whitespace-normal break-words">
                      {value?.review}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-24 bg-slate-50 flex flex-row items-center rounded-md mb-3 justify-center">
              No Reviews!!
            </div>
          )}
        </div>
      </div>
      {reviewModal && (
        <ReviewModal
          showModal={setReviewModal}
          success={success}
          addReview={addReview}
        />
      )}
    </div>
  );
}

export default Body