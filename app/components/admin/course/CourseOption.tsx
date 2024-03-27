import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOption: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div>
      {options.map((v: any, i: number) => (
        <div
          key={i}
          className="w-full flex py-5"
          /* onClick={()=> setActive(i)} */
        >
          <div
            className={`' w-[35px] h-[35px] rounded-full flex items-center justify-center' ${
              active + 1 > i ? "bg-blue-500" : "bg-[#384766]"
            } relative`}
          >
            <IoMdCheckmark className="text-[25px] ml-1 " />
            {i !== options.length - 1 && (
              <div
                className={`absolute h-[40px] w-1 ${
                  active + 1 > i ? "bg-blue-500" : "bg-[#384766]"
                } bottom-[-115%] left-[40%]`}
              />
            )}
          </div>
          <h1
            className={`pl-3 ${
              active === i
                ? "dark:text-white text-black"
                : "dark:text-white text-black"
            } text-[20px]`}
          >
            {v}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default CourseOption;
