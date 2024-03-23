import { styles } from "@/app/styles/style";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import { format } from "timeago.js";
import React, { FC, useEffect, useState } from "react";
import { IoCheckmarkDone, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import CourseContentList from "./CourseContentList";
import CoursePlayer from "../admin/course/CoursePlayer";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { FaBedPulse } from "react-icons/fa6";
import Image from "next/image";
import Avatar from "../../../public/assets/image/avatar.png";
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";

type Props = {
  data: any;
  id: string;
  stripePromise: any;
  clientSecret: string;
  setRoute:any
  setOpen:any
};

const CourseDetails: FC<Props> = ({
  id,
  data,
  clientSecret,
  stripePromise,
  setRoute,
  setOpen:openAuthModal
}) => {
  const [open, setOpen] = useState(false);
  const [purchased,setPurchased] = useState(false);
  const { data: user } = useLoadUserQuery(undefined, {});

  const [userdata, setUserdata] = useState<any>();
  const [replyRatingOf, serReplyRatingOf] = useState(false);

  useEffect(() => {
    setUserdata(user)
    const isPurchased = user && user?.user?.courses.find((item: any) => item._id === data?._id);
    if(isPurchased){
      console.log("true");
      
      setPurchased(true)
    }
}, [user]);

  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);


 







  const handleBuy = () => {
    if(userdata){
      setOpen(true);
    }else{
      setRoute("Login")
      openAuthModal(true)
    }
  };

  return (
    <div>
      <div className="w-[90%]  m-auto py-5">
        <div className="w-full flex  flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[55% ] 800px:pr-5">
            <h1 className="text-[30px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data?.ratings} />
                <h5 className="text-black dark:text-white">
                  {data?.reviews?.length} Reviews
                </h5>
              </div>
              <h1 className="text-black dark:text-white">
                {data?.purchased} Students
              </h1>
            </div>

            <br />
            <br />
            <h1 className="text-[30px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course ?
            </h1>
            <br />
            <div>
              {data?.benefits?.map((benefit: any, index: number) => (
                <div className="w-full py-2 flex" key={index}>
                  <div className="mr-1">
                    <IoCheckmarkDone
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white font-Poppins font-[300">
                    {benefit.title}
                  </p>
                </div>
              ))}
              <br />
              <br />

              <h1 className="text-[30px] font-Poppins font-[600] text-black dark:text-white">
                What are the prerequisites ?
              </h1>
              <br />
              <div>
                {data?.prerequisites?.map((benefit: any, index: number) => (
                  <div className="w-full py-2 flex" key={index}>
                    <div className="mr-1 ">
                      <IoCheckmarkDone
                        size={20}
                        className="text-black dark:text-white"
                      />
                    </div>
                    <p className="pl-2 text-black dark:text-white font-Poppins font-[300]">
                      {benefit.title}
                    </p>
                  </div>
                ))}
                <br />
                <br />
                <div>
                  <h1 className="text-[30px] font-Poppins font-[600] text-black dark:text-white">
                    Course Overview
                  </h1>

                  <CourseContentList data={data?.courseData} isDemo={true} />
                </div>

                <br />
                <br />
                <div className="w-full">
                  <h1 className="pl-2 text-black dark:text-white text-[30px] font-[600] font-Poppins">
                    Course Details
                  </h1>
                  <h1 className="mt-[20px] text-black dark:text-white text-[18px] whitespace-pre-line w-full overflow-hidden font-[400] font-Poppins">
                    {data?.description}
                  </h1>
                </div>
                <br />
                <br />
                <div className="w-full">
                  <div className="800px:flex items-center mb-5">
                    <Ratings rating={data?.ratings} />
                    <div className="mb-2 800px:mb-[unset]">
                      <h1 className="text-[25px] font-Poppins text-black dark:text-white">
                        {Number.isInteger(data?.ratings)
                          ? data?.ratings.toFixed(1)
                          : data?.ratings.toFixed(2)}{" "}
                        Course Rating {data?.reviews?.length} Reviews
                      </h1>
                    </div>

                    <br />
                  </div>
                  {(data?.reviews && [...data.reviews].reverse())?.map(
                    (item: any, index: number) => (
                      <div className="w-full pb-4" key={index}>
                        <div className="flex">
                          <div className="w-[50px] h-[50px]">
                            <div className="w-[50px] h-[50px]  bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                              <Image
                                src={item ? item?.user?.avatar?.url : Avatar}
                                alt="img not found"
                                height={100}
                                width={100}
                                className="h-[50px] w-[50px] rounded-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="w-full ps-3">
                            <div className="flex items-center">
                              <div>
                                <h1 className="text-[20px]  text-black dark:text-white ">
                                  {item?.user?.name}
                                </h1>
                              </div>
                              {item.user && item.user.role === "admin" && (
                                <div className="ps-2">
                                  <MdVerified className="text-[20px] text-[#0084ff]" />
                                </div>
                              )}
                            </div>

                            <Ratings rating={item.rating} />
                            <p className="800px:text-[18px] text-black dark:text-white">
                              {item?.comment}
                            </p>
                            <small className=" text-black dark:text-white flex items-center">
                              {" "}
                              {format(
                                item.createdAt ? item.createdAt : " 0 day"
                              )}
                              <p
                              onClick={() => {
                                serReplyRatingOf(!replyRatingOf);
                              }}
                              className="800px:text-[14px]  cursor-pointer text-black dark:text-white ps-3"
                            >
                              {replyRatingOf ? "Hide" : "View Reply"}
                            </p>
                            </small>
                            
                          </div>
                        </div>
                        {replyRatingOf && (
                          <>
                          {item?.commentReplies.map(
                            (reply: any, index: number) => (
                              <div
                                key={index}
                                className="flex gap-x-2 ml-10 mt-5 "
                              >
                                <Image
                                  src={reply ? reply.user.avatar.url : Avatar}
                                  alt="img not found"
                                  height={100}
                                  width={100}
                                  className="h-[50px] w-[50px] rounded-full object-cover"
                                />
  
                                <div>
                                  <div className="flex items-center">
                                    <div>
                                      <h1 className="text-[20px]  text-black dark:text-white ">
                                        {reply?.user?.name}
                                      </h1>
                                    </div>
                                    {reply.user &&
                                      reply.user.role === "admin" && (
                                        <div className="ps-2">
                                          <MdVerified className="text-[20px] text-[#0084ff]" />
                                        </div>
                                      )}
                                  </div>
                                  <p className=" text-[17px] text-black dark:text-white font-Poppins">
                                    {reply.comment}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                          </>
                        )}
                        
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full 800px:w-[45%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px]  dark:text-white text-black">
                  {data?.price === 0 ? "Free" : data?.price + "$"}
                </h1>
                <h2 className="pl-3 text-[20px] mt-2 line-through opacity-80 dark:text-white text-black">
                  {data?.estimatePrice}
                </h2>
                <h2 className="pl-3 text-[20px] mt-2 dark:text-white text-black">
                  {discountPercentagePrice}% off
                </h2>
              </div>
              <div className="flex items-center">
                {purchased ? (
                  <Link
                    href={`/course-access/${id}`}
                    className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson]`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    onClick={handleBuy}
                    className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[#ff1040]`}
                  >
                    {" "}
                    Buy Now {data?.price + " " + "$"}
                  </div>
                )}
              </div>
              <br />
              <p className=" pb-1 text-black dark:text-white">
                Source code included
              </p>
              <p className=" pb-1 text-black dark:text-white">
                Lifetime LMS access
              </p>
              <p className=" pb-1 text-black dark:text-white">
                Certificate of completion
              </p>
              <p className=" pb-3 800px:pb-1 text-black dark:text-white ">
                Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow-lg p-3 ">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full p-5">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
