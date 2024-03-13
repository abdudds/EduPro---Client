import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axios/axiosConfig'
import { Cards } from '../../card';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@material-tailwind/react';

function Body() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchCourse = async () => {
      await axiosInstance
        .get("student/purchased-courses/")
        .then((res) => {
          setCourses(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
          setLoading(false);
        });
    };
    useEffect(() => {
      setLoading(true);
      fetchCourse();
    }, []);

  return (
    <>
      <div className="md:container mx-auto bg-slate-100">
        <div className="w-full h-24 bg-black pt-10 px-24">
          <h1 className="text-4xl text-white font-bold font-poppins">
            My Learning
          </h1>
        </div>
        <div className="flex justify-center mt-20 pb-10">
          <div className="w-4/5 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {!loading &&
              courses.map((obj, i) => {
                return (
                  <div key={i} className=" col-span-1 hover:scale-105">
                    <Cards course={obj} />
                  </div>
                );
              })}

            {loading &&
              [...Array(4)].map((obj, i) => {
                return (
                  <Card key={i} className="w-auto mx-1 my-2">
                    <CardHeader shadow={false} floated={false} className="h-56">
                      <div className="w-full h-full animate-pulse bg-slate-300"></div>
                    </CardHeader>
                    <CardBody>
                      <div className="w-full h-2 animate-pulse bg-slate-300">
                        {" "}
                      </div>
                      <div className="w-full h-2 animate-pulse bg-slate-300">
                        {" "}
                      </div>
                    </CardBody>
                    <div className="w-full flex justify-center"></div>
                    <CardFooter className="pt-0 ">
                      <div className="w-full h-full rounded-lg py-3 animate-pulse bg-slate-300">
                        {" "}
                      </div>

                      <Button
                        className="text-right underline text-blue-800 bg-blue-gray-900/10  
                        shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none
                        active:scale-100"
                      >
                        Click Me
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Body