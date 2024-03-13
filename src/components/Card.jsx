import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export function Cards({course}) {
  
  return (
    <Link to={`/course/${course.course.title}/${course.course.id}`}>
      <Card className="h-full mx-1">
        <CardHeader shadow={false} floated={false} className="h-1/2 mt-0">
          <img
            src={course.course.courseimg}
            alt="card-image"
            className="h-full w-full"
          />
        </CardHeader>
        <CardBody>
          <div className="">
            <Typography
              variant="small"
              color="gray"
              className="text-lg whitespace-normal font-poppins font-bold overflow-hidden capitalize"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {course.course?.title}
            </Typography>

            <Typography color="blue-gray" className="">
              {course.course?.tutor_name}
            </Typography>
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <div className="w-full flex justify-center relative">
            <hr
              className="w-full"
              style={{ backgroundColor: "blue-gray", height: "" }}
            />
            <div
              className="absolute top-0 left-0 h-full"
              // style={{ width: `${lessonLearnedPercentage}%` }}
            />
          </div>
          <p>65% complete</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
