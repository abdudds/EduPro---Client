import { useState, useEffect, Fragment } from "react";
import './navbar.css'
import { Link, useNavigate } from "react-router-dom";
import {  Menu, Transition } from "@headlessui/react";
import { BellIcon, ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";


import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

import { FaSearch } from "react-icons/fa";
import axiosInstance from "../../axios/axiosConfig";
import { updateAuthToken, updateUser, userDetails } from "../../redux/authContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
 
export default function Example() {
  const [openNav, setOpenNav] = useState(false);
  const user = localStorage.getItem("access-token");
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userDetails);
  const dispatch =useDispatch()

  // console.log(userInfo)
  
  function handleLogout() {

    let token = localStorage.getItem("refresh-token");
    axiosInstance
      .post("/logout/", { "refresh-token": token }) 
      .then((res) => {
        dispatch(updateUser(null));
        dispatch(updateAuthToken(null));
        dispatch(userDetails(null));
        localStorage.clear();
        axiosInstance.defaults.headers["Authorization"] = null;
        navigate('/')
      })
      .catch((err) => {
        localStorage.clear();
        window.location.reload();
      });
  }



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

   
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="" className="items-center text-black">
          Categories
        </Link>
      </Typography>

      <form className="w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <button>
              <FaSearch className="text-black" />
            </button>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search anything"
            required
          />
        </div>
      </form>
      {user && (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            {!userInfo.is_tutor ? (
              <Link
                to="/becomeTutor"
                className="items-center whitespace-nowrap text-black"
              >
                {" "}
                Teach on Edupro
              </Link>
            ) : (
              <Link
                to="/tutor/courses"
                className="items-center whitespace-nowrap text-black"
              >
                Instructor
              </Link>
            )}
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link
              to="/mycourses"
              className="items-center whitespace-nowrap text-black"
            >
              {" "}
              My learning
            </Link>
          </Typography>
        </>
      )}
    </ul>
  );
 
  return (
    <Navbar className="py-2 px-4 lg:px-8 lg:py-4 rounded">
      <div className="mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to={user?"/home":"/"}>
          <Typography
            as="span"
            className="mr-4 cursor-pointer py-1.5 font-bold text-2xl text-black"
          >
            EduPro
          </Typography>
        </Link>
        <div className="hidden lg:block flex-auto">{navList}</div>

        {
          !user ? (
            <>
              <Link to="/signup">
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block mx-2 bg-blue-500 hover:bg-blue-700 rounded ml-5"
                >
                  <span style={{ textTransform: "capitalize" }}>Sign up</span>
                </Button>
              </Link>
              <Link to="/login">
                {" "}
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block mx-2 bg-blue-500 hover:bg-blue-700 rounded"
                >
                  <span style={{ textTransform: "capitalize" }}>Log in</span>
                </Button>
              </Link>
            </>
          ) : (
            <div className="hidden lg:flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View wishlist</span>
                <HeartIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="mx-3 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View cart</span>
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={userInfo.profile}
                      alt={userInfo.profile}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <li
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {userInfo.email}
                        </li>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <li
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Settings
                        </li>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )

          // <h1 className="text-black">looggedd in</h1>
        }

        <IconButton
          variant="text"
          className="ml-auto pb-4 h-6 w-6 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse
        open={openNav}
        className={`container mx-auto ${!openNav ? "collapse-hidden" : ""}`}
      >
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          <form className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <button>
                  <FaSearch className="text-black" />
                </button>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search anything"
                required
              />
            </div>
          </form>
        </ul>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="" className="flex- items-center text-black">
            Categories
          </Link>
        </Typography>
        {!user ? (
          <>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link to="/createTutor" className="flex items-center text-black">
                Teach on Edupro
              </Link>
            </Typography>
            <Link to="/signup">
              <Button
                variant="gradient"
                size="sm"
                fullWidth
                className="mb-2 bg-blue-500"
              >
                <span style={{ textTransform: "capitalize" }}>Sign Up</span>
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="gradient"
                size="sm"
                fullWidth
                className="mb-2 bg-blue-500"
              >
                <span style={{ textTransform: "capitalize" }}>Log in</span>
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link to="" className="items-center whitespace-nowrap text-black">
                {" "}
                My learning
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link to="" className="items-center whitespace-nowrap text-black">
                {" "}
                Cart
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link
                to="/createTutor"
                className="items-center whitespace-nowrap text-black"
              >
                {" "}
                Wishlist
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <button onClick={handleLogout} className="text-sm text-black">
                Logout
              </button>
            </Typography>
          </>
        )}
      </Collapse>
    </Navbar>
  );
}
