import React, { FC, useEffect, useState } from "react";

import { BiBorderLeft } from "react-icons/bi";
import { CircularProgress, Box } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";
import UserAnalytics from "../analytics/UserAnalytics";
import OrderAnalytics from "../analytics/OrderAnalytics";

import AllInvoices from "../invoices/AllInvoices";
import {
  useGetOrderAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analytics";

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

const DashboardWidget: FC<Props> = ({ open }) => {
  const [comparePercentage, setComparePercentage] = useState();
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();
  const { data, isLoading, error } = useGetOrderAnalyticsQuery({});
  const {
    data: userData,
    isLoading: userLoading,
    isError: err,
  } = useGetUsersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && userLoading) {
      return;
    } else {
      if (data && userData) {
        const userLastTwoMonths = userData.users.last12Months.slice(-2);
        const orderLastTwoMonths = data.orders.last12Months.slice(-2);
        if (userLastTwoMonths.length === 2 && orderLastTwoMonths.length === 2) {
          const userCurrentMonth = userLastTwoMonths[1].count;
          const userPreviousMonth = userLastTwoMonths[0].count;
          const orderCurrentMonth = orderLastTwoMonths[1].count;
          const orderPreviousMonth = orderLastTwoMonths[0].count;
          const userPercentage =
            userPreviousMonth !== 0
              ? ((userCurrentMonth - userPreviousMonth) / userPreviousMonth) *
                100
              : 100;
          const orderPercentage =
            orderPreviousMonth !== 0
              ? ((orderCurrentMonth - orderPreviousMonth) /
                  orderPreviousMonth) *
                100
              : 100;

          setUserComparePercentage({
            currentMonth: userCurrentMonth,
            previousMonth: userPreviousMonth,
            percentage: userPercentage,
          });

          setOrdersComparePercentage({
            currentMonth: orderCurrentMonth,
            previousMonth: orderPreviousMonth,
            percentage: orderPercentage,
          });
        }
      }
    }
  }, [isLoading, userLoading, data, userData]);

  return (
    <div className="lg:mt-[30px]">
      <div className="lg:grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics DashBoard={true} />
        </div>

        <div className="lg:pt-[20px] lg:pr-8 flex lg:flex-none justify-between items-center gap-4 m-4 ps-4">
          <div className="w-[50%] lg:w-full dark:bg-[#111C43] rounded-sm shadow p-2">
          <h1 className=" py-2 font-Poppins dark:text-[#45CBA0] text-black lg:text-[20px] text-[15px]">
                  Sales Obtained
                </h1>
            <div className="flex items-center justify-between">
              
              <div className="">
                
                <BiBorderLeft className="dark:text-[#45CBA0] text-black lg:text-[30px] text-[20px]" />
                <h1 className="py-2 font-Poppins dark:text-white text-black text-[20px] ">
                  {ordersComparePercentage?.currentMonth}
                </h1>

                
              </div>
              <div >
                <CircularProgressWithLabel
                  value={ordersComparePercentage?.percentage}
                  open={open}
                  
                />
                <h1 className="text-center lg:pt-4 dark:text-white text-black text-[14px]">
                  {ordersComparePercentage?.percentage > 0
                    ? "+" + ordersComparePercentage?.percentage.toFixed(2)
                    : "-" + ordersComparePercentage?.percentage.toFixed(2)}
                  %
                </h1>
              </div>
            </div>
          </div>

          <div className="w-[50%] lg:w-full dark:bg-[#111C43] rounded-sm shadow my-4 ">
          <h1 className=" mt-4 font-Poppins dark:text-[#45CBA0] text-black lg:text-[20px] text-[15px] ps-2">
                  new Users
                </h1>
            <div className="flex items-center p-2 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-black lg:text-[30px] text-[20px]" />
                <h1 className="py-2 font-Poppins dark:text-white text-black text-[20px]">
                  {userComparePercentage?.currentMonth}
                </h1>
                
              </div>
              <div>
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentage}
                  open={open}
                />
                <h1 className="text-center lg:pt-4 dark:text-white text-black text-[14px]">
                  {userComparePercentage?.percentage > 0
                    ? "+" + userComparePercentage?.percentage.toFixed(2)
                    : "-" + userComparePercentage?.percentage.toFixed(2)}
                  %
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="  mt-[10px] mb-5">
        <div className=" w-[94%]  shadow m-auto ">
          <OrderAnalytics DashBoard={true} />
        </div>
      </div>
      <div className="w-[94%] shadow m-auto ">
        <h3 className="dark:text-white text-black  text-[20px] font-Poppins font-[400] pb-10 ps-10 mt-5 ">
          Recent Transaction
        </h3>
        <div className="mb-10 md:ps-10 ps-4 w-[100%]">
          <AllInvoices isDashBoard={false} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidget;
