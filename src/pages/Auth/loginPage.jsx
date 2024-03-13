import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Example from "../../components/Navbar/navbar";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import jwt_decode from 'jwt-decode'
import { Toaster, toast } from 'react-hot-toast'
import {updateUser,updateAuthToken,userDetails} from './../../redux/authContext'
import { updateTutor } from "../../redux/tutorAuth";
 
export default function LoginPage() {

   const history = useNavigate();
   const user = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const response = getLocal();

   useEffect(() => {
     if (response) {
       history("/");
     }
   });

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.email.value.trim() || !e.target.password.value.trim()) {
      handleError("Please fill in all the fields");
      return;
    }

    const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (!e.target.email.value.match(emailRegex)) {
      handleError("Please enter a valid email address");
      return;
    }

    if (e.target.password.value.length < 4) {
      handleError("Password should be at least 6 characters long");
      return;
    }

    const response = await login(e);
    if(response) {
      
    const decoded = jwt_decode(response.access);
  
    dispatch(updateUser(decoded));
    dispatch(updateAuthToken(response));
    }
  };

  const handleError = (err) => {
    toast.error(err);
  };

  async function login(e) {
    let initialResponse = await axiosInstance
      .post("login/", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return 0;
      });
    
    let response = await axiosInstance.post("token/", {
      email: e.target.email.value,
      password: e.target.password.value,
    });

    if (initialResponse.data.user.is_tutor) {
        const tutorResponse = await axiosInstance.get(
          `tutor/${initialResponse.data.user.user_id}/`
        )
        
        if (tutorResponse.status === 200) {
          console.log(tutorResponse.data);
          dispatch(updateTutor(tutorResponse.data.id))
        }
    }


    let data = response.data;
    
    dispatch(userDetails(initialResponse.data.user));
    localStorage.setItem("authToken", JSON.stringify(data));
    localStorage.setItem("access-token", data.access);
    localStorage.setItem('refresh-token',data.refresh)
    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access-token')

    toast.success("Login Success");
    return data;

  }

  function getLocal() {
    let response = localStorage.getItem("access-token");
    return response;
  }


  return (
    <>
      <Example />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome back!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
