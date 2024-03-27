import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = ({
  data,
  activeVideo,
  setActiveVideo,
  isDemo,
}) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );
  console.log(visibleSections);

  const videoSections: string[] = [
    ...new Set<string>(data?.map((item: any) => item.videoSection)),
  ];
  console.log(videoSections);
  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[15px] w-[60%] ${
        !isDemo && "ml-[-30px] min-h-20vh sticky top-24 left-0 z-30 w-full"
      }`}
    >
      {videoSections.map((section: string, sectionIndex: number) => {
        console.log(section);
        const isSectionVisible = visibleSections.has(section);
        console.log(isSectionVisible);
        //Filter the data based on the section
        const sectionVideos: any[] = data?.filter(
          (item: any) => item.videoSection === section
        );
        const videoCount = sectionVideos.length;
        const sectionVideoLength = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );
        const sectionStartIndex: number = totalCount; //start index of videos within the current section
        totalCount += videoCount; //increment the total count
        const sectionCoutentHours: number = sectionVideoLength / 60;
        return (
          <div
            key={sectionIndex}
            className={`w-full ${
              !isDemo && "border-b border-[#ffffff8e] pb-2 w-full"
            }`}
          >
            <div className="w-full flex">
              {/* Render video section */}
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center text-black dark:text-white">
                  <RiPlayList2Fill size={25} />
                  <h1 className="text-[22px] text-black dark:text-white font-Poppins ps-2 ">
                    {section}
                  </h1>
                </div>
                <button
                  className="mr-4 cursor-pointer text-black dark:text-white "
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
            <h5 className="text-black dark:text-white font-Poppins">
              {videoCount} Lessons{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionCoutentHours.toFixed(2)}{" "}
              {sectionVideoLength < 60 ? "Minutes" : "Hours"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all`}
                      key={item._id}
                      onClick={() =>
                        isDemo ? null : setActiveVideo(videoIndex)
                      }
                    >
                      <div className="flex items-center">
                        <MdOutlineOndemandVideo
                          size={25}
                          className="mr-2"
                          color="#1cdada"
                        />
                        <h1 className=" text-[18px] inline-block break-words text-black dark:text-white font-Poppins">
                          {item.title}
                        </h1>
                      </div>

                      <h5 className="text-[14px] pl-8 text-black dark:text-white">
                        {item.videoLength < 60
                          ? item.videoLength
                          : contentLength.toFixed(2)}{" "}
                        {item.videoLength < 60 ? "Minutes" : "Hours"}
                      </h5>
                    </div>
                  );
                })}{" "}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
