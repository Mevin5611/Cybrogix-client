"use client";
import React, { FC } from "react";
import { styles } from "../../../../app/styles/style";
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiIndeterminateCircleLine } from "react-icons/ri";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;

  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  active,
  setActive,
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
}) => {
  const handelBenefitChange = (index: number, value: string) => {
    const updatedBenefits = benefits.map((benefit, i) =>
      i === index ? { ...benefit, title: value } : benefit
    );
    setBenefits(updatedBenefits);
  };
  const handelAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const handelPreRequisites = (index: number, value: string) => {
    const updatedPrerequisites = prerequisites.map((prerequisite, i) =>
      i === index ? { ...prerequisite, title: value } : prerequisite
    );
    setPrerequisites(updatedPrerequisites);
  };
  const handelAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };
  const handelRemoveInput = (index: number) => {
    if (index == 0) {
      alert("must be one input");
    } else {
      const fr = [...benefits];

      fr.splice(index, 1);
      setBenefits(fr);
    }
  };
  const handelPreRequisiteRemoveInput = (index: number) => {
    if (index == 0) {
      alert("must be one input");
    } else {
      const fr = [...prerequisites];

      fr.splice(index, 1);
      setPrerequisites(fr);
    }
  };
  const handelPrev = () => {
    setActive(active - 1);
  };
  const handelNext = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the all fields and Next");
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="Benefits">
          What are the benefits for students in this course ?
        </label>
        <br />
        {benefits.map((benefits: any, index: number) => (
          <div key={index} className="relative">
            <input
              type="text"
              key={index}
              name="Benefits"
              required
              className={`${styles.input}`}
              value={benefits.title}
              onChange={(e) => handelBenefitChange(index, e.target.value)}
              placeholder="You will be able to build a full stack lms platform"
            />
            <RiIndeterminateCircleLine
              onClick={() => handelRemoveInput(index)}
              className="absolute right-2 top-5 cursor-pointer"
              size={20}
            />
          </div>
        ))}
        <IoMdAddCircleOutline
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handelAddBenefits}
          size={25}
        />
      </div>

      <div>
        <label
          className={`${styles.label} text-[20px]`}
          htmlFor="prerequisites"
        >
          What are the prerequisites for students in this course ?
        </label>
        <br />
        {prerequisites.map((prerequisites: any, index: number) => (
          <div key={index} className="relative">
            <input
              type="text"
              key={index}
              name="prerequisites"
              required
              className={`${styles.input}`}
              value={prerequisites.title}
              onChange={(e) => handelPreRequisites(index, e.target.value)}
              placeholder="Basic knowledge of web developement"
            />
            <RiIndeterminateCircleLine
              onClick={() => handelPreRequisiteRemoveInput(index)}
              className="absolute right-2 top-5 cursor-pointer"
              size={20}
            />
          </div>
        ))}
        <IoMdAddCircleOutline
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handelAddPrerequisite}
          size={25}
        />
      </div>
      <div className="w-full flex justify-between items-center gap-10">
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

export default CourseData;
