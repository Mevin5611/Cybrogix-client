import React, { useEffect, useState } from "react";
import CoursePlayer from "../admin/course/CoursePlayer";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { styles } from "@/app/styles/style";
import Image from "next/image";
import Avatar from "../../../public/assets/image/avatar.png";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import Ratings from "@/app/utils/Ratings";
import {
  useAddNewQuestionMutation,
  useAddQuestionReplayMutation,
  useAddReviewMutation,
  useAddReviewReplayMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: String;
  activeVideo: number;
  setActiveVideo: (activevideo: number) => void;
  userData: any;
  refetch: any;
};

const CourseMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  userData,
  refetch,
}: Props) => {
  console.log("data", data);
  console.log("user", userData);
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [reviewReplyId, setReviewReplyId] = useState("");
  const [FX, setFX] = useState("");
  const {
    data: courseData,
    isLoading,
    refetch: courseFetch,
  } = useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true });
  const [addNewQuestion, { isSuccess, error, isLoading: questionLoading }] =
    useAddNewQuestionMutation();
  const [
    addQuestionReplay,
    { isSuccess: answerSuccess, isLoading: answerLoading, error: anwerError },
  ] = useAddQuestionReplayMutation();
  const [addReview, { isSuccess: reviewSuccess, error: reviewError }] =
    useAddReviewMutation();

  const [addReviewReplay, { isSuccess: rerplySuccess, error: revrplyError }] =
    useAddReviewReplayMutation();

  console.log("courses", courseData);

  const isReviewExist = courseData?.course?.reviews.find(
    (item: any) => item.user._id === userData._id
  );
  const userRatings = courseData && [...courseData?.course?.reviews].reverse();

  const handelCommentSubmit = () => {
    if (question.length === 0) {
      toast.error("question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data.content[activeVideo]._id,
      });
    }
  };
  const handelAnswerSubmit = (questionId: any) => {
    if (answer.length === 0) {
      toast.error("answer can't be empty");
    } else {
      const currentAnswer = answer[questionId];
      if (currentAnswer && currentAnswer.trim() !== "") {
        addQuestionReplay({
          answer: currentAnswer,
          courseId: id,
          contentId: data.content[activeVideo]._id,
          questionId,
        });
      }
    }
  };
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswer((prevAnswer: any) => ({
      ...prevAnswer,
      [questionId]: value,
    }));
  };

  const handelReviewsSubmit = () => {
    if (review.length === 0) {
      toast.error("comment can't be empty");
    } else {
      addReview({ review, rating, id });
    }
  };

  const handelReplyReviewSubmit = () => {
    if (FX.length === 0) {
      toast.error("comment Replay can't be empty");
    } else {
      /* console.log({comment:FX,courseId:id,reviewId:reviewReplyId}); */

      addReviewReplay({ comment: FX, courseId: id, reviewId: reviewReplyId });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      socketId.emit("notification", {
        title: "New Question Recived",
        message: `You Have a new question in ${data.content[activeVideo].title}`,
        userId: userData?._id,
      });
    }
    if (error) {
      if ("data" in error) {
        const errorMsg = error as any;
        toast.error(errorMsg.data.message);
      }
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      if (userData.role !== "admin") {
        socketId.emit("notification", {
          title: "New replay Recived",
          message: `You Have a new replay in question ${data.content[activeVideo].title}`,
          userId: userData?._id,
        });
      }
    }
    if (anwerError) {
      if ("data" in anwerError) {
        const errorMsg = anwerError as any;
        toast.error(errorMsg.data.message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      courseFetch();
      socketId.emit("notification", {
        title: "New Review Recived",
        message: `You Have a new Review in ${data.content[activeVideo].title}`,
        userId: userData?._id,
      });
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMsg = reviewError as any;
        toast.error(errorMsg.data.message);
      }
    }
    if (rerplySuccess) {
      setFX("");
      courseFetch();
      socketId.emit("notification", {
        title: "New Review replay Recived",
        message: `You Have a new replay in your Review in ${data.content[activeVideo].title}`,
        userId: userData?._id,
      });
    }
    if (revrplyError) {
      if ("data" in revrplyError) {
        const errorMsg = revrplyError as any;
        toast.error(errorMsg.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    anwerError,
    reviewSuccess,
    reviewError,
    revrplyError,
    rerplySuccess,
  ]);

  return (
    <div className="w-[95%] 800px:w-[86%]  min-h-screen">
      <CoursePlayer
        title={data.content[activeVideo].title}
        videoUrl={data.content[activeVideo].videoUrl}
      />
      <div className="w-full flex items-center justify-between p-5 ">
        <div
          className={`${styles.button} !md:min-h-[40px] min-h-[30px] !md:w-[190px] w-[70px] py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          } flex items-center `}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2 text-xl md:text-base" />  <span className="hidden md:block">Previous Lesson</span>
        </div>

        <div
          className={`${styles.button} !md:min-h-[40px] min-h-[30px] !md:w-[190px] w-[70px] py-[unset]  ${
            data?.content.length - 1 === activeVideo &&
            "!cursor-no-drop opacity-[.8]"
          } flex items-center `}
          onClick={() =>
            setActiveVideo(
              data && data?.content?.length - 1 === 0
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
           <span className="hidden md:block">Next Lesson</span> <AiOutlineArrowRight className="mr-2 text-xl md:text-base" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] text-black dark:text-white font-Poppins">
        {data?.content[activeVideo]?.title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-300 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] shadow-inner font-Poppins text-black dark:text-white">
        {["Overview", "Resources", "Q&A", "Review"].map((item, index) => (
          <h1
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index && " dark:text-green-500 text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {item}
          </h1>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <h1 className="font-Poppins font-[400] text-black dark:text-white">
          {data.content[activeVideo]?.description}
        </h1>
      )}
      {activeBar === 1 && (
        <div>
          {data?.content[activeVideo]?.links?.map(
            (item: any, index: number) => (
              <div key={index} className="mb-5">
                <h1 className="800px:text-[20px] 800px:inline-block text-black dark:text-white">
                  {item?.title && item?.title + ":"}
                </h1>
                <a
                  href={item?.url}
                  className="inline-block text-[#4395c4] 800px:text-[20px] 800px: pl-2"
                >
                  {item?.url}
                </a>
              </div>
            )
          )}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full mt-3 gap-x-2">
            <Image
              src={
                userData && userData?.avatar ? userData?.avatar?.url : Avatar
              }
              alt="img not found"
              height={100}
              width={100}
              className="h-[50px] w-[50px] rounded-full object-cover"
            />

            <textarea
              name=""
              id=""
              cols={30}
              rows={5}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="outline-none bg-transparent  border border-[#000000d8] 800px:w-full p-2 rounded dark:border-[#ffffff57]  w-[90%] 800px:text-[18px] font-Poppins"
              placeholder="Write your question here..."
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionLoading && "cursor-not-allowed"
              } `}
              aria-disabled={question === ""}
              onClick={questionLoading ? () => {} : handelCommentSubmit}
            >
              Submit
            </div>
          </div>

          <br />

          <div className="w-full ">
            <div className="">
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                answer={answer}
                handelAnswerSubmit={handelAnswerSubmit}
                handleAnswerChange={handleAnswerChange}
                user={userData.user}
                setQuestionId={setQuestionId}
              />
            </div>
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          {isReviewExist ? (
            <h1 className="text-black dark:text-white w-full text-center font-Poppins text-[20px]">
              Your rating has been submitted
            </h1>
          ) : (
            <div className="flex w-full">
              <Image
                src={
                  userData && userData?.avatar ? userData?.avatar?.url : Avatar
                }
                alt="img not found"
                height={100}
                width={100}
                className="h-[50px] w-[50px] rounded-full object-cover"
              />
              <div className="w-full">
                <h1 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                  {" "}
                  Give a Rating <span className="text-red-600">*</span>
                </h1>

                <div className="flex w-full ml-2 pb-3">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={5}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="outline-none bg-transparent dark:text-white text-black border border-[#000000d8] dark:border-[#ffffff57] 800px:w-full p-2 rounded  w-[90%] 800px:text-[18px] font-Poppins"
                  placeholder="Write your comment here..."
                ></textarea>
                <div className="w-full flex justify-end">
                  <div
                    onClick={handelReviewsSubmit}
                    className={`${styles.button}  !w-[120px] !h-[40px] text-[18px] mt-5`}
                  >
                    Submit
                  </div>
                </div>
              </div>
            </div>
          )}

          {userRatings.map((item: any, index: number) => (
            <Review
              key={index}
              item={item}
              index={index}
              setReviewReplyId={setReviewReplyId}
              handelReplyReviewSubmit={handelReplyReviewSubmit}
              setFX={setFX}
              FX={FX}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Review = ({
  item,
  index,
  setReviewReplyId,
  FX,
  setFX,
  handelReplyReviewSubmit,
}: any) => {
  const [replyRatingOf, serReplyRatingOf] = useState(false);
  const [ReplyReview, setReplyReview] = useState();

  useEffect(() => {
    setFX(ReplyReview);
  }, [ReplyReview]);

  return (
    <div className="w-full" key={index}>
      <div className="w-full flex gap-x-5">
        <Image
          src={item ? item?.user?.avatar?.url : Avatar}
          alt="img not found"
          height={100}
          width={100}
          className="h-[50px] w-[50px] rounded-full object-cover"
        />

        <div className="w-full">
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
          <p className="800px:text-[15px] text-black dark:text-white">
            {item?.comment}
          </p>
          <small className=" text-black dark:text-white">
            {" "}
            {format(item.createdAt ? item.createdAt : " 0 day")}
          </small>
          {item.user && item.user.role === "admin" && (
            <p
              onClick={() => {
                serReplyRatingOf(!replyRatingOf);
                setReviewReplyId(item._id);
              }}
              className="800px:text-[15px] w-min cursor-pointer text-black dark:text-white"
            >
              {replyRatingOf ? "Hide" : "Reply"}
            </p>
          )}
        </div>
      </div>
      <br />

      {replyRatingOf && (
        <>
          {item?.commentReplies.map((reply: any, index: number) => (
            <div key={index} className="flex gap-x-2 ml-10 mt-5 ">
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
                  {reply.user && reply.user.role === "admin" && (
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
          ))}
          <br />
          <div className="w-full flex relative">
            <input
              type="text"
              placeholder="Enter your reply..."
              value={ReplyReview}
              onChange={(e: any) => setReplyReview(e.target.value)}
              className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-white  text-black dark:text-white w-[90%]"
            />
            <button
              type="submit"
              className="absolute right-10 bottom-1  text-black dark:text-white"
              onClick={handelReplyReviewSubmit}
            >
              <IoSendSharp size={25} />
            </button>
          </div>
        </>
      )}
      <br />
    </div>
  );
};

const CommentReply = ({
  answer,
  setQuestionId,
  activeVideo,
  data,
  handelAnswerSubmit,
  handleAnswerChange,
}: any) => {
  return (
    <>
      <div className="w-full h-full">
        {data?.content[activeVideo]?.questions.map(
          (item: any, index: number) => (
            <CommentItem
              key={index}
              item={item}
              answer={answer[item._id] || ""}
              setQuestionId={setQuestionId}
              handelAnswerSubmit={() => handelAnswerSubmit(item._id)}
              handleAnswerChange={(value: string) =>
                handleAnswerChange(item._id, value)
              }
              activeVideo={activeVideo}
              data={data}
            />
          )
        )}
      </div>
    </>
  );
};

const CommentItem = ({
  answer,
  setQuestionId,
  activeVideo,
  data,
  handelAnswerSubmit,
  handleAnswerChange,
  item,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  console.log("item", item);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <Image
            src={item.user.avatar ? item.user.avatar.url : Avatar}
            alt="img not found"
            height={100}
            width={100}
            className="h-[50px] w-[50px] rounded-full object-cover"
          />

          <div className="pl-3 ">
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
            <p className="text-black dark:text-white">{item.question}</p>
            <small className=" text-black dark:text-white">
              {" "}
              {format(item.createdAt ? item.createdAt : " 0 day")}
            </small>
          </div>
        </div>

        <div className="w-full flex">
          <span
            className="800px:pl-16  text-black dark:text-white cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item?.questionReplies?.length !== 0
                ? "All Reply"
                : "Add Reply"
              : "Hide Reply"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer text-black dark:text-white"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-black dark:text-white">
            {item.questionReplies.length}
          </span>
        </div>

        {replyActive && (
          <>
            {item.questionReplies.map((reply: any) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                key={reply._id}
              >
                <div className="">
                  <Image
                    src={reply.user.avatar ? reply.user.avatar.url : Avatar}
                    alt="img not found"
                    height={100}
                    width={100}
                    className="h-[50px] w-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <div>
                      <h1 className="text-[20px]  text-black dark:text-white ">
                        {reply?.user?.name}
                      </h1>
                    </div>
                    {reply.user && reply.user.role === "admin" && (
                      <div className="ps-2">
                        <MdVerified className="text-[20px] text-[#0084ff]" />
                      </div>
                    )}
                  </div>
                  <p className="text-black dark:text-white">{reply.answer}</p>
                  <small className="text-[#ffffff83] text-black dark:text-white">
                    {" "}
                    {format(reply.createdAt ? reply.createdAt : " 0 day")}
                  </small>
                </div>
              </div>
            ))}

            <div className="wf-full flex relative">
              <input
                type="text"
                placeholder="Enter your reply..."
                value={answer}
                onChange={(e: any) => handleAnswerChange(e.target.value)}
                className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-white  text-black dark:text-white w-[90%]"
              />
              <button
                type="submit"
                className="absolute right-10 bottom-1  text-black dark:text-white"
                onClick={handelAnswerSubmit}
                disabled={!answer.trim()}
              >
                <IoSendSharp size={25} />
              </button>
            </div>
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default CourseMedia;
