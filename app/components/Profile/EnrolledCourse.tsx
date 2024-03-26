import React, { useEffect, useState } from "react";
import CourseCard from "../course/CourseCard";
import { useGetAllCoursesForUsersQuery } from "@/redux/features/courses/coursesApi";

type Props = {
    user:any
};

const EnrolledCourse = ({user}: Props) => {
  const [courseData, setCourseData] = useState([]);
  const { data } = useGetAllCoursesForUsersQuery({});

  useEffect(() => {
    if (data) {
        const filteredCourses = user.courses.map((usercourses:any)=> data.courses.find((course:any)=> course._id === usercourses._id)).filter((course:any)=> course !== undefined)
            setCourseData(filteredCourses);
    }
  }, [data]);
  console.log(data);
  console.log(user);
  console.log(courseData);
  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl dark:text-white text-black 800px:leading-[60px] font-[700] tracking-tight ">
          Enrolled
          <span className="text-gradient bg-gradient-to-r from-pink-500 via-violet-600 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            courses
          </span>
          
        </h1>
        <br />
        <div className="grid  grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[30px] 1500px:grid-cols-3 1500px:gap-[35px] mb-12 border-0">
          {courseData &&
            courseData.map((item: any, index: number) => (
              <CourseCard key={index} course={item} isProfile={true} />
            ))}
        </div>
        {courseData?.length === 0 && (
          <h1 className="text-center font-Poppins text-[18px]">
            You dont have any purchased courses !
          </h1>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourse;
