"use client";
import AdminProtected from "@/app/hooks/adminProtected";
import AdminSidebar from "../../../app/components/admin/sidebar/AdminSidebar";
import AllUsers from "../../../app/components/admin/course/AllUsers";
import Heading from "../../../app/utils/Heading";
import React from "react";
import DashboardHero from "@/app/components/admin/dashboard/DashboardHero";
import DashboardHeader from "@/app/components/admin/dashboard/DashboardHeader";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <AdminProtected>
        <Heading
          title="Cybrogix Team"
          description="Elearning is the new method to study"
          keyword="Programming"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[15%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[80%]">
            <DashboardHeader />
            <AllUsers isTeam={true} />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default Page;
