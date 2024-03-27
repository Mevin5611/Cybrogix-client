"use client";
import React from "react";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import Heading from "../../../app/utils/Heading";
import EditHero from "../../components/admin/layouts/EditHero";

type Props = {};

function Page({ params }: any) {
  const id = params.id;
  return (
    <>
      <Heading
        title="Cybrogix Hero"
        description="Elearning is the new method to study"
        keyword="Programming"
      />
      <div className="flex ">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditHero />
        </div>
      </div>
    </>
  );
}

export default Page;
