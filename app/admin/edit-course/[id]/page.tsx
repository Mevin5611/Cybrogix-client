"use client";
import React from "react";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import DashboardHeader from "../../../components/admin/dashboard/DashboardHeader";
import Heading from "../../../../app/utils/Heading";
import EditCourse from "../../../components/admin/course/EditCourse";

type Props = {};

function Page({ params }: any) {
  const id = params.id;
  return (
    <>
      <Heading
        title="Cybrogix Edit-course"
        description="Elearning is the new method to study"
        keyword="Programming"
      />
      <div className="flex ">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </>
  );
}

export default Page;
