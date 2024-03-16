import { styles } from "@/app/styles/style";
import {
  useEditHeroDataMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useState, useEffect, FC } from "react";
import toast from "react-hot-toast";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

type Props = {};

const Editfaq: FC<Props> = () => {
  const { data, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editHeroData, { isSuccess, error }] = useEditHeroDataMutation({});
  const [question, setQuestion] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestion(data.layout.faq);
    }
    if (isSuccess) {
      toast.success("FAQ updated successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const toggleHandle = (id: any) => {
    setQuestion((pre) =>
      pre.map((faq) => (faq._id === id ? { ...faq, active: !faq.active } : faq))
    );
  };
  const toggleDelete = (id: any) => {
    setQuestion((pre) => pre.filter((item) => item._id !== id));
  };
  const handleQuestionChange = (id: any, value: any) => {
    setQuestion((pre) =>
      pre.map((faq) => (faq._id === id ? { ...faq, question: value } : faq))
    );
  };
  const handleAnswerChange = (id: any, value: any) => {
    setQuestion((pre) =>
      pre.map((faq) => (faq._id === id ? { ...faq, answer: value } : faq))
    );
  };
  const newFaqhandler = () => {
    if (question[question.length - 1].question === "" || question[question.length - 1].answer === "" ) {
      toast.error("fields cannot be empty");
    }else{
      const newFaq = {
        _id: uuidv4(), // Generate a unique ID
        question: "",
        answer: "",
      };
      setQuestion((prev) => [...prev, newFaq]);
    }
    
  };
  const areQuestionUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };
  const isQuestionEmpty = (question: any[]) => {
    return question.some((q) => q.question === "" || q.answer === "");
  };

  const handleSubmit = async () => {
    await editHeroData({
      type: "FAQ",
      faq: question,
    });
  };
  return (
    <div className="w-[90%] m-auto min-h-screen">
      <br />
      <br />
      <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl dark:text-white text-black 800px:leading-[60px] font-[700] tracking-tight">
        Frequently Asked Questions
      </h1>
      <br />

      {question.map((faq, index) => (
        <div key={index} className={`${index}  border-[gray] border-t w-full`}>
          <div className=" w-full flex gap-x-2 items-center justify-between">
            {/* <button onClick={() => toggleHandle(faq._id)}> */}
            <div className="w-full">
              <input
                placeholder="Add your question...."
                onChange={(e: any) =>
                  handleQuestionChange(faq._id, e.target.value)
                }
                value={faq.question}
                className={`${styles.input} border-none w-full`}
              />

              {faq.active && (
                <div>
                  <input
                    placeholder="Add your answer...."
                    onChange={(e: any) =>
                      handleAnswerChange(faq._id, e.target.value)
                    }
                    value={faq.answer}
                    className={`${styles.input} border-none w-full`}
                  />
                  <MdDeleteOutline
                    size={25}
                    onClick={() => toggleDelete(faq._id)}
                  />
                </div>
              )}
            </div>
            <div className="flex-shrink-0">
              {faq.active ? (
                <HiMinus
                  size={30}
                  className="h-6 w-6 cursor-pointer dark:text-white text-black"
                  onClick={() => toggleHandle(faq._id)}
                />
              ) : (
                <HiPlus
                  size={30}
                  className="h-6 w-6 cursor-pointer dark:text-white text-black "
                  onClick={() => toggleHandle(faq._id)}
                />
              )}
            </div>
            {/* </button> */}
          </div>
        </div>
      ))}
      <IoMdAddCircleOutline size={25} onClick={() => newFaqhandler()} />
      <div className="flex justify-end w-full ">
        <button
          onClick={
            areQuestionUnchanged(data?.layout.faq, question) ||
            isQuestionEmpty(question)
              ? () => null
              : handleSubmit
          }
          className={`w-[150px] flex flex-row justify-center py-3 rounded-md  min-h-[45px] text-[16px] bg-gray-700 font-Poppins font-semibold dark:text-white text-black ${
            areQuestionUnchanged(data?.layout.faq, question) ||
            isQuestionEmpty(question)
              ? "cursor-not-allowed"
              : "bg-green-500 cursor-pointer"
          }`}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default Editfaq;
