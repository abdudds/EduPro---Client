import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setCourseData } from '../../../redux/Student/CourseOnPayment';
import { Spinner } from '@material-tailwind/react';
import axiosInstance from '../../../axios/axiosConfig';
import Success from './Success';
import Failed from './Failed';

function Payment() {

   const location = useLocation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [courseData, setCourseDataState] = useState({});
  //  const storeData = useSelector((state) => state.CourseOnPayment.courseData);
   const locationData = location.state;
   const [isChecked, setIsChecked] = useState(false);
   const [paymentMode, setPaymentMode] = useState(false);
   const [status, setStatus] = useState('')
   const [message, setMessage] = useState('')

   useEffect(() => {
     if (locationData) {
       setCourseDataState(locationData)}
    //  } else if (storeData) {
    //    setCourseDataState(storeData);
    //  } else {
    //    navigate("/courses");
    //  }

   }, []);

   useEffect(() => {
        const query = new URLSearchParams(window.location.search);
  
        if (query.get("success")) {
          setMessage("Order placed! You will receive an email confirmation.");
          setStatus('success')
        }
        
        if (query.get("canceled")) {
        setMessage(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
        setStatus('failed')
        }
}, []);

  //  console.log(courseData)

   const handlePayment = async () => {
     dispatch(setCourseData(courseData));
     setLoading(true);
     await axiosInstance.post(`student/payment/${courseData.id}`).then((res) => {
       console.log(res);
       setLoading(false);
       window.location.href = res.data.checkout_url;
     })
        .catch((error) => {
          setLoading(false)
          toast.error(error.message);
        });
     } 

  return (
    <div className="h-auto w-full relative py-10 bg-gray-100">
      {message ? (
        status == "success" ? (
          <Success />
        ) : (
          <Failed />
        )
      ) : (
        <>
          <h1 className="text-4xl text-center font-bold">Checkout</h1>
          <div className="flex h-full justify-center text-gray-800 p-8">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
              <div className="lg:col-span-2">
                <h1 className="text-xl font-bold">Order Details</h1>
                <div className="flex justify-between items-center mt-2 px-8 py-5 bg-slate-50">
                  <div>
                    <img
                      className="w-28"
                      src={courseData?.courseimg}
                      alt="Images/Payment/noImagePreview.jpg"
                    />
                  </div>
                  <h2 className="text-sm font-medium  w-1/3">
                    {courseData?.title}
                  </h2>
                  <label className=" text-center text-sm w-1/4 font-medium ml-4">
                    by {courseData?.tutor_name}
                  </label>
                  <h2 className="text-sm font-medium">₹{courseData?.price}</h2>
                </div>
                <h2 className="text-sm mt-4 font-medium">Payment Method</h2>

                <div className="bg-white rounded mt-2 shadow-lg">
                  <div className="flex justify-between items-center px-8 py-5 border-t">
                    <div>
                      <input
                        className={`appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100 focus:ring`}
                        onClick={() => setPaymentMode(!paymentMode)}
                        type="radio"
                        style={{
                          backgroundColor: paymentMode ? "blue" : "transparent",
                        }}
                      />
                      <label className="text-sm font-medium ml-4">Stripe</label>
                    </div>
                    <img
                      className="w-20"
                      src="Images/Payment/1280px-Stripe_Logo,_revised_2016.svg.png"
                      alt=""
                    />
                  </div>
                </div>
                <span className="ml-2 text-xs text-gray-500 mt-2">
                  Please select your payment method
                </span>
              </div>
              <div>
                <h2 className="text-sm font-medium">Purchase Summary</h2>
                <div className="bg-white rounded mt-4 shadow-lg py-6">
                  <div className="px-8 w-full">
                    <img
                      className="object-fill"
                      src="Images/Payment/stripe123.png"
                      alt=""
                    />
                  </div>
                  <div className="px-8 mt-4">
                    <div className="flex items-end justify-between">
                      <span className="text-sm font-semibold">Total </span>
                      <span className="text-sm text-gray-500 mb-px">
                        ₹{courseData?.price}
                      </span>
                    </div>
                  </div>
                  <div className="px-8 mt-4 border-t pt-4">
                    <div className="flex items-end justify-between">
                      <span className="font-semibold">Grand Total (INR)</span>
                      <span className="font-semibold">
                        ₹{courseData?.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center px-8 mt-8">
                    <input
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                      type="checkbox"
                    />
                    <label
                      // onClick={() => loadModal(!modal)}
                      className="text-xs text-gray-500 ml-2 hover:underline"
                    >
                      I agree to the terms and conditions.
                    </label>
                  </div>
                  <div className="flex flex-col px-8 pt-4">
                    <button
                      onClick={() => handlePayment()}
                      className={` flex items-center justify-center
                             bg-blue-600 text-sm font-medium w-full h-10 mt-3 
                             rounded ${
                               isChecked
                                 ? "text-blue-50"
                                 : "text-gray-400 cursor-not-allowed"
                             } hover:bg-blue-700`}
                      disabled={!isChecked}
                    >
                      {" "}
                      {loading ? <Spinner /> : "Complete Checkout "}{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Payment