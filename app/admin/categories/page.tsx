"use client";
import React from "react";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import Heading from "../../../app/utils/Heading";
import EditCategorie from "../../components/admin/layouts/EditCategorie";

type Props = {};

function Page({ params }: any) {
  const id = params.id;
  return (
    <>
      <Heading
        title="Cybrogix Categories"
        description="Elearning is the new method to study"
        keyword="Programming"
      />
      <div className="flex ">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCategorie />
        </div>
      </div>
    </>
  );
}

export default Page;
