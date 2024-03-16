import React, { FC } from "react";

import { BiBorderLeft } from "react-icons/bi";
import { CircularProgress, Box } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";
import UserAnalytics from "../analytics/UserAnalytics";
import OrderAnalytics from "../analytics/OrderAnalytics";

import AllInvoices from "../invoices/AllInvoices";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ value, open }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 90 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

const DashboardWidget:FC<Props> = ({open}) => {
  return (
    <div className="mt-[30px]">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics DashBoard={true} />
        </div>

        <div className="pt-[20px] pr-8">
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow p-2">
            <div className="flex items-center justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-black text-[30px]" />
                <h1 className="py-2 font-Poppins dark:text-white text-black text-[20px]">
                  120
                </h1>

                <h1 className=" py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px]">
                  Sales Obtained
                </h1>
              </div>
              <div>
                <CircularProgressWithLabel value={10} open={open} />
                <h1 className="text-center pt-4 dark:text-white text-black">+120%</h1>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-4">
            <div className="flex items-center p-2 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-black text-[30px]" />
                <h1 className="py-2 font-Poppins dark:text-white text-black text-[20px]">
                  450
                </h1>
                <h1 className=" py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px]">
                  new Users
                </h1>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h1 className="text-center pt-4 dark:text-white text-black">+150%</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="  mt-[10px] mb-5">
        <div className=" w-[94%]  shadow m-auto h-[60vh]">
          <OrderAnalytics DashBoard={true} />
        </div>
      </div>
      <div className="w-[94%] shadow m-auto ">
          <h3 className="dark:text-white text-black  text-[20px] font-Poppins font-[400] pb-10 ps-10 mt-5 ">
            Recent Transaction
          </h3>
        <div className="mb-10 ps-10">

          <AllInvoices isDashBoard={false} />
        </div>
      </div>
      
    </div>
  );
};

export default DashboardWidget;
