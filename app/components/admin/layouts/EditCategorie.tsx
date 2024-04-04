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

const EditCategorie: FC<Props> = () => {
  const { data, refetch } = useGetHeroDataQuery("categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editHeroData, { isSuccess, error }] = useEditHeroDataMutation({});
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      console.log(data);

      setCategories(data.layout.categories);
    }
    if (isSuccess) {
      toast.success("Categories updated successfully");
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
    setCategories((pre) =>
      pre.map((faq) => (faq._id === id ? { ...faq, active: !faq.active } : faq))
    );
  };
  const toggleDelete = (id: any) => {
    setCategories((pre) => pre.filter((item) => item._id !== id));
  };
  const handleQuestionChange = (id: any, value: any) => {
    setCategories((pre) =>
      pre.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategorieshandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("title cannot be empty");
    } else {
      const newCategories = {
        _id: uuidv4(), // Generate a unique ID
        title: "",
      };
      setCategories((prev) => [...prev, newCategories]);
    }
  };
  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };
  const isCategoriesEmpty = (categories: any[]) => {
    return categories.some((c) => c.categories === "");
  };

  const handleSubmit = async () => {
    await editHeroData({
      type: "categories",
      categories: categories,
    });
  };
  return (
    <div className="w-[90%] m-auto min-h-screen">
      <br />
      <br />
      <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl dark:text-white text-black 800px:leading-[60px] font-[700] tracking-tight">
       All Categories
      </h1>
      <br />

      {categories.map((item, index) => (
        <div key={index} className={`${index}  border-[gray] border-t w-full`}>
          <div className=" w-full flex gap-x-2 items-center justify-between">
            <div className="w-full">
              <input
                placeholder="Add your question...."
                onChange={(e: any) =>
                  handleQuestionChange(item._id, e.target.value)
                }
                value={item.title}
                className={`${styles.input} border-none w-full`}
              />

              {item.active && (
                <div>
                  <MdDeleteOutline
                  className="dark:text-white text-black"
                    size={25}
                    onClick={() => toggleDelete(item._id)}
                  />
                </div>
              )}
            </div>
            <div className="flex-shrink-0">
              {item.active ? (
                <HiMinus
                  size={30}
                  className="h-6 w-6 cursor-pointer dark:text-white text-black"
                  onClick={() => toggleHandle(item._id)}
                />
              ) : (
                <HiPlus
                  size={30}
                  className="h-6 w-6 cursor-pointer dark:text-white text-black "
                  onClick={() => toggleHandle(item._id)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
      <IoMdAddCircleOutline className="dark:text-white text-black" size={25} onClick={() => newCategorieshandler()} />
      <div className="flex justify-end w-full ">
        <button
          onClick={
            areCategoriesUnchanged(data?.layout.categories, categories) ||
            isCategoriesEmpty(categories)
              ? () => null
              : handleSubmit
          }
          className={`lg:w-[150px] w-[80px] flex flex-row justify-center py-3 rounded-md  min-h-[45px] text-[16px] bg-gray-700 font-Poppins font-semibold dark:text-white text-black ${
            areCategoriesUnchanged(data?.layout.categories, categories) ||
            isCategoriesEmpty(categories)
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

export default EditCategorie;
