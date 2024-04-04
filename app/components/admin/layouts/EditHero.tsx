import React, { FC, useEffect, useState } from "react";
import {
  useEditHeroDataMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import toast from "react-hot-toast";

type Props = {};

const EditHero: FC<Props> = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editHeroData, { isSuccess,error }] = useEditHeroDataMutation({});

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setImage(data?.layout?.banner?.image?.url);
      setSubTitle(data?.layout?.banner?.subTitle);
    }
    if (isSuccess) {
      toast.success("Banner updated successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    editHeroData({
      type: "Banner",
      title,
      subTitle,
      image,
    });
  };

  return (
    <div className="w-full min-h-screen p-5 lg:gap-x-10 1000px:flex items-center dark:bg-[#000000] bg-white">
      <div className=" lg:w-[50%]">
        <div className="h-[30vh] w-[30vh]  md:w-[40vh] md:h-[40vh] lg:w-[80vh] lg:h-[80vh] hero_animation rounded-full md:ml-10 ml-2 z-10 flex justify-center items-center">
          <div className=" 1000px:mt-[-40px]  ">
            <input
              type="file"
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label htmlFor="banner" className="">
              <img
                alt="img not found"
                src={image}
                className="object-cover rounded-full w-[20vh] h-[20vh] md:w-[30vh] md:h-[30vh] lg:w-[70vh] lg:h-[70vh]"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="1000px:w-[50%]  ml-15 flex flex-col items-center mt-5">
        <textarea
          name=""
          id=""
          rows={3}
          cols={30}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" dark:text-white text-[#000000c7] text-[30px] 1000px:text-[60px] font-Josefin font-[500] 1000px:leading-[75px] bg-transparent resize-none outline-none overflow-hidden w-full ps-5"
        />

        <br />

        <br />
        <textarea
          name=""
          id=""
          rows={2}
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full ps-5 dark:text-white text-[#000000c7]  font-Josefin font-[600] text-[18px] outline-none bg-transparent overflow-hidden resize-none"
        />

        <br />
        <div className="w-full flex justify-end gap-x-3">
          <button
            onClick={() => handleSubmit()}
            className={`lg:w-[150px] w-[80px] flex flex-row justify-center py-3 rounded-md cursor-pointer bg-green-700 min-h-[45px] text-[16px] font-Poppins font-semibold dark:text-white text-black`}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHero;
