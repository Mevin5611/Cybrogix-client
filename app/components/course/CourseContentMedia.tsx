import { useGetCourseContnetQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseMedia from "./CourseMedia";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseContentMedia = ({ id, user }: Props) => {
  const { data, isLoading, refetch } = useGetCourseContnetQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  console.log("content", data);
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.content[activeVideo]?.title}
            description="anything"
            keyword={data?.content[activeVideo]?.tags}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <div className="col-span-7">
              <CourseMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                userData={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3 ">
              <CourseContentList
                data={data?.content}
                isDemo={false}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseContentMedia;
