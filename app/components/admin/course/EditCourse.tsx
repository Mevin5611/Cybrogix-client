"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCourseaQuery,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [EditCourse, { isSuccess, error }] = useEditCourseMutation({});
  const { data } = useGetAllCourseaQuery({});
  const editCourseData = data && data.courses.find((i: any) => i._id === id);

  const [active, setActive] = useState(0);
  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        categories: editCourseData.categories,
        price: editCourseData.price,
        estimatedPrice: editCourseData.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData.thumbnail,
      });

      setBenefits([...editCourseData.benefits]);
      setPrerequisites([...editCourseData.prerequisites]);
      setCourseContentData([...editCourseData.courseData]);
    }
  }, [editCourseData]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    categories: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    //format course content array
    const formattedCourseContentData = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      links: content.links?.map((links) => ({
        title: links.title,
        url: links.url,
      })),
      suggestion: content.suggestion,
    }));
    // prepare our data object

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      benefits: formattedBenefits,
      totalVideos: courseContentData.length,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated Successfully");
      redirect("/admin/courses");
    }

    if (error) {
      if ("data" in error) {
        const errmsg = error as any; // Extract error message
        toast.error(errmsg.data.message); // Render the error message
        console.log(errmsg);
      } else {
        toast.error("An error occurred while updating the course."); // Fallback error message
      }
    }
  }, [isSuccess, error]);

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    console.log(data);

    await EditCourse({ id: editCourseData._id, data });
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            setBenefits={setBenefits}
            setPrerequisites={setPrerequisites}
            prerequisites={prerequisites}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[17%] mt-[100px] h-screen fixed z-[1] top-18 right-0 ">
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
