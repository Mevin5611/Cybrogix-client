import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import banner from "../../../public/assets/image/banner.png";
import img from "../../../public/assets/image/images.jpg";
import img1 from "../../../public/assets/image/images (1).jpg";
import img2 from "../../../public/assets/image/images (2).jpg";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {};

const Hero: FC<Props> = ({}) => {
  const [bannerData, setBannerData] = useState();
  const { data } = useGetHeroDataQuery("Banner", {});
  useEffect(() => {
    if (data) {
      setBannerData(data);
    }
  }, [data]);


  return (
    <div className="w-full min-h-screen p-5 gap-x-10 1000px:flex items-center dark:bg-[#000000] bg-white">
      <div className="w-[50%]">
        <div className=" w-[40vh] h-[40vh] 300px:w-[40vh] 300px:h-[40vh] 400px:w-[50vh]  400px:h-[50vh] 800px:h-[80vh] 800px:w-[80vh] hero_animation rounded-full ml-10 flex justify-center items-center">
          <div className="z-[10] ">
            <img
              alt="img not found"
              src={bannerData ? bannerData?.layout?.banner?.image?.url :banner}
              className="object-cover rounded-full z-[10]"
            />
          </div>
        </div>
      </div>

      <div className="1000px:w-[50%]  ml-10 flex flex-col items-center mt-5">
        <h2 className=" dark:text-white text-[#000000c7] text-[30px] 1000px:text-[60px] font-Josefin font-[500] 1000px:leading-[75px]">
         
          {bannerData ? bannerData?.layout?.banner?.title : "Improve Your Online Learning Experience Better Instantly"}
        </h2>
        <br />
        <p className="dark:text-white text-[#000000c7]  font-Josefin font-[600] text-[18px] ">
        
          {bannerData ? bannerData?.layout?.banner?.subTitle : "We have 40k Online courses & 500k Online registered student. Find your desired Courses from them." }
        </p>
        <br />
        <div className="w-full flex items-center relative">
          <input
            type="text"
            placeholder="Search you course..."
            className="w-full p-1 ps-2 appearance-none outline-none border border-[#a7a7a8] dark:border-[#232329] dark:text-white text-black rounded-sm focus:border-blue-700 "
          />
          <button className="bg-[#39c1f3] rounded-r-[5px] p-1">
            <BiSearch size={24} className="dark:text-black text-white" />
          </button>
        </div>

        <br />
        <div className="w-full flex items-center gap-x-3">
          <div className=" flex  ">
            <Image
              className="w-[6vh] h-[6vh] rounded-full border-[2px] border-[white]   "
              src={img}
              alt="img not found"
            />
            <Image
              className="w-[6vh] h-[6vh] rounded-full border-[2px] border-[white] ml-[-20px]  "
              src={img1}
              alt="img not found"
            />
            <Image
              className="w-[6vh] h-[6vh] rounded-full border-[2px] border-[white] ml-[-20px]  "
              src={img2}
              alt="img not found"
            />
          </div>

          <h1 className="dark:text-white text-[#000000c7] ">
            500K+ People already trusted us{" "}
            <span className="dark:text-[#4bdd4b] text-red-500 font-bold">
              View Courses
            </span>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
