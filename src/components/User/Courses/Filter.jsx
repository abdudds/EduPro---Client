import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../axios/axiosConfig'
import { debounce } from "lodash"; 
import toast from 'react-hot-toast'
import Body from './Body'
import { setCoursesLoad } from '../../../redux/Client/CoursesLoad'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Filter() {
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const dispatch = useDispatch()
  const CourseDataRedux= useSelector((store)=>store.CoursesLoad.courseData)
  const [courseData,setCourseData] = useState([])
  const [loading,setLoading] = useState(false)
  const [category,setCategory] = useState([{id:'All',category:'All',checked:true}])
  const [filter, setFilter] = useState({
    category: "All",
    level: "All",
    price: "All",
    search: "All",
  });
  const [hasMoreData, setHasMoreData] = useState(true);
  const [DataToSkipCount, setDataToSkipCount] = useState(0);

  const resetFilter = (e) => {
    e.preventDefault();
    setFilter({
      category: "All",
      level: "All",
      price: "All",
      search: "All",
    });
  };

  const fetchCourses = async () => {
    if (
    filter.category !== "All" ||
    filter.level !== "All" ||
    filter.price !== "All" ||
    filter.search !== "All"
    ) {
    setDataToSkipCount(0);
    }
    setLoading(true);
    await axiosInstance
    .get(
        `courses/?category=${filter.category}&level=${filter.level}&price=${filter.price}&search=${filter.search}&skip=${DataToSkipCount}&limit=9`
    )
    .then((res) => {
        console.log(res.data)
        if (res.data.length < 9) {
        setHasMoreData(false);
        } else if (res.data.length == 9) {
        setHasMoreData(true);
        }
        setCourseData(res.data);
        dispatch(setCoursesLoad(res.data));
    })
    .catch((error) => {
        error.code === "ECONNABORTED"
        ? console.log("Request canceled due to timeout")
        : toast.error(error.message,{position:'top-right'});
    })
    .finally(() => {
        setLoading(false);
    });
    };

    const fetchCategory = async () => {
      await axiosInstance.get("categories").then((res) => {
        setCategory((prev) => [...prev, ...res.data]);
      });
    };  

   const debouncedFetchCourses = debounce(fetchCourses, 1000);
   let [isInitialMount, setInitailMount] = useState(true);

   useEffect(() => {
     if (!isInitialMount) {
       debouncedFetchCourses();
     } else {
       setInitailMount(false);
     }
     return () => {
       debouncedFetchCourses.cancel();
     };
   }, [filter, DataToSkipCount]);

   useEffect(() => {
     if (!CourseDataRedux) {
       debouncedFetchCourses();
     } else {
       setCourseData(CourseDataRedux);
     }

     if (category.length < 2) {
       fetchCategory();
     }

   }, []);



    const debouncedHandleChange = debounce((value) => {
      setFilter((prev) => ({ ...prev, search: value }));
    }, 1000);

    const handleSearchChange = (e) => {
      const { value } = e.target;
      debouncedHandleChange.cancel();
      debouncedHandleChange(value === "" ? "All" : value);
    };

    const handlePagination = (event) => {
      if (hasMoreData && event == "next") {
        setDataToSkipCount((prev) => prev + 9);
      } else if (DataToSkipCount !== 0 && event == "prev") {
        setDataToSkipCount((prev) => prev - 9);
      }
    };

    const sortOptions = [
    { name: "Price Low to High", href: "#", current: false },
    { name: "Price High to Low", href: "#", current: false },
    ];

     const handleSort = (option) => {
       if (option == "Price Low to High") {
         const sortedData = courseData
           .slice()
           .sort((a, b) => a.price - b.price);
         setCourseData(sortedData);
       } else if (option == "Price High to Low") {
         const sortedData = courseData
           .slice()
           .sort((a, b) => b.price - a.price);
         setCourseData(sortedData);
       }
     };

     const filters = [
       {
         id: "color",
         name: "level",
         options: [
           { value: "All", label: "All", checked: true },
           { value: "Beginner", label: "Beginner", checked: false },
           { value: "Intermediate", label: "Intermediate", checked: false },
           { value: "Advanced", label: "Advanced", checked: false },
         ],
       },
       {
         id: "size",
         name: "price",
         options: [
           { value: "All", label: "All", checked: true },
           { value: [0, 1000], label: "₹0 - ₹1000", checked: false },
           { value: [1000, 5000], label: "₹1000 - ₹5000", checked: false },
           { value: [5000, 10000], label: "₹5000 - ₹10000", checked: false },
           { value: [10000, 50000], label: "₹10000 - ₹50000", checked: false },
           { value: [50000, Infinity], label: "Above ₹50000", checked: false },
         ],
       },
     ];


  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/*Mobile Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {category.map((category, optionIdx) => (
                        <li key={category.category}>
                          <div className="flex items-center">
                            <input
                              id={`filter-${category.id}-${optionIdx}`}
                              name="category"
                              defaultValue={category.category}
                              type="radio"
                              onChange={(e) =>
                                e.target.checked
                                  ? setFilter((prev) => ({
                                      ...prev,
                                      [e.target.name]: e.target.value,
                                    }))
                                  : null
                              }
                              defaultChecked={category.checked}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div className="cursor-pointer mx-3">
                              {category?.category?.charAt(0).toUpperCase() +
                                category?.category?.slice(1).toLowerCase()}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={section.name}
                                      defaultValue={option.value}
                                      type="radio"
                                      onChange={(e) =>
                                        e.target.checked
                                          ? setFilter((prev) => ({
                                              ...prev,
                                              [e.target.name]: e.target.value,
                                            }))
                                          : null
                                      }
                                      // defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-16">
            <div className="w-full">
              <h1 className="text-4xl font-poppins font-bold tracking-tight text-gray-900 text-center ">
                All Courses
              </h1>
              <div className="text-center font-poppins">
                Broaden your expertise with our comprehensive courses, ranging
                from beginner to advanced levels, across various fields..
              </div>
            </div>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              onClick={() => handleSort(option.name)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flex justify-end items-center my-1">
            <input
              name="search"
              onChange={handleSearchChange}
              type="text"
              className="border-gray-300 rounded-md sm:hidden"
              placeholder="Search here"
            />
          </div>

          <section aria-labelledby="products-heading" className="pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  <input
                    type="text"
                    onChange={handleSearchChange}
                    className="border-gray-300 rounded-md"
                    placeholder="Search here"
                  />
                  <h3 className="font-poppins">Categories</h3>
                  {category.map((category, optionIdx) => (
                    <li key={category.category}>
                      <div className="flex items-center">
                        <input
                          id={`filter-${category.id}-${optionIdx}`}
                          name="category"
                          value={category.category}
                          type="radio"
                          checked={filter.category === category.category}
                          onChange={(e) =>
                            e.target.checked
                              ? setFilter((prev) => ({
                                  ...prev,
                                  [e.target.name]: category.category,
                                }))
                              : null
                          }
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div className="cursor-pointer mx-3">
                          {category?.category?.charAt(0).toUpperCase() +
                            category?.category?.slice(1).toLowerCase()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-poppins font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={section.name}
                                  defaultValue={option.value}
                                  checked={
                                    filter?.[section.name] == option.value
                                  }
                                  type="radio"
                                  onChange={(e) =>
                                    e.target.checked
                                      ? setFilter((prev) => ({
                                          ...prev,
                                          [e.target.name]: e.target.value,
                                        }))
                                      : null
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <div className="w-full flex justify-end">
                  <button
                    onClick={(e) => resetFilter(e)}
                    className="bg-slate-200 border rounded-sm px-1 mt-2"
                  >
                    clear filter
                  </button>
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {<Body loading={loading} courseData={courseData} />}
              </div>
            </div>
          </section>
          <div className="h-24 flex justify-center md:justify-end items-center">
            <div className="w-full md:w-2/3 flex justify-center ">
              <button
                onClick={() => handlePagination("prev")}
                className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white ${
                  !DataToSkipCount ? "bg-gray-200" : "bg-gray-600"
                } rounded-l `}
              >
                <svg
                  className="w-3.5 h-3.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                Prev
              </button>
              <button
                onClick={() => handlePagination("next")}
                className={`flex md:mr-20 items-center justify-center px-4 h-10 text-base font-medium text-white ${
                  hasMoreData ? "bg-gray-600" : "bg-gray-200"
                } border-0 border-l border-gray-700 rounded-r`}
              >
                Next
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Filter