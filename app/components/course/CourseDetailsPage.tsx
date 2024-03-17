import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Header from "../Header";
import Heading from "@/app/utils/Heading";
import CourseDetails from "./CourseDetails";
import CourseContentList from "./CourseContentList";
import Footer from "../Route/Footer";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [course,setCourse] = useState()
  const { data, isLoading } = useGetCourseDetailsQuery(id);

  useEffect(() => {
    setCourse(data?.course)
  }, [data])
  
console.log(course);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
            
          />
         
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={course?.courseData[0]?.title}
              description="course access page"
              keyword={course?.courseData[0]?.tags}
            />

            <div className="col-span-10">
              <CourseDetails
                data={course}
                id={id}
               
              />
            </div>
            
          </div>
        <Footer/>
        </>
      )}
    </>
  );
};

export default CourseDetailsPage;
