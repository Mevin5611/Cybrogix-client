"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import AdminSidebar from "../components/admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/admin/dashboard/DashboardHero";

type Props = {};

const Page: FC<Props> = () => {
  const [select, setSelect] = useState<number>(0);

  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      <AdminProtected>
        <Heading
          title={`Admin ${user.name}-Dashboard`}
          description="Elearning is the new method to study"
          keyword="Programming"
        />
        <div className="flex w-full ">
          <div className="w-[15%] ">
            <AdminSidebar select={select} setSelect={setSelect} />
          </div>
          <div className="w-[85%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default Page;
