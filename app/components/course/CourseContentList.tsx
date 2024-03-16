import React, { FC } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
 /*  activeVideo?: number;
  setActiveVideo?: any; */
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = ({
  data,
  /* activeVideo,
  setActiveVideo, */
  isDemo,
}) => {
  return <div className={`mt-[15px] w-full ${!isDemo && 'ml-[-30px] min-h-20vh sticky top-24 left-0 z-30'}`}>
  {videoSections.map((section: string, sectionIndex: number) => {
    console.log(section)
    const isSectionVisible = visibleSections.has(section);
    console.log(isSectionVisible)
    //Filter the data based on the section
    const sectionVideos: any[] = data?.filter((item: any) => item.videoSection === section)
    const videoCount = sectionVideos.length;
    const sectionVideoLength = sectionVideos.reduce((totalLength: number, item: any) => totalLength + item.videoLength, 0)
    const sectionStartIndex: number = totalCount; //start index of videos within the current section
    totalCount += videoCount; //increment the total count
    const sectionCoutentHours: number = sectionVideoLength / 60
    return (<div key={sectionIndex} className={`w-full ${!isDemo && 'border-b border-[#ffffff8e] pb-2'}`}>

      <div className="w-full flex">
        {/* Render video section */}
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[22px] text-black dark:text-white">{section}</h1>
          <button className='mr-4 cursor-pointer text-black dark:text-white'
            onClick={() => toggleSection(section)}>
            {isSectionVisible ? (<BsChevronUp size={20} />) : (<BsChevronDown size={20} />)}</button>
        </div>
      </div>
      <h5 className="text-black dark:text-white">
      {videoCount}  Lessons {' '} {sectionVideoLength < 60 ? sectionVideoLength : sectionCoutentHours.toFixed(2)}{' '}
        {sectionVideoLength < 60 ? 'Minutes' : 'Hours'}
      </h5>
      <br />
      {isSectionVisible && (
        <div className="w-full">
          {sectionVideos.map((item: any, index: number) => {
            const videoIndex: number = sectionStartIndex + index;
            const contentLength: number = item.videoLength / 60
            return (
              <div className={`w-full ${videoIndex === activeVideo ? 'bg-slate-800' : ''} cursor-pointer transition-all`} key={item._id}
                onClick={() => isDemo ? null : setActiveVideo(videoIndex)}>
                <div className="flex items-center">
                  <MdOutlineOndemandVideo size={25}
                    className='mr-2' color='#1cdada' />
                  <h1 className=" text-[18px] inline-block break-words text-black dark:text-white">
                    {item.title}
                  </h1>
                </div>

                <h5 className="text-[18px] pl-8 text-black dark:text-white">
                  {item.videoLength < 60 ? item.videoLength : contentLength.toFixed(2)}{' '}
                  {item.videoLength < 60 ? 'Minutes' : 'Hours'}
                </h5>
              </div>


            )
          }
          )}  </div>

      )}

    </div>
    )
  })}</div>;
};

export default CourseContentList;
