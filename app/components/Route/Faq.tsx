import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const Faq = (props: Props) => {
  const [faqData, setFaqData] = useState<any>();
  const { data } = useGetHeroDataQuery("FAQ", {});

  useEffect(() => {
    if (data) {
      setFaqData(data?.layout.faq);
    }
  }, [data]);
  console.log(faqData);
  const toggleHandle = (id: any) => {
    setFaqData((pre:any) =>
      pre?.map((faq: any) =>
        faq._id === id ? { ...faq, active: !faq.active } : faq
      )
    );
  };
  return (
    <div className="w-[90%] md:m-auto m-5">
      <br />
      <br />
      <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl dark:text-white text-black 800px:leading-[60px] font-[700] tracking-tight">
        Frequently Asked{" "}
        <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-sky-400 bg-clip-text text-transparent font-[800]">
          {" "}
          Questions
        </span>
      </h1>
      <br />

      {faqData?.map((faq: any, index: number) => (
        <div key={index} className={`${index}  border-[gray] border-t w-full`}>
          <div className=" w-full flex gap-x-2 items-center justify-between">
            <div>
              <h1
                onClick={() => toggleHandle(faq._id)}
                className="text-[20px] font-Poppins py-6 cursor-pointer dark:text-white text-black"
              >
                {faq.question}
              </h1>

              {faq.active && (
                <h1 className="text-[20px] font-Poppins py-6 dark:text-white text-black">
                  {faq.answer}
                </h1>
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
                  className="h-6 w-6 cursor-pointer dark:text-white text-black"
                  onClick={() => toggleHandle(faq._id)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
