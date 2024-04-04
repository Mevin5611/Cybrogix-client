"use client";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import CourseContentMedia from "../../components/course/CourseContentMedia";
import Header from "@/app/components/Header";
type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const id = params.id;
  const { isLoading, data, error } = useLoadUserQuery(undefined, {});

  if (data) {
    const isPurchased = data?.user?.courses?.find(
      (item: any) => item._id === id
    );

    if (!isPurchased) {
      redirect("/");
    }

    if (error) {
      redirect("/");
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            route={route}
          />

          <div className="mt-10 md:ms-16 ms-4">
            <CourseContentMedia id={id} user={data.user} />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
