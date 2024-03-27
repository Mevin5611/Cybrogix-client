import toast from "react-hot-toast";
import { styles } from "../../../../app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handelCourseSubmit,
}) => {
  const [isCollapsed, setCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const handelCollapseToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setCollapsed(updateCollapsed);
  };

  const handelRemoveLink = (index: number, linkIndex: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.splice(linkIndex, 1);
    setCourseContentData(updateData);
  };

  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index]?.links?.push({ title: "", url: "" });
    setCourseContentData(updateData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.suggestion === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        // use the last videoSection if available else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        suggestion: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].suggestion === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all fields first");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        suggestion: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const handelPrev = () => {
    setActive(active - 1);
  };
  const handelNext = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].suggestion === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all fields first");
    } else {
      setActive(active + 1);
      handelCourseSubmit();
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full dark:bg-gray-800 bg-gray-50 p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        placeholder="Untitled Section"
                        className={` text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? " w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index] = {
                            ...updateData[index],
                            videoSection: e.target.value,
                          };
                          setCourseContentData(updateData);
                        }}
                      />
                      <BsPencil className=" cursor-pointer dark:text-white text-black" />
                    </div>
                  </>
                )}
                <div className=" flex w-full items-center justify-between my-8">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1},{item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div> 🎃🎊</div>
                  )}

                  {/* arrow button for collapse video content */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />

                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className={`dark:text-white text-black`}
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handelCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-8">
                      <label htmlFor="" className={`${styles.label}`}>
                        Video Url
                      </label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index] = {
                            ...updateData[index],
                            videoUrl: e.target.value,
                          };
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    <div className="my-8">
                      <label htmlFor="" className={`${styles.label}`}>
                        video Length
                      </label>
                      <input
                        type="number"
                        placeholder="20"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index] = {
                            ...updateData[index],
                            videoLength: e.target.value,
                          };
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>

                    <div className="my-8">
                      <label htmlFor="" className={`${styles.label}`}>
                        Video Title
                      </label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index] = {
                            ...updateData[index],
                            title: e.target.value,
                          };
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>

                    <div className="my-8">
                      <label htmlFor="" className={`${styles.label}`}>
                        Video Description
                      </label>
                      <textarea
                        cols={30}
                        rows={8}
                        className={`${styles.input}`}
                        value={item.description}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index] = {
                            ...updateData[index],
                            description: e.target.value,
                          };
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    <div className="my-8">
                      <label htmlFor="" className={`${styles.label}`}>
                        Suggestion
                      </label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        value={item.suggestion}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index] = {
                            ...updateData[index],
                            suggestion: e.target.value,
                          };
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>

                    {item?.links?.map((links: any, linkindex: number) => (
                      <div className=" mb-3 block" key={index}>
                        <div className="w-full flex items-center justify-between">
                          <label htmlFor="" className={`${styles.label}`}>
                            Link {linkindex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkindex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            }  text-black dark:text-white`}
                            onClick={() =>
                              linkindex === 0
                                ? null
                                : handelRemoveLink(index, linkindex)
                            }
                            size={20}
                          />
                        </div>
                        <input
                          type="text"
                          className={`${styles.input}`}
                          placeholder="link title"
                          value={links.title}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[index] = {
                              ...updateData[index],
                              links: updateData[index].links.map(
                                (link: any, i: any) =>
                                  i === linkindex
                                    ? { ...link, title: e.target.value }
                                    : link
                              ),
                            };
                            setCourseContentData(updateData);
                          }}
                        />

                        <input
                          type="text"
                          className={`${styles.input}`}
                          value={links.url}
                          placeholder="URL"
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[index] = {
                              ...updateData[index],
                              links: updateData[index].links.map(
                                (link: any, i: any) =>
                                  i === linkindex
                                    ? { ...link, url: e.target.value }
                                    : link
                              ),
                            };
                            setCourseContentData(updateData);
                          }}
                        />
                      </div>
                    ))}

                    {/* add link button */}
                    <div className=" inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                {/* add new content */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className=" flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={(e) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}

        <br />
        <div>
          <p
            className=" flex items-center text-[18px] dark:text-white text-black cursor-pointer"
            onClick={() => addNewSection()}
          >
            <AiOutlinePlusCircle className="mr-2" /> Add New Section
          </p>
        </div>
      </form>
      <br />
      <div className="w-full flex justify-between items-center">
        <div
          className="w-full 800px:w-[100px] flex items-center justify-center h-[40px]  bg-blue-400 text-center text-white
    rounded mt-8 cursor-pointer"
          onClick={() => handelPrev()}
        >
          {" "}
          Prev
        </div>

        <div
          className="w-full 800px:w-[100px] flex items-center justify-center h-[40px]  bg-blue-400 text-center text-white
    rounded mt-8 cursor-pointer"
          onClick={() => handelNext()}
        >
          {" "}
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
