"use client";
import AdminProtected from "@/app/hooks/adminProtected";
import AdminSidebar from "../../../app/components/admin/sidebar/AdminSidebar";
import AllInvoices from "@/app/components/admin/invoices/AllInvoices";
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
          title="Cybrogix Invoices"
          description="Elearning is the new method to study"
          keyword="Programming"
        />
        <div className="flex h-[200vh]">
          <div className="w-[15%]">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            <div className="lg:m-10 m-5 lg:ms-24">
              <AllInvoices />
            </div>
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default Page;
