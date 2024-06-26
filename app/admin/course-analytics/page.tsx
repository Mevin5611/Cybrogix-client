'use client';
import React from "react";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import Heading from "../../../app/utils/Heading";
import CourseAnalytics from "../../components/admin/analytics/CourseAnalytics";

type Props = {};

function page(Props: any) {
  
  return (
    <>
      <Heading
        title="Cybrogix Course-Analytics"
        description="Elearning is the new method to study"
        keyword="Programming"
      />
      <div className="flex ">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <CourseAnalytics  />
        </div>
      </div>
    </>
  );
}

export default page;
