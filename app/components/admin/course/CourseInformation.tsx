"use client";
import { styles } from "../../../../app/styles/style";
import React, { FC, useEffect, useState } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}) => {
  const [draging, setDraging] = useState(false);
  const { data } = useGetHeroDataQuery("categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);

      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDraging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDraging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDraging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form action="" onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>

          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack lms platforms with next 13  "
            className={styles.input}
          />
        </div>
        <br />
        <div className="">
          <label htmlFor="">Course description</label>

          <textarea
            name=""
            required
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            cols={30}
            rows={8}
            placeholder="Write something amazing   "
            className={`${styles.input} h-min !py-1`}
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%] ">
            <label htmlFor="">Course Price</label>

            <input
              type="name"
              name=""
              required
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="name"
              placeholder="1800 "
              className={styles.input}
            />
          </div>

          <div className="w-[45%]">
            <label htmlFor="">Estimated Price</label>

            <input
              type="name"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="name"
              placeholder="2000 "
              className={styles.input}
            />
          </div>
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%] ">
            <label htmlFor="">Course Tags</label>

            <input
              type="name"
              name=""
              required
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="name"
              placeholder="MERN "
              className={styles.input}
            />
          </div>
          <div className="w-[45%] ">
            <label htmlFor="">Course categories</label>

            <select
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
              name=""
              id=""
              className={`${styles.input}`}
            >
              <option
                className="dark:text-white dark:bg-black text-black bg-white"
                value=""
              >
                Select Categories
              </option>
              {categories.map((item: any) => (
                <option
                  className="dark:text-white dark:bg-black text-black bg-white"
                  value={item.title}
                  key={item._id}
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%] ">
            <label htmlFor="">Course level</label>

            <input
              type="name"
              name=""
              required
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="name"
              placeholder="Biginner "
              className={styles.input}
            />
          </div>

          <div className="w-[45%]">
            <label htmlFor="">Demo Url</label>

            <input
              type="name"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="name"
              placeholder="Url "
              className={styles.input}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[15vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              draging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo?.thumbnail?.url || courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value={"Next"}
            className="w-full 800px:w-[180px] h-[40px] bg-blue-400  text-center text-white mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
