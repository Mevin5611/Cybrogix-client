import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React, { FC } from "react";
import comment from "../../../public/assets/image/review.png";

type Props = {};

const Reviews: FC<Props> = () => {
  const Review = [
    {
      name: "Raja",
      avatar:
        "https://res.cloudinary.com/djo5r2a5z/image/upload/v1699638181/avatar/uxiua45jdkovyxf0uzkr.jpg",
      profession: "Student| cambridge university",
      comment:
        "I am a student of cambridge university. I am a rson. I am a good student. I am a good person. I am a good student ",
      rating: 5,
    },
    {
      name: "Abdul khalek",
      avatar:
        "https://res.cloudinary.com/djo5r2a5z/image/upload/v1699254686/avatar/ucxbuz0glhsc4bojzgp4.jpg",
      profession: "Student| cambridge university",
      comment:
        "I am a student of cambridge university. I am a good n. I am a good student. I am a good person. I am a good student ",
      rating: 3.5,
    },
    {
      name: "Methun",
      avatar:
        "https://res.cloudinary.com/djo5r2a5z/image/upload/v1690736118/pf/315100994_10209906491094779_654405519663392346_n_xw8zyc.jpg",
      profession: "Student| cambridge university",
      comment:
        "I am a student of cambridge university. I am . I am a good person. I am a good student. I am a good person. I am a good student ",
      rating: 4.5,
    },

    {
      name: "Rahul",
      avatar:
        "https://res.cloudinary.com/djo5r2a5z/image/upload/v1707412521/lms%20review%20user/download_rm93te.jpg",
      profession: "Student| cambridge university",
      comment:
        "I am a student of cambridge university. I am a good student. I am a good person. I am a good student. I am at. I am a good person. I am a good student ",
      rating: 4.5,
    },
    {
      name: "Ruhul amin",
      avatar:
        "https://res.cloudinary.com/djo5r2a5z/image/upload/v1690301047/cld-sample.jpg",
      profession: "Student| cambridge university",
      comment:
        "I am a student of cambridge university. I am a good student. I am a good person. I am a good student. I am a good  ",
      rating: 3.5,
    },
    {
      name: "badhon",
      avatar:
        "https://res.cloudinary.com/djo5r2a5z/image/upload/v1707412277/lms%20review%20user/download_bdg8wd.jpg",
      profession: "Student| cambridge university",
      comment:
        "I am a student of cambridge university. I am a good student. I am a good person",
      rating: 5,
    },
  ];
  return (
    <div className="w-full">
      <div className="flex w-[95%] 800px:w-[85%] m-auto flex-col items-center  800px:flex-row justify-center  800px:justify-between  ">
        <div className=" ps-0 md:ps-40 m-10 md:m-0">
          <Image src={comment} alt="img not found" width={400} height={400} />
        </div>

        <div className=" 800px:w-[50%]">
          <h1 className=" dark:text-white text-black font-Poppins font-[600] text-[30px] m-5 text-center">
            {" "}
            Our Students Are{" "} <br/>
            <span className="text-gradient bg-gradient-to-r from-pink-400 via-purple-500 to-sky-400 bg-clip-text text-transparent font-[800]">
              Our Strength
            </span>
            <br /> See What they say{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-sky-400 bg-clip-text text-transparent font-[800]">
              About Us
            </span>
          </h1>
          <br />
          <p className="font-Poppins dark:text-white text-black m-5 text-center md:text-start">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit quia maxime, earum ipsum, facilis quaerat dolores
            nobis cupiditate distinctio saepe est alias unde animi! Cumque
            voluptas a delectus quibusdam
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="flex w-[95%] md:m-auto flex-wrap justify-center md:gap-5 gap-3 ml-2 ">
        {Review.map((review, index) => (
          <div
            className=" w-full h-max bg-slate-50 800px:w-[40%]  dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inline md:m-0 m-5"
            key={index}
          >
            <div className="md:flex md:justify-center w-full items-center justify-between  md:flex-col ">
              <div className="flex gap-x-2">
                <Image
                  src={review.avatar}
                  alt="img not found "
                  height={50}
                  width={50}
                  className="md:w-[50px] md:h-[50px] w-[30px] h-[30px] rounded-full object-cover"
                />
                <div>
                  <h1 className=" dark:text-white text-black font-Poppins text-[18px]">
                    {review.name}
                  </h1>
                  <h1 className=" dark:text-[#999393] text-[#18183d] font-Poppins text-[16px] ">
                    {review.profession}
                  </h1>
                </div>
              </div>
              <Ratings rating={review.rating} />
            </div>
            <br />
            <p className=" dark:text-white text-black font-Poppins">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
